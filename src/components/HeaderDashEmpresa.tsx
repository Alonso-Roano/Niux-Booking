import Logo from "../svgs/Logo";
import MenuHamburger from "../svgs/MenuHamburger";
import { useState } from "react";
import Close from "../svgs/Close";
import DashboardIcon from "../svgs/Dashboard";
import Service from "../svgs/Service";
import Client from "../svgs/Client";
import Sale from "../svgs/Sale";
import Reservation from "../svgs/Reservation";
import data from "../json/dashboardEmpresa.json";

interface Params {
  setOption: (option: any) => void;
}

export default function HeaderDashEmpresa({ setOption }: Params) {
  const [open, setOpen] = useState(false);

  const change = (opcion?: any) => {
    if (opcion) setOption(opcion);
    setOpen(!open);
  };

  return (
    <header className="h-[70px] shadow-md sticky top-0 bg-white roboto-regular z-20">
      <div className="flex justify-between px-9 w-full border relative h-full">
        <button className="flex gap-2 items-center" onClick={() => change(data.dashboard)}>
          <Logo />
          <span className="font-medium text-[#484748]">NIUXBOOKING</span>
        </button>
        {open ? (
          <button onClick={() => change()} className="flex items-center h-fit my-auto sm:hidden">
            <Close />
          </button>
        ) : (
          <button onClick={() => change()} className="flex items-center h-fit my-auto sm:hidden">
            <MenuHamburger />
          </button>
        )}

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
  );
}
