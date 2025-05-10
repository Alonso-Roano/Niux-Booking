import { Link, useNavigate } from "react-router-dom";
import Logoniux10 from "../svgs/Logoniux10";
import { FormEvent, useState } from "react";
import { useAuthStore } from "../stores/auth/authStore";

export default function Login() {
  const loginUser = useAuthStore((state) => state.loginUser);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    try {
      await loginUser(email.value, password.value);
      setErrorMessage(null); // Limpiar mensaje de error si el inicio de sesión es exitoso
      navigate("/"); // Redirigir al usuario a la página de destino
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Establecer mensaje de error capturado desde el store
      } else {
        setErrorMessage("Ocurrió un error inesperado."); // Mensaje genérico en caso de un error desconocido
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(123,111,204,1) 0%, rgba(178,169,242,1) 16%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)",
      }}
    >
      <div className="flex w-full max-w-7xl justify-center rounded-lg overflow-hidden gap-x-20">
        {/* Imagen lateral */}
        <div
          className="hidden lg:flex items-center justify-center shadow-lg bg-gray-50/10 backdrop-blur-md"
          style={{ width: "580px", height: "535px", borderRadius: "8px" }}
        >
          <img
            src="/images/login-niux.svg"
            alt="Imagen de registro"
            style={{ width: "500px", height: "500px", objectFit: "cover" }}
          />
        </div>

        {/* Formulario de inicio de sesión */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          {/* Logo y título */}
          <Link to="/">
            <div className="flex gap-2 justify-center items-center">
              <Logoniux10 />
              <span className="font-medium text-2xl text-[#484748]">
                NIUXBOOKING
              </span>
            </div>
          </Link>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-[#7B6FCC] mt-4">
              Iniciar Sesión
            </h2>
          </div>

          {/* Campos de correo y contraseña */}
          <form onSubmit={onSubmit} className="space-y-6">
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7B6FCC] outline-none"
                placeholder="Contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#7B6FCC] text-white font-semibold rounded-lg hover:bg-[#5448A1] transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Registro */}
          <div className="text-center mt-6 text-gray-700">
            ¿Aún no tienes cuenta?{" "}
            <Link
              to="/registro-type"
              className="text-[#7B6FCC] font-semibold hover:underline"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
