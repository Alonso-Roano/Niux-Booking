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
    const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
    const [selectedCategoria, setSelectedCategoria] = useState<string>("Selecciona una categoría");
    const [idSocio, setIdSocio] = useState<number | null>(null);

    const idEmpresa = user?.idEmpresa;


    const fetchCategorias = async () => {
        try {
            const response = await niuxApi.get(`/Categoria`);
            if (Array.isArray(response.data.data)) {
                setCategorias(response.data.data);
            } else {
                setCategorias([]);
            }
        } catch (error) {
            Utils.showToast({
                icon: "error",
                title: "Error al obtener las categorías.",
            });
        }
    };

    useEffect(() => {
        fetchCategorias(); // Fetch categories on mount
    }, []);

    useEffect(() => {
        if (idEmpresa) {
            fetchHorarios(idEmpresa);
            fetchEmpresa(idEmpresa);
        }
    }, [idEmpresa]);

    const handleGuardarCambios = async () => {
        if (!idEmpresa || !idSocio) {
            Utils.showToast({
                icon: "error",
                title: "No se puede actualizar la empresa sin un ID válido.",
            });
            return;
        }

        if (selectedCategoria === "Selecciona una categoría") {
            Utils.showToast({
                icon: "warning",
                title: "Debes seleccionar una categoría.",
            });
            return;
        }

        let datosActualizados = false;
        let imagenActualizada = false;

        // Actualizar datos de la empresa
        if (empresaNombre || selectedCategoria !== "Selecciona una categoría") {
            try {
                const payload = {
                    isDeleted: false,
                    nombre: empresaNombre,
                    idSocio: idSocio,
                    idCategoria: parseInt(selectedCategoria),
                };

                const response = await niuxApi.put(`/Empresa/ActualizarEmpresa/${idEmpresa}`, payload);

                if (response.data.success) {
                    datosActualizados = true;
                } else {
                    throw new Error("Error al actualizar los datos de la empresa.");
                }
            } catch (error) {
                Utils.showToast({ icon: "error", title: "Error al actualizar los datos de la empresa." });
            }
        }

        // Actualizar imagen de la empresa
        if (empresaImagen) {
            try {
                const formData = new FormData();
                formData.append("IdEmpresa", idEmpresa.toString());
                formData.append("Archivo", empresaImagen);

                const response = await niuxApi.put("/Empresa/ActualizarImagenEmpresa", formData);

                if (response.data.success) {
                    imagenActualizada = true;
                } else {
                    throw new Error("Error al actualizar la imagen de la empresa.");
                }
            } catch (error) {
                Utils.showToast({ icon: "error", title: "Error al actualizar la imagen." });
            }
        }

        if (datosActualizados || imagenActualizada) {
            Utils.showToast({
                icon: "success",
                title: "Cambios guardados correctamente.",
            });
            fetchEmpresa(idEmpresa); // Actualizar datos locales
        } else {
            Utils.showToast({
                icon: "info",
                title: "No se detectaron cambios para guardar.",
            });
        }
    };

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
            setSelectedCategoria(response.data.data.idCategoria || "Selecciona una categoría");
            setIdSocio(response.data.data.idSocio || null);
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
                horaInicio: `0001-01-01T${horario.horaInicio}:00.000Z`,
                horaFin: `0001-01-01T${horario.horaFin}:00.000Z`,
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

    const handleImageDelete = async () => {
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

    const confirmImageDelete = () => {
        Utils.confirmToast(
            {
                title: "¿Eliminar imagen?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
            },
            handleImageDelete,
            null
        );
    };

    return (
        <>
            <Header />

            <div className="flex justify-center items-center bg-gray-100 pt-4">
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
                            <p className="text-center text-xl pb-5 font-semibold">
                                Editar datos Empresa
                            </p>
                            <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden mb-4">
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
                            <div className="flex gap-4">
                                <label
                                    htmlFor="empresaImagen"
                                    className="py-2 px-4 bg-white text-[#7B6FCC] border border-[#7B6FCC] font-semibold rounded-lg cursor-pointer hover:bg-[#5448A1] hover:text-white transition-colors"
                                >
                                    Cambiar Imagen
                                </label>
                                {empresaFoto && (
                                    <button
                                        onClick={confirmImageDelete}
                                        className="py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Eliminar Imagen
                                    </button>
                                )}
                            </div>
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
                            <div className="w-full mt-4">
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                    Categoría de tu negocio
                                </label>
                                <select
                                    id="categoria"
                                    value={selectedCategoria}
                                    onChange={(e) => setSelectedCategoria(e.target.value)}
                                    className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
                                >
                                    <option value="Selecciona una categoría">Selecciona una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>



                            <button
                                onClick={handleGuardarCambios}
                                className="w-full mt-4 py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
                            >
                                Guardar Datos Empresa
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
