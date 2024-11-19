import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth/authStore"; // Importa el auth-store
import { niuxApi } from "../api/niuxApi"; // Importa la configuración de Axios
import Utils from "../functions/Utils"; // Importa el archivo Utils

function EditProfile({ closeOffcanvas }: { closeOffcanvas: () => void }) {
  // Estado local para los datos del formulario
  const [profileData, setProfileData] = useState({
    nombres: "",
    apellido1: "",
    apellido2: "",
    edad: 0,
    sexo: 0,
  });

  // Obtener el ID y rol del usuario autenticado desde el store
  const { id: userId, rol } = useAuthStore((state) => state.user || { id: "", rol: "" });

  // Función para obtener los datos del perfil
  const fetchProfileData = async () => {
    if (!userId) return; // Asegúrate de que el ID esté disponible

    try {
      const response = await niuxApi.get(`/Persona/ObtenerDatosPerfil/${userId}`);
      if (response.data.success) {
        setProfileData({
          nombres: response.data.data.nombres || "",
          apellido1: response.data.data.apellido1 || "",
          apellido2: response.data.data.apellido2 || "",
          edad: response.data.data.edad || 0,
          sexo: response.data.data.sexo || 0,
        });
      } else {
        Utils.showToast({
          icon: "error",
          title: response.data.message || "Error al obtener los datos del perfil.",
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      Utils.showToast({
        icon: "error",
        title: "Error al obtener los datos del perfil.",
      });
    }
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  // Función para manejar los cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [id]: id === "edad" || id === "sexo" ? parseInt(value) : value,
    }));
  };

  // Función para manejar la actualización del perfil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de la página
    if (!userId) return;

    try {
      const response = await niuxApi.put(`/Persona/ActualizarPerfilUsuario/${userId}`, {
        ...profileData,
      });

      if (response.data.success) {
        Utils.showToast({
          icon: "success",
          title: "Perfil actualizado con éxito.",
        });
        closeOffcanvas(); // Cerrar el offcanvas
      } else {
        Utils.showToast({
          icon: "error",
          title: response.data.message || "Error al actualizar el perfil.",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Utils.showToast({
        icon: "error",
        title: "Ocurrió un error al actualizar el perfil.",
      });
    }
  };

  // Render del formulario con valores prellenados
  return (
    <div className="p-2 max-w-md mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-2">Perfil</h2>
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src="/images/Avatar.webp" // Imagen predeterminada
            alt="Avatar"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <button className="absolute bottom-1 right-1 bg-[#7B6FCC] text-white p-1 rounded-full">
            ✎
          </button>
        </div>
        <p className="text-gray-500 mt-2">{rol || "Usuario"}</p> {/* Mostrar rol del usuario */}
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Campo de Nombres */}
        <div>
          <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
            Nombre(s)
          </label>
          <input
            type="text"
            id="nombres"
            value={profileData.nombres}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
          />
        </div>

        {/* Campo de Apellido Paterno */}
        <div>
          <label htmlFor="apellido1" className="block text-sm font-medium text-gray-700">
            Apellido Paterno
          </label>
          <input
            type="text"
            id="apellido1"
            value={profileData.apellido1}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
          />
        </div>

        {/* Campo de Apellido Materno */}
        <div>
          <label htmlFor="apellido2" className="block text-sm font-medium text-gray-700">
            Apellido Materno
          </label>
          <input
            type="text"
            id="apellido2"
            value={profileData.apellido2}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
          />
        </div>

        {/* Campo de Edad */}
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
            Edad
          </label>
          <input
            type="number"
            id="edad"
            value={profileData.edad}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
          />
        </div>

        {/* Campo de Sexo */}
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
            Sexo
          </label>
          <select
            id="sexo"
            value={profileData.sexo}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
          >
            <option value={0}>No especificar</option>
            <option value={1}>Masculino</option>
            <option value={2}>Femenino</option>
            <option value={3}>Otro</option>
          </select>
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="mt-4 w-full bg-[#7B6FCC] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#5a54a4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B6FCC]"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
