import Logo from "../svgs/Logo";
import { Link } from "react-router-dom";
import MenuHamburger from "../svgs/MenuHamburger";
import { useState } from "react";
import ArrowNext from "../svgs/ArrowNext";
import Close from "../svgs/Close";
export default function Header() {
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
          <div className=" md:flex items-center gap-5 hidden   ">
            <Link
              to={"/"}
              className="  border-transparent border-b-2 duration-300 font-medium    hover:border-[#7B6FCC] m-1"
            >
              Registrarse
            </Link>
            <Link
              to={"/"}
              className="    p-1  bg-[#7B6FCC] px-2 text-white rounded-md font-medium hover:bg-[#5448A1] duration-300"
            >
              Iniciar Sesión
            </Link>
          </div>
          {open ? (
            <button
              onClick={change}
              className="  flex items-center h-fit  my-auto md:hidden "
            >
              <Close />
            </button>
          ) : (
            <button
              onClick={change}
              className="  flex items-center h-fit  my-auto md:hidden "
            >
              <MenuHamburger />
            </button>
          )}

          {open && (
            <div className="   p-2 pt-8 md:hidden z-20 flex flex-col absolute left-0 right-0 top-[69px] min-h-dvh bg-white">
              <Link
                to={"/"}
                className=" flex justify-between items-center  rounded-md hover:bg-[#F5F5F6] py-2 mt-1 mb-4 px-2 border"
              >
                Iniciar Sesión
                <ArrowNext />
              </Link>
              <Link
                to={"/"}
                className=" flex justify-between items-center  hover:bg-[#F5F5F6] px-2 py-2 rounded-md mt-1 border"
              >
                Registrarse
                <ArrowNext />
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
