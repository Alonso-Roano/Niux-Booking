import React, { useEffect, useState } from "react";
import { niuxApi } from "../api/niuxApi";
import { useAuthStore } from "../stores/auth/authStore";
import Utils from "../functions/Utils"; // Importa el Utils
import Header from "./Header";
import negocioDefault from "../../public/images/negocio-default.webp";

interface Horario {
  id: number;
  dia: string; // Ejemplo: "LUNES", "MARTES", etc.
  horaInicio: string; // Ejemplo: "09:00"
  horaFin: string; // Ejemplo: "14:00"
  activo: boolean;
  [key: string]: any; // Permitir acceso dinámico
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
  const { user } = useAuthStore((state) => state); // Obtener el usuario autenticado
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [empresaImagen, setEmpresaImagen] = useState<File | null>(null); // Imagen de la empresa
  const [empresaNombre, setEmpresaNombre] = useState<string>(""); // Nombre de la empresa desde la API

  const idEmpresa = user?.idEmpresa;

  useEffect(() => {
    if (idEmpresa) {
      fetchHorarios(idEmpresa);
      fetchEmpresa(idEmpresa);
    }
  }, [idEmpresa]);

  // Obtener los horarios de atención de la empresa
  const fetchHorarios = async (idEmpresa: number) => {
    try {
      const response = await niuxApi.get(`/Horario/Empresa/${idEmpresa}`);
      const data = response.data.map((horario: any) => ({
        ...horario,
        dia: diasSemana[horario.dia], // Mapear el número del día al nombre
        horaInicio: horario.horaInicio.substring(11, 16), // Extraer HH:mm
        horaFin: horario.horaFin.substring(11, 16),       // Extraer HH:mm
      }));
      setHorarios(data);
    } catch (error) {
      console.error("Error al obtener los horarios:", error);
      Utils.showToast({
        icon: "error",
        title: "Error al obtener los horarios de la empresa.",
      });
    }
  };

  // Obtener el nombre de la empresa
  const fetchEmpresa = async (idEmpresa: number) => {
    try {
      const response = await niuxApi.get(`/Empresa/${idEmpresa}`);
      console.log(response.data.data)
      setEmpresaNombre(response.data.data.nombre || "");
      
    } catch (error) {
      console.error("Error al obtener la información de la empresa:", error);
      setEmpresaNombre("");
      Utils.showToast({
        icon: "error",
        title: "Error al cargar los datos de la empresa.",
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
      // Construir el payload con el formato esperado por la API
      const payload = horarios.map((horario) => ({
        isDeleted: false, // Siempre falso según el ejemplo
        idEmpresa: idEmpresa, // Agregar idEmpresa al payload
        dia: diasSemana.indexOf(horario.dia), // Transformar nombre del día a índice
        horaInicio: `${new Date().toISOString().split("T")[0]}T${horario.horaInicio}:00.000Z`, // Formato completo ISO 8601
        horaFin: `${new Date().toISOString().split("T")[0]}T${horario.horaFin}:00.000Z`, // Mismo formato para horaFin
        activo: horario.activo, // Booleano estricto
      }));

      console.log("Payload enviado:", payload); // Debug para revisar el payload

      // Realizar la petición PUT con el payload completo
      await niuxApi.put(`/Horario/Empresa/${idEmpresa}`, payload);

      // Mostrar un mensaje de éxito
      Utils.showToast({
        icon: "success",
        title: "Horarios actualizados correctamente.",
      });

      // Actualizar la lista de horarios con una nueva petición GET
      if (idEmpresa) {
        fetchHorarios(idEmpresa);
      }
    } catch (error: any) {
      console.error("Error al guardar los horarios:", error);

      // Si el backend devuelve un mensaje de error, mostrarlo
      if (error.response && error.response.data) {
        Utils.showToast({
          icon: "error",
          title: error.response.data.title || "Ocurrió un error al actualizar los horarios.",
        });
      } else {
        Utils.showToast({
          icon: "error",
          title: "Error desconocido al actualizar los horarios.",
        });
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEmpresaImagen(e.target.files[0]);
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
            {/* Horarios */}
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

            {/* Información de la Empresa */}
            <div className="p-6 flex flex-col items-center">
              <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden mb-4">
                {empresaImagen ? (
                  <img
                    src={URL.createObjectURL(empresaImagen)}
                    alt="Imagen de la empresa"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={negocioDefault}
                    alt="Imagen de la empresa"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <label
                htmlFor="empresaImagen"
                className="text-[#7B6FCC] font-semibold cursor-pointer hover:underline"
              >
                Cambiar Imagen
              </label>
              <input
                type="file"
                id="empresaImagen"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="w-full mt-4">
                <label htmlFor="empresaNombre" className="block text-sm font-medium text-gray-700">
                  Nombre de la Empresa
                </label>
                <input
                  id="empresaNombre"
                  type="text"
                  value={empresaNombre || ""} // Garantiza un valor controlado
                  onChange={(e) => setEmpresaNombre(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full mt-4 py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
