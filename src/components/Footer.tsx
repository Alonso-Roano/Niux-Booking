import LogoForFooter from "../svgs/LogoForFooter";

export default function Footer() {
  const date= new Date().getFullYear();

  return (
    <>
      <footer className="   bg-linear-to-bl    from-zinc-700 to-zinc-900 flex flex-col justify-center gap-5 py-10 items-center roboto-regular ">
        <div className=" flex  flex-col gap-4 items-center">
          <span className=" text-white font-semibold text-xl tracking-wider cursor-default">
            NiuxBooking <span className=" font-medium text-base cursor-default">©</span>
          </span> 
        </div>
        <span className="text-gray-300  font-medium text-base cursor-default font-mono">
           NiuxDevs - Todos los derechos reservados - {date && date}.
        </span>
          <LogoForFooter />
      </footer>
    </>
  );
}
