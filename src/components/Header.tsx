import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "../svgs/Logo";
import MenuHamburger from "../svgs/MenuHamburger";
import Close from "../svgs/Close";
import ArrowNext from "../svgs/ArrowNext";
import { useAuthStore } from "../stores/auth/authStore"; // Importamos el store de auth
import iconUser from "../../public/images/icons/icon-user.svg";
import iconReserva from "../../public/images/icons/icon-reserva.svg";
import iconLogout from "../../public/images/icons/icon-logout.svg";

export default function Header() {
  const { user, status, logoutUser } = useAuthStore(); // Obtenemos el usuario y el estado de autenticación
  const [open, setOpen] = useState(false); // Estado del menú hamburguesa
  const [profileOpen, setProfileOpen] = useState(false); // Estado del menú del perfil
  const profileMenuRef = useRef<HTMLDivElement>(null); // Referencia al menú de perfil

  const change = () => setOpen(!open);

  const toggleProfileMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el clic en el avatar cierre el menú inmediatamente
    setProfileOpen(!profileOpen);
  };

  const avatarUrl = user?.avatarURL || "/images/Avatar.webp"; // Usamos la foto del usuario o un avatar por defecto

  // Detecta clics fuera del menú de perfil
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false); // Cierra el menú si el clic ocurre fuera de él
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="h-[70px] shadow-md sticky top-0 bg-white roboto-regular z-20">
        <div className="flex justify-between px-9 w-full border relative h-full">
          {/* Logo y Nombre */}
          <div className="flex gap-2 items-center">
            <Logo />
            <span className="font-medium text-[#484748]">NIUXBOOKING</span>
          </div>

          {/* Botones de Registro e Inicio de Sesión (solo si no está autenticado) */}
          {status !== "authorized" && (
            <div className="md:flex items-center gap-5 hidden">
              <Link
                to="/registro-type"
                className="border-transparent border-b-2 duration-300 font-medium hover:border-[#7B6FCC] m-1"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="p-1 bg-[#7B6FCC] px-2 text-white rounded-md font-medium hover:bg-[#5448A1] duration-300"
              >
                Iniciar Sesión
              </Link>
            </div>
          )}

          {/* Menú hamburguesa (para dispositivos móviles) */}
          {open ? (
            <button
              onClick={change}
              className="flex items-center h-fit my-auto md:hidden"
            >
              <Close />
            </button>
          ) : (
            <button
              onClick={change}
              className="flex items-center h-fit my-auto md:hidden"
            >
              <MenuHamburger />
            </button>
          )}

          {/* Opciones del usuario autenticado */}
          {status === "authorized" && (
            <div className="relative flex items-center">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {profileOpen && (
                <div
                  ref={profileMenuRef}
                  className="absolute right-0 top-12 border border-gray-300 bg-white shadow-md rounded-lg w-48 p-4 z-30"
                >
                  <p className="font-medium text-center text-gray-800 mb-4">
                    {user?.nombre}
                  </p>
                  <Link
                    to="/perfil"
                    className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md"
                  >
                    <img className="" src={iconUser} alt="" />
                    Perfil
                  </Link>
                  {/* Mostrar el enlace de Reservas solo si el rol es Cliente */}
                  {user?.rol === "Cliente" && (
                    <Link
                      to="/reservas"
                      className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md"
                    >
                      <img src={iconReserva} alt="" />
                      Reservas
                    </Link>
                  )}
                  <button
                    onClick={logoutUser}
                    className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md w-full text-left"
                  >
                    <img src={iconLogout} alt="" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Menú desplegable (para móviles) */}
          {open && (
            <div className="p-2 pt-8 md:hidden z-20 flex flex-col absolute left-0 right-0 top-[69px] min-h-dvh bg-white">
              {status !== "authorized" ? (
                <>
                  <Link
                    to="/login"
                    className="flex justify-between items-center rounded-md hover:bg-[#F5F5F6] py-2 mt-1 mb-4 px-2 border"
                  >
                    Iniciar Sesión
                    <ArrowNext />
                  </Link>
                  <Link
                    to="/registro-type"
                    className="flex justify-between items-center hover:bg-[#F5F5F6] px-2 py-2 rounded-md mt-1 border"
                  >
                    Registrarse
                    <ArrowNext />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/perfil"
                    className="flex justify-between items-center rounded-md hover:bg-[#F5F5F6] py-2 mt-1 mb-4 px-2 border"
                  >
                    Perfil
                    <ArrowNext />
                  </Link>
                  {/* Mostrar el enlace de Reservas solo si el rol es Cliente */}
                  {user?.rol === "Cliente" && (
                    <Link
                      to="/reservas"
                      className="flex justify-between items-center hover:bg-[#F5F5F6] px-2 py-2 rounded-md mt-1 border"
                    >
                      Reservas
                      <ArrowNext />
                    </Link>
                  )}
                  <button
                    onClick={logoutUser}
                    className="flex justify-between items-center hover:bg-[#F5F5F6] px-2 py-2 rounded-md mt-1 border"
                  >
                    Cerrar Sesión
                    <ArrowNext />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
