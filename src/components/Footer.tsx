import LogoForFooter from "../svgs/LogoForFooter";

export default function Footer() {
  return (
    <>
      <footer className=" h-[123px] bg-[#474747] flex gap-28 px-28 items-center roboto-regular ">
        <div className=" flex gap-4 items-center">
          <LogoForFooter />
          <span className=" text-white font-semibold text-2xl">
            NiuxBooking
          </span>
        </div>
        <span className="text-white font-medium text-lg">
          © 2024 NiuxDevs - IDYGS71 - Todos los derechos reservados.
        </span>
      </footer>
    </>
  );
}
