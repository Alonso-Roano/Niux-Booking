import { useState, useRef, useEffect } from "react";
import Logo from "../svgs/Logo";
import MenuHamburger from "../svgs/MenuHamburger";
import Close from "../svgs/Close";
import DashboardIcon from "../svgs/Dashboard";
import Service from "../svgs/Service";
import Client from "../svgs/Client";
import Sale from "../svgs/Sale";
import Reservation from "../svgs/Reservation";
import data from "../json/dashboardEmpresa.json";
import { useAuthStore } from "../stores/auth/authStore"; // Importamos el store de autenticación
import iconProfile from "../../public/images/icons/icon-user.svg";
import iconLogout from "../../public/images/icons/icon-logout.svg";
import OffCanvas from "../constructors/OffCanvas"; // Importamos el componente OffCanvas
import EditProfile from "./EditProfile"; // Componente para editar el perfil

interface Params {
  setOption: (option: any) => void;
}

export default function HeaderDashEmpresa({ setOption }: Params) {
  const [open, setOpen] = useState(false); // Estado del menú principal
  const [profileOpen, setProfileOpen] = useState(false); // Estado para el menú de perfil
  const [editProfileOpen, setEditProfileOpen] = useState(false); // Estado para abrir el OffCanvas
  const profileMenuRef = useRef<HTMLDivElement>(null); // Referencia al menú de perfil
  const { user, logoutUser } = useAuthStore(); // Obtenemos el usuario autenticado

  const avatarUrl = user?.avatarURL || "/images/Avatar.webp"; // URL del avatar o una imagen por defecto

  const change = (opcion?: any) => {
    if (opcion) setOption(opcion);
    setOpen(!open);
  };

  const toggleProfileMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // Previene que el evento cierre el menú
    setProfileOpen(!profileOpen);
  };

  const openEditProfile = () => {
    setProfileOpen(false); // Cierra el menú de perfil
    setEditProfileOpen(true); // Abre el OffCanvas
  };

  // Detecta clics fuera del menú de perfil
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
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
          <button
            className="flex gap-2 items-center"
            onClick={() => change(data.dashboard)}
          >
            <Logo />
            <span className="font-medium text-[#484748]">NIUXBOOKING</span>
          </button>

          {open ? (
            <button
              onClick={() => change()}
              className="flex items-center h-fit my-auto sm:hidden"
            >
              <Close />
            </button>
          ) : (
            <button
              onClick={() => change()}
              className="flex items-center h-fit my-auto sm:hidden"
            >
              <MenuHamburger />
            </button>
          )}

          {/* Avatar del usuario y menú de perfil */}
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
                <button
                  onClick={openEditProfile}
                  className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md w-full text-left"
                >
                  <img src={iconProfile} alt="Perfil" />
                  Ver Perfil
                </button>
                <button
                  onClick={logoutUser}
                  className="flex items-center gap-2 hover:bg-gray-100 py-2 px-3 rounded-md w-full text-left"
                >
                  <img src={iconLogout} alt="Cerrar sesión" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>

          {open && (
            <div className="p-2 pt-8 md:hidden z-20 flex flex-col absolute left-0 right-0 top-[69px] min-h-dvh bg-white">
              <div className="dashSelection">
                <button onClick={() => change(data.dashboard)}>
                  <DashboardIcon /> Dashboard
                </button>
                <button onClick={() => change(data.service)}>
                  <Service /> Servicios
                </button>
                <button onClick={() => change(data.clients)}>
                  <Client /> Clientes
                </button>
                <button onClick={() => change()}>
                  <Sale /> Ventas
                </button>
                <button onClick={() => change()}>
                  <Reservation /> Reservaciones
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

  
    </>
  );
}
