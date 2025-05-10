import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Logo from "../svgs/Logo";
import MenuHamburger from "../svgs/MenuHamburger";
import Close from "../svgs/Close";
import ArrowNext from "../svgs/ArrowNext";
import { useAuthStore } from "../stores/auth/authStore"; // Importamos el store de auth
import iconUser from "/images/icons/icon-user.svg";
import iconEmpresa from "/images/icons/icon-empresa.svg";
import iconLogout from "/images/icons/icon-Logout.svg";
import DashboardIcon from "../svgs/Dashboard";
import Service from "../svgs/Service";
import Client from "../svgs/Client";
import Sale from "../svgs/Sale";
import Reservation from "../svgs/Reservation";
import dataEmpresa from "../json/dashboardEmpresa.json";
import dataAdmin from "../json/dashboardAdmin.json";
import Company from "../svgs/Company";
import Tag from "../svgs/Tag";
import OffCanvas from "../constructors/OffCanvas"; // Importamos OffCanvas
import EditProfile from "./EditProfile"; // Importamos EditProfile
import iconReservation from "/images/icons/icon-reserva.svg";

interface Params {
  setOption?: (option: any) => void;
}

export default function Header({ setOption }: Params) {
  const { user, status, logoutUser } = useAuthStore(); // Obtenemos el usuario y el estado de autenticación
  const [open, setOpen] = useState(false); // Estado del menú hamburguesa
  const [profileOpen, setProfileOpen] = useState(false); // Estado del menú del perfil
  const profileMenuRef = useRef<HTMLDivElement>(null); // Referencia al menú de perfil
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const toggleProfileMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que el clic en el avatar cierre el menú inmediatamente
    setProfileOpen(!profileOpen);
  };
  const changeOption = (opcion?: any) => {
    if (opcion && setOption) setOption(opcion);
    setOpen(!open);
  };

  const openEditProfile = () => {
    setProfileOpen(false);
    setEditProfileOpen(true);
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
      <header className="h-[70px] sticky top-0 border-b border-gray-200 roboto-regular z-20   bg-white  ">
        <div className="flex justify-between items-center   px-9 w-full  relative h-full">
          {/* Logo y Nombre */}

          <Link className="p-2 select-none" to="/">
            <div className="flex gap-2 items-center  ">
              <Logo />
              <span data-text="NIUXBOOKING" className="   focus:outline-none link-header font-medium tracking-wider  text-black link-header">
                NIUXBOOKING
              </span>
            </div>
          </Link>

          {/* Botones de Registro e Inicio de Sesión (solo si no está autenticado) */}
          {status !== "authorized" && (
            <div className="md:flex items-center gap-5 hidden select-none">
              <Link
                to="/registro-type"
                className="border-transparent   inline-block relative group  duration-300 font-medium  p-1"
              >
                Registrarse
                <span className="absolute group-hover:animate-bounce   -bottom-1  left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[5px] border-transparent border-b-violet-500"></span>
              </Link>
              <Link
                to="/login"
                className="p-1 bg-violet-400/20 text-violet-500 px-3  duration-100 rounded-md font-medium hover:outline-2 hover:outline-violet-200   "
              >
                Iniciar Sesión
              </Link>
            </div>
          )}

          {/* Menú hamburguesa (para dispositivos móviles) */}
          {open ? (
            <button
              onClick={() => changeOption()}
              className="flex items-center h-fit my-auto sm:hidden"
            >
              <Close />
            </button>
          ) : (
            <button
              onClick={() => changeOption()}
              className="flex items-center h-fit my-auto sm:hidden"
            >
              <MenuHamburger />
            </button>
          )}

          {/* Opciones del usuario autenticado */}
          {status === "authorized" && (
            <div className="hidden relative sm:flex items-center">
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
                    className="flex items-center justify-left gap-2 w-full bg-white text-gray-700 hover:bg-gray-100 py-3 px-1 rounded-md transition-all"
                  >
                    <img src={iconUser} alt="Perfil" className="w-5 h-5" />
                    <span>Perfil</span>
                  </button>
                  {user?.rol === "Socio" && (
                    <Link
                      to={"/Editar/Empresa"}
                      className="flex items-center justify-left gap-2 w-full bg-white text-gray-700 hover:bg-gray-100 py-3 px-1 rounded-md transition-all"
                    >
                      <img
                        src={iconEmpresa}
                        alt="Editar Empresa"
                        className="w-5 h-5"
                      />
                      <span>Editar Empresa</span>
                    </Link>
                  )}

                  {user?.rol === "Cliente" && (
                    <Link
                      to="/reservaciones"
                      className="flex items-center justify-left gap-2 w-full bg-white text-gray-700 hover:bg-gray-100 py-3 px-1 rounded-md transition-all"
                    >
                      <img
                        src={iconReservation}
                        alt="Reservaciones"
                        className="w-5 h-5"
                      />
                      <span>Reservaciones</span>
                    </Link>
                  )}
                  <button
                    onClick={logoutUser}
                    className="flex items-center justify-left gap-2 w-full bg-white text-gray-700 hover:bg-gray-100 py-3 px-1 rounded-md transition-all"
                  >
                    <img
                      src={iconLogout}
                      alt="Cerrar sesión"
                      className="w-5 h-5"
                    />
                    <span>Cerrar Sesión</span>
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
                    className="flex justify-between  items-center rounded-md hover:bg-[#F5F5F6] py-2 mt-1 mb-2 px-2 border  text-[#474747]"
                  >
                    Perfil
                    <ArrowNext />
                  </Link>
                  {/* Mostrar el enlace de Reservas solo si el rol es Cliente */}

                  {user?.rol === "Socio" && (
                    <div className="dashSelection">
                      <button
                        onClick={() => changeOption(dataEmpresa.dashboard)}
                      >
                        <span>
                          <DashboardIcon /> Dashboard
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataEmpresa.service)}>
                        <span>
                          <Service /> Servicios
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataEmpresa.clients)}>
                        <span>
                          <Client /> Clientes
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataEmpresa.sales)}>
                        <span>
                          <Sale /> Ventas
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button
                        onClick={() => changeOption(dataEmpresa.reservation)}
                      >
                        <span>
                          <Reservation /> Empresas
                        </span>{" "}
                        <ArrowNext />
                      </button>
                    </div>
                  )}
                  {user?.rol === "Admin" && (
                    <div className="dashSelection">
                      <button onClick={() => changeOption(dataAdmin.dashboard)}>
                        <span>
                          {" "}
                          <DashboardIcon /> Dashboard
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataAdmin.service)}>
                        <span>
                          {" "}
                          <Service /> Servicios
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataAdmin.clients)}>
                        <span>
                          <Client /> Clientes
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataAdmin.sales)}>
                        <span>
                          <Sale /> Ventas
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button
                        onClick={() => changeOption(dataAdmin.reservation)}
                      >
                        <span>
                          <Reservation /> Reservaciones
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataAdmin.company)}>
                        <span>
                          <Company /> Empresas
                        </span>{" "}
                        <ArrowNext />
                      </button>
                      <button onClick={() => changeOption(dataAdmin.tag)}>
                        <span>
                          <Tag /> Etiquetas
                        </span>{" "}
                        <ArrowNext />
                      </button>
                    </div>
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

      {user && (
        <OffCanvas
          toggleDrawer={setEditProfileOpen}
          drawerOpen={editProfileOpen}
        >
          <EditProfile closeOffcanvas={() => setEditProfileOpen(false)} />
        </OffCanvas>
      )}
    </>
  );
}
