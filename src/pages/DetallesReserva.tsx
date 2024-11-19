import iconLocation from "../../public/images/icons/icon-location.svg";
import iconService from "../../public/images/icons/icon-service.svg";
import iconTime from "../../public/images/icons/icon-time.svg";
import iconCalendar from "../../public/images/icons/icon-calendar.svg";
import Header from '../components/Header';

const DetallesReserva = () => {
  return (
    <>
      <Header />
      <div className="p-6 font-sans">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Detalles de la reserva */}
          <div className="flex-1 ml-20">
            <h2 className="text-4xl font-bold">Detalles de la reserva</h2>
            <div className="flex items-center mt-6">
              <img
                src="https://via.placeholder.com/400"
                alt="Barbería"
                className="w-40 h-40 rounded-lg mr-4"
              />
              <div>
                <h3 className="text-2xl font-semibold">Barber Shop Beard</h3>
                <div className="flex gap-2">
                <img className="W-15 h-15" src={iconLocation} alt="" />
                <p className="text-lg text-gray-600">
                  MX, Calle Almendro, Colonia Zetina Gazca
                </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="flex-1 mr-20 max-w-md border border-gray-300 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Resumen</h2>
            <div className="mt-6 space-y-4">
              <div className=" flex  gap-2 text-base">
              <img className="W-15 h-15" src={iconService} alt="" />
                <p className="font-semibold">Servicio:</p> <p  className="text-[#707070] font-semi ">Corte Estilo Taper Fade | 1 h y 20 mins</p>
              </div>
              <div className="flex gap-2 text-base">
              <img className="W-15 h-15" src={iconCalendar} alt="" />
                <p className="font-semibold">Fecha:</p> <p  className="text-[#707070] font-semi">11 de Noviembre 2024</p>
              </div>
              <div className="flex  gap-2 text-base">
              <img className="W-15 h-15" src={iconTime} alt="" />
                <p className="font-semibold">Horario:</p> <p className="text-[#707070] font-semi">12:00 p.m. - 1:20 p.m.</p>
              </div>
              <p className="text-lg font-bold">
                TOTAL: $140 MX
              </p>
            </div>
            <button className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-center text-lg font-medium hover:bg-purple-700 transition duration-200">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallesReserva;
