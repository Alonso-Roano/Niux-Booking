import React, { useEffect, useState } from "react";
import { niuxApi } from "../api/niuxApi";
import { useAuthStore } from "../stores/auth/authStore";
import Utils from "../functions/Utils";
import Header from "./Header";
import negocioDefault from "../../public/images/negocio-default.webp";

interface Horario {
  id: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
  [key: string]: any;
}

const diasSemana = [
  "LUNES",
  "MARTES",
  "MIERCOLES",
  "JUEVES",
  "VIERNES",
  "SABADO",
  "DOMINGO",
];

export const EditEmpresa: React.FC = () => {
  const { user } = useAuthStore((state) => state);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [empresaImagen, setEmpresaImagen] = useState<File | null>(null);
  const [empresaFoto, setEmpresaFoto] = useState<string>(""); 
  const [empresaNombre, setEmpresaNombre] = useState<string>("");

  const idEmpresa = user?.idEmpresa;

  useEffect(() => {
    if (idEmpresa) {
      fetchHorarios(idEmpresa);
      fetchEmpresa(idEmpresa);
    }
  }, [idEmpresa]);

  const fetchHorarios = async (idEmpresa: number) => {
    try {
      const response = await niuxApi.get(`/Horario/Empresa/${idEmpresa}`);
      const data = response.data.map((horario: any) => ({
        ...horario,
        dia: diasSemana[horario.dia],
        horaInicio: horario.horaInicio.substring(11, 16),
        horaFin: horario.horaFin.substring(11, 16),
      }));
      setHorarios(data);
    } catch (error) {
      Utils.showToast({
        icon: "error",
        title: "Error al obtener los horarios.",
      });
    }
  };

  const fetchEmpresa = async (idEmpresa: number) => {
    try {
      const response = await niuxApi.get(`/Empresa/${idEmpresa}`);
      setEmpresaNombre(response.data.data.nombre || "");
      setEmpresaFoto(response.data.data.foto || "");
    } catch (error) {
      Utils.showToast({
        icon: "error",
        title: "Error al obtener la información de la empresa.",
      });
    }
  };

  const handleHorarioChange = (index: number, field: keyof Horario, value: any) => {
    const updatedHorarios = [...horarios];
    updatedHorarios[index][field] = value;
    setHorarios(updatedHorarios);
  };

  const handleSubmit = async () => {
    try {
      const payload = horarios.map((horario) => ({
        isDeleted: false,
        idEmpresa: idEmpresa,
        dia: diasSemana.indexOf(horario.dia),
        horaInicio: `${new Date().toISOString().split("T")[0]}T${horario.horaInicio}:00.000Z`,
        horaFin: `${new Date().toISOString().split("T")[0]}T${horario.horaFin}:00.000Z`,
        activo: horario.activo,
      }));

      await niuxApi.put(`/Horario/Empresa/${idEmpresa}`, payload);

      Utils.showToast({
        icon: "success",
        title: "Horarios actualizados correctamente.",
      });

      if (idEmpresa) {
        fetchHorarios(idEmpresa);
      }
    } catch (error: any) {
      Utils.showToast({
        icon: "error",
        title: "Error al actualizar los horarios.",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEmpresaImagen(e.target.files[0]);
    }
  };

  const handleImageSubmit = async () => {
    if (!empresaImagen || !idEmpresa) {
      Utils.showToast({
        icon: "warning",
        title: "Selecciona una imagen antes de actualizar.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("IdEmpresa", idEmpresa.toString());
      formData.append("Archivo", empresaImagen);

      const response = await niuxApi.put("/Empresa/ActualizarImagenEmpresa", formData);

      if (response.data.success) {
        Utils.showToast({
          icon: "success",
          title: "Imagen actualizada correctamente.",
        });

        // Actualizar la foto después del éxito
        fetchEmpresa(idEmpresa);
      } else {
        Utils.showToast({
          icon: "error",
          title: "Error al actualizar la imagen.",
        });
      }
    } catch (error) {
      Utils.showToast({
        icon: "error",
        title: "Error desconocido al actualizar la imagen.",
      });
    }
  };

  const handleImageDelete = async () => {
    if (!idEmpresa) {
      Utils.showToast({
        icon: "warning",
        title: "No se puede eliminar la imagen sin un ID de empresa.",
      });
      return;
    }

    try {
      const response = await niuxApi.delete(`/Empresa/EliminarImagenEmpresa/${idEmpresa}`);

      if (response.data.success) {
        Utils.showToast({
          icon: "success",
          title: "Imagen eliminada correctamente.",
        });

        // Actualizar estado para eliminar la imagen localmente
        setEmpresaFoto("");
      } else {
        Utils.showToast({
          icon: "error",
          title: "Error al eliminar la imagen.",
        });
      }
    } catch (error) {
      Utils.showToast({
        icon: "error",
        title: "Error desconocido al eliminar la imagen.",
      });
    }
  };

  return (
    <>
      <Header />
      <p className="bg-gray-100 text-center text-4xl pb-5 font-semibold">
        Editar datos Empresa
      </p>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-6 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Edita el Horario de Atención
              </h2>
              <div className="space-y-4">
                {horarios.map((horario, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={horario.activo}
                        onChange={(e) =>
                          handleHorarioChange(index, "activo", e.target.checked)
                        }
                        className="h-4 w-4 text-[#7B6FCC] border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{horario.dia}</span>
                    </label>
                    {horario.activo ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={horario.horaInicio}
                          onChange={(e) =>
                            handleHorarioChange(index, "horaInicio", e.target.value)
                          }
                          className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={horario.horaFin}
                          onChange={(e) =>
                            handleHorarioChange(index, "horaFin", e.target.value)
                          }
                          className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-500">Cerrado</span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="w-full mt-4 py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
              >
                Guardar Cambios
              </button>
            </div>

            <div className="p-6 flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden mb-4">
                {empresaImagen ? (
                  <img
                    src={URL.createObjectURL(empresaImagen)}
                    alt="Imagen previsualizada"
                    className="w-full h-full object-cover"
                  />
                ) : empresaFoto ? (
                  <img
                    src={import.meta.env.VITE_BACKEND_API + empresaFoto}
                    alt="Imagen de la empresa"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={negocioDefault}
                    alt="Imagen predeterminada"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <input
                type="file"
                id="empresaImagen"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="empresaImagen"
                className="text-[#7B6FCC] font-semibold cursor-pointer hover:underline"
              >
                Cambiar Imagen
              </label>
              <button
                onClick={handleImageSubmit}
                className="w-full mt-4 py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
              >
                Guardar Imagen
              </button>
              {empresaFoto && (
                <button
                  onClick={handleImageDelete}
                  className="w-full mt-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
                >
                  Eliminar Imagen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
