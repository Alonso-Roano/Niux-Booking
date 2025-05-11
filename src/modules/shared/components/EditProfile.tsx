import React, { useEffect, useState } from "react";
import { useAuthStore } from "@auth/stores/authStore"; // Importa el auth-store
import { niuxApi } from "@core/api/niuxApi"; // Importa la configuración de Axios
import Utils from "@admin/functions/Utils"; // Importa el archivo Utils

function EditProfile({ closeOffcanvas }: { closeOffcanvas: () => void }) {
  // Estado local para los datos del formulario
  const [profileData, setProfileData] = useState({
    nombres: "",
    apellido1: "",
    apellido2: "",
    edad: 0,
    sexo: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Imagen seleccionada para previsualización

  // Obtener el ID, funciones del usuario y estado global desde el store
  const userId = useAuthStore((state) => state.user?.id);
  const rol = useAuthStore((state) => state.user?.rol);
  const avatarURL = useAuthStore((state) => state.user?.avatarURL);
  const updateUser = useAuthStore((state) => state.updateUser);
  const refreshUserData = useAuthStore((state) => state.refreshUserData);

  // Función para obtener los datos del perfil
  const fetchProfileData = async () => {
    if (!userId) return;

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

  // Función para manejar la selección de un archivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de la página
    if (!userId) return;

    try {
      // Si hay una foto seleccionada, súbela primero
      if (selectedFile) {
        const formData = new FormData();
        formData.append("IdApplicationUser", userId);
        formData.append("Archivo", selectedFile);

        const uploadResponse = await niuxApi.post("/Persona/SubirFotoPerfil", formData);
        if (uploadResponse.data.success) {
          Utils.showToast({
            icon: "success",
            title: "Foto de perfil actualizado con éxito.",
          });
        } else {
          throw new Error(uploadResponse.data.message || "Error al subir la foto de perfil.");
        }
      }

      // Concatenar nombres, apellido1 y apellido2 para el nombre completo
      const nombreCompleto = `${profileData.nombres} ${profileData.apellido1} ${profileData.apellido2}`.trim();

      // Actualizar los datos del perfil
      const updateResponse = await niuxApi.put(`/Persona/ActualizarPerfilUsuario/${userId}`, {
        ...profileData,
        nombre: nombreCompleto,
      });

      if (updateResponse.data.success) {
        // Actualizar el estado global con los datos concatenados
        updateUser({
          ...profileData,
          nombre: nombreCompleto,
        });

        await refreshUserData(); // Refrescar datos para garantizar que el avatarURL y demás campos estén actualizados
        Utils.showToast({
          icon: "success",
          title: "Perfil actualizado con éxito.",
        });
        closeOffcanvas(); // Cerrar el offcanvas
      } else {
        Utils.showToast({
          icon: "error",
          title: updateResponse.data.message || "Error al actualizar el perfil.",
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

  return (
    <div className="p-2 max-w-md mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-2">Perfil</h2>
      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : avatarURL || "/images/Avatar.webp"}
            alt="Avatar"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
          <label htmlFor="file-upload" className="absolute bottom-1 right-1 bg-[#7B6FCC] text-white p-1 rounded-full cursor-pointer">
            ✎
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </div>
        <p className="text-gray-500 mt-2">{rol || "Usuario"}</p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
            Nombre(s)
          </label>
          <input
            type="text"
            id="nombres"
            value={profileData.nombres}
            onChange={handleInputChange}
            placeholder="Nombre(s)"
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-hidden"
          />
        </div>
        <div>
          <label htmlFor="apellido1" className="block text-sm font-medium text-gray-700">
            Apellido Paterno
          </label>
          <input
            type="text"
            id="apellido1"
            value={profileData.apellido1}
            onChange={handleInputChange}
            placeholder="Apellido Paterno"
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-hidden"
          />
        </div>
        <div>
          <label htmlFor="apellido2" className="block text-sm font-medium text-gray-700">
            Apellido Materno
          </label>
          <input
            type="text"
            id="apellido2"
            value={profileData.apellido2}
            onChange={handleInputChange}
            placeholder="Apellido Materno"
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-hidden"
          />
        </div>
        <div>
          <label htmlFor="edad" className="block text-sm font-medium text-gray-700">
            Edad
          </label>
          <input
            type="number"
            id="edad"
            value={profileData.edad}
            onChange={handleInputChange}
            placeholder="Edad (Ej. 18)"
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-hidden"
          />
        </div>
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
            Género
          </label>
          <select
            id="sexo"
            value={profileData.sexo}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-hidden"
          >
            <option value={0}>No especificar</option>
            <option value={1}>Masculino</option>
            <option value={2}>Femenino</option>
            <option value={3}>Otro</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-[#7B6FCC] text-white py-2 px-4 rounded-md shadow-xs hover:bg-[#5a54a4] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#7B6FCC]"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
