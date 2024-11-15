import Logo from "../svgs/Logo";
import MenuHamburger from "../svgs/MenuHamburger";
import { useState } from "react";
import Close from "../svgs/Close";
import DashboardIcon from "../svgs/Dashboard";
import Service from "../svgs/Service";
import Client from "../svgs/Client";
import Sale from "../svgs/Sale";
import Reservation from "../svgs/Reservation";
interface params {
  setOption: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function HeaderDashEmpresa({setOption}:params) {
  const [open, setOpen] = useState(false);
  const change = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className=" h-[70px] shadow-md sticky top-0 bg-white  roboto-regular z-20 ">
        <div className=" flex justify-between px-9 w-full border  relative  h-full">
          <div className=" flex gap-2 items-center">
            <Logo />
            <span className="  font-medium  text-[#484748]">NIUXBOOKING</span>
          </div>
          {open ? (
            <button
              onClick={change}
              className="  flex items-center h-fit  my-auto sm:hidden "
            >
              <Close />
            </button>
          ) : (
            <button
              onClick={change}
              className="  flex items-center h-fit  my-auto sm:hidden "
            >
              <MenuHamburger />
            </button>
          )}

          {open && (
            <div className="   p-2 pt-8 md:hidden z-20 flex flex-col absolute left-0 right-0 top-[69px] min-h-dvh bg-white">
              <div className="dashSelection">
                <button onClick={()=>{change();}}><DashboardIcon/> Dashboard</button>
                <button onClick={()=>{change();}}><Service/> Servicios</button>
                <button onClick={()=>{change();}}><Client/> Clientes</button>
                <button onClick={()=>{change();}}><Sale/> Ventas</button>
                <button onClick={()=>{change();}}><Reservation/> Reservaciones</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
