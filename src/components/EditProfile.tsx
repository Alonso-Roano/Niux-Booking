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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para la imagen seleccionada

  // Obtener el ID, rol y updateUser del usuario autenticado desde el store
  const userId = useAuthStore((state) => state.user?.id);
  const rol = useAuthStore((state) => state.user?.rol);
  const avatarURL = useAuthStore((state) => state.user?.avatarURL);
  const updateUser = useAuthStore((state) => state.updateUser);

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

  // Función para manejar la carga de imagen
const handleUploadProfilePhoto = async () => {
  if (!selectedFile || !userId) {
      Utils.showToast({
          icon: "warning",
          title: "Selecciona una imagen antes de subir.",
      });
      return;
  }

  const formData = new FormData();
  formData.append("IdApplicationUser", userId);
  formData.append("Archivo", selectedFile);

  console.log("FormData contenido:");
  for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
  }

  try {
      const response = await niuxApi.post("/Persona/SubirFotoPerfil", formData);

      if (response.data.success) {
          // Llama al endpoint para obtener los datos actualizados del usuario
          const userProfileResponse = await niuxApi.get(`/Persona/ObtenerDatosPerfil/${userId}`);
          if (userProfileResponse.data.success) {
              // Usa la URL actualizada directamente del backend
              const updatedAvatarURL = userProfileResponse.data.data.avatarURL;

              // Actualiza el usuario autenticado en el almacenamiento
              updateUser({ avatarURL: updatedAvatarURL });

              Utils.showToast({
                  icon: "success",
                  title: "Foto de perfil actualizada con éxito.",
              });
          } else {
              Utils.showToast({
                  icon: "warning",
                  title: "La foto se subió, pero no se pudo actualizar el perfil.",
              });
          }
      } else {
          Utils.showToast({
              icon: "error",
              title: response.data.message || "Error al subir la foto de perfil.",
          });
      }
  } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
      Utils.showToast({
          icon: "error",
          title: "Ocurrió un error al subir la foto de perfil.",
      });
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de la página
    if (!userId) return;

    try {
      const updateResponse = await niuxApi.put(`/Persona/ActualizarPerfilUsuario/${userId}`, {
        ...profileData,
      });

      if (updateResponse.data.success) {
        const fetchResponse = await niuxApi.get(`/Persona/ObtenerDatosPerfil/${userId}`);
        if (fetchResponse.data.success) {
          const updatedUser = fetchResponse.data.data;

          updateUser({
            nombre: `${updatedUser.nombres} ${updatedUser.apellido1} ${updatedUser.apellido2}`.trim(),
          });

          Utils.showToast({
            icon: "success",
            title: "Perfil actualizado con éxito.",
          });
          closeOffcanvas(); // Cerrar el offcanvas
        } else {
          Utils.showToast({
            icon: "error",
            title: fetchResponse.data.message || "Error al obtener los datos actualizados.",
          });
        }
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
            src={avatarURL || "/images/Avatar.webp"}
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
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
        </div>
        <button
          onClick={handleUploadProfilePhoto}
          className="mt-2 text-sm bg-[#7B6FCC] text-white py-1 px-4 rounded-md shadow-sm hover:bg-[#5a54a4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B6FCC]"
          disabled={!selectedFile}
        >
          Subir Foto
        </button>
        <p className="text-gray-500 mt-2">{rol || "Usuario"}</p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        {/* Campos existentes */}
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
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
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
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
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
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
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
            className="mt-1 block w-full rounded-md border border-gray-300 focus:ring-2 p-1 focus:ring-[#7B6FCC] outline-none"
          />
        </div>
        <div>
          <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
            Genero
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
