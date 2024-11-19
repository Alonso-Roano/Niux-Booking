import Header from "../components/Header";
import Location from "../svgs/Location";
import Star from "../svgs/Star";
import Barber from "../images/services/barbershop-4762345_1280.jpg";
import { Link } from "react-router-dom";
import "../styles/components/Business.css";
import ImgUser from "../images/users/beard-1845166_1280.jpg";
import Footer from "../components/Footer";
export default function Business() {
  return (
    <>
      <Header />
      <section className=" roboto-regular lg:ml-10 ml-5 pt-12">
        <h2 className=" text-5xl  font-semibold">Barber Shop Beard</h2>
        <div className=" flex items-center gap-4 mt-3">
          <div className=" flex gap-2 items-center ">
            <span className=" font-medium">5.0</span>
            <Star />

            <Star />
            <Star />
            <Star />
            <Star />
            <span className=" font-medium">(144)</span>
          </div>
          <div className=" flex gap-1 items-center text-neutral-500">
            <Location />
            <span className=" capitalize   ">
              MX, Calle Almendro, Colonia zetina Gazca
            </span>
          </div>
        </div>
        <section className=" grid grid-cols-3 gap-6 lg:mr-10 mr-5 mt-6 mb-6 max-h-[500px] ">
          <div className=" col-span-2 max-h-[500px]">
            <img
              src={Barber}
              alt=""
              className=" object-cover rounded-md h-full w-full"
            />
          </div>
          <div className=" col-span-1 flex flex-col gap-6 max-h-[500px]">
            <div>
              <img
                src={Barber}
                alt=""
                className=" object-cover rounded-md h-full w-full"
              />
            </div>
            <img
              src={Barber}
              alt=""
              className=" object-cover rounded-md h-full w-full"
            />
          </div>
        </section>
        <section className=" mt-12 grid lg:grid-cols-3 gap-5 grid-cols-1 lg:mr-10 mr-5">
          <div className=" col-span-2">
            <h3 className=" text-4xl font-semibold">Servicios</h3>

            <div className=" flex items-center gap-2 my-2 mx-2 overflow-x-scroll services-scroll font-medium">
              <Link
                to={""}
                className=" px-3 py-[6px]  rounded-3xl bg-black text-white max-w-[180px] flex-shrink-0 truncate "
              >
                Destacados
              </Link>
              <Link
                to={""}
                className=" px-3 py-[6px] rounded-3xl flex-shrink-0   hover:bg-[#F5F5F6] max-w-[180px] truncate "
              >
                Cortes de Cabello
              </Link>
              <Link
                to={""}
                className=" px-3 py-[6px] rounded-3xl flex-shrink-0 hover:bg-[#F5F5F6] max-w-[180px] truncate "
              >
                Cortes de Barba
              </Link>
              <Link
                to={""}
                className=" px-3 py-[6px] rounded-3xl flex-shrink-0 hover:bg-[#F5F5F6] max-w-[180px] truncate "
              >
                Tratamientos de Cabello
              </Link>

              <Link
                to={""}
                className=" px-3 py-[6px] rounded-3xl flex-shrink-0   hover:bg-[#F5F5F6] max-w-[180px] truncate "
              >
                Cortes de Cabello
              </Link>
              <Link
                to={""}
                className=" px-3 py-[6px] rounded-3xl flex-shrink-0 hover:bg-[#F5F5F6] max-w-[180px] truncate "
              >
                Cortes de Barba
              </Link>
              <Link
                to={""}
                className=" px-3 py-[6px] rounded-3xl flex-shrink-0 hover:bg-[#F5F5F6] max-w-[180px] truncate "
              >
                Tratamientos de Cabello
              </Link>
            </div>

            <ul className=" mt-10">
              <Link
                to={""}
                className="  hover:bg-[#F5F5F6] flex justify-between p-4 border rounded-md mb-9"
              >
                <div className=" max-w-[620px] flex flex-col gap-2 ">
                  <div className=" flex flex-col   max-w-[620px] ">
                    <span className="max-w-[620px] truncate font-medium">
                      Corte Taper Fade
                    </span>
                    <span className=" text-slate-500">1 h y 20 min</span>
                  </div>
                  <div className=" flex items-center gap-2 font-medium">
                    <span>$250</span> <span>MXN</span>
                  </div>
                </div>
                <div className="  flex items-center">
                  <Link
                    className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                    to={""}
                  >
                    Reservar
                  </Link>
                </div>
              </Link>
              <Link
                to={""}
                className="  hover:bg-[#F5F5F6] flex justify-between p-4 border rounded-md mb-9"
              >
                <div className=" max-w-[620px] flex flex-col gap-2 ">
                  <div className=" flex flex-col   max-w-[620px] ">
                    <span className="max-w-[620px] truncate font-medium">
                      Corte Taper Fade
                    </span>
                    <span className=" text-slate-500">1 h y 20 min</span>
                  </div>
                  <div className=" flex items-center gap-2 font-medium">
                    <span>$250</span> <span>MXN</span>
                  </div>
                </div>
                <div className="  flex items-center">
                  <Link
                    className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                    to={""}
                  >
                    Reservar
                  </Link>
                </div>
              </Link>
              <Link
                to={""}
                className="  hover:bg-[#F5F5F6] flex justify-between p-4 border rounded-md mb-9"
              >
                <div className=" max-w-[620px] flex flex-col gap-2 ">
                  <div className=" flex flex-col   max-w-[620px] ">
                    <span className="max-w-[620px] truncate font-medium">
                      Corte Taper Fade
                    </span>
                    <span className=" text-slate-500">1 h y 20 min</span>
                  </div>
                  <div className=" flex items-center gap-2 font-medium">
                    <span>$250</span> <span>MXN</span>
                  </div>
                </div>
                <div className="  flex items-center">
                  <Link
                    className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                    to={""}
                  >
                    Reservar
                  </Link>
                </div>
              </Link>
              <Link
                to={""}
                className="  hover:bg-[#F5F5F6] flex justify-between p-4 border rounded-md mb-9"
              >
                <div className=" max-w-[620px] flex flex-col gap-2 ">
                  <div className=" flex flex-col   max-w-[620px] ">
                    <span className="max-w-[620px] truncate font-medium">
                      Corte Taper Fade
                    </span>
                    <span className=" text-slate-500">1 h y 20 min</span>
                  </div>
                  <div className=" flex items-center gap-2 font-medium">
                    <span>$250</span> <span>MXN</span>
                  </div>
                </div>
                <div className="  flex items-center">
                  <Link
                    className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                    to={""}
                  >
                    Reservar
                  </Link>
                </div>
              </Link>
            </ul>
          </div>
          <div className=" col-span-1">
            <h3 className=" text-4xl font-semibold">Horarios</h3>
            <ul className=" my-2">
              <li className="  py-2  flex justify-between  items-center border-b border-slate-400">
                <span className=" font-medium">Lunes</span>{" "}
                <span className=" font-light">10:00 a.m. - 7:00 p.m.</span>
              </li>
              <li className=" py-2  flex justify-between  items-center  border-b border-slate-400">
                <span className=" font-medium">Martes</span>{" "}
                <span className=" font-light">10:00 a.m. - 7:00 p.m.</span>
              </li>
              <li className=" py-2  flex justify-between  items-center  border-b border-slate-400">
                <span className=" font-medium">Miercoles</span>{" "}
                <span className=" font-light">10:00 a.m. - 7:00 p.m.</span>
              </li>
              <li className=" py-2 flex justify-between  items-center  border-b border-slate-400">
                <span className=" font-medium">Jueves</span>{" "}
                <span className=" font-light">10:00 a.m. - 7:00 p.m.</span>
              </li>
              <li className=" py-2  flex justify-between items-center  border-b border-slate-400">
                <span className=" font-medium">Viernes</span>{" "}
                <span className=" font-light">10:00 a.m. - 7:00 p.m.</span>
              </li>
              <li className=" py-2 flex justify-between    items-center  border-b border-slate-400">
                <span className=" font-medium">Sábado</span>{" "}
                <span className=" font-light">10:00 a.m. - 7:00 p.m.</span>
              </li>
              <li className=" py-2  flex justify-between   items-center  border-b border-slate-400">
                <span className=" font-medium">Domingo</span>{" "}
                <span className=" font-light">Cerrado</span>
              </li>
            </ul>
          </div>
        </section>
        <section className=" lg:mr-10 mr-5 mb-10">
          <h3 className=" text-4xl font-semibold">Reseñas</h3>
          <div className=" my-3 grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-8">
            <div className="  shadow rounded-lg bg-neutral-50 p-5 max-h-[200px] min-h-[200px]">
              <div className=" flex gap-2 items-center ">
                <div className=" h-10 w-10">
                  <img
                    src={ImgUser}
                    className=" h-full w-full object-cover  rounded-full"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col">
                  <span>Cody Garbrant</span>
                  <span className=" text-slate-500  text-sm">
                    Jueves 20 de noviembre del 2023
                  </span>
                  <div className=" flex items-center gap-1">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <span className=" font-semibold">5.0</span>
                  </div>
                </div>
              </div>
              <p className="  line-clamp-4 text-gray-600">
                Es un hecho establecido hace demasiado tiempo que un lector se
                distraerá con el contenido del texto de un sitio mientras que
                mira su diseño Es un hecho establecido hace demasiado tiempo que
                un lector se distraerá con el contenido del texto de un sitio
                mientras que mira su diseño Es un hecho establecido hace
                demasiado tiempo que un lector se distraerá con el contenido del
                texto de un sitio mientras que mira su diseño Es un hecho
                establecido hace demasiado tiempo que un lector se distraerá con
                el contenido del texto de un sitio mientras que mira su diseño
              </p>
            </div>
            <div className="  shadow rounded-lg bg-neutral-50 p-5 max-h-[200px] min-h-[200px]">
              <div className=" flex gap-2 items-center ">
                <div className=" h-10 w-10">
                  <img
                    src={ImgUser}
                    className=" h-full w-full object-cover  rounded-full"
                    alt=""
                  />
                </div>
                <div className=" flex flex-col">
                  <span>Cody Garbrant</span>
                  <span className=" text-slate-500  text-sm">
                    Jueves 20 de noviembre del 2023
                  </span>
                  <div className=" flex items-center gap-1">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <span className=" font-semibold">5.0</span>
                  </div>
                </div>
              </div>
              <p className="  line-clamp-4 text-gray-600">
                Es un hecho establecido hace demasiado tiempo que un lector se
                distraerá con el contenido del texto de un sitio mientras que
                mira su diseño Es un hecho establecido hace demasiado tiempo que
                un lector se distraerá con el contenido del texto de un sitio
                mientras que mira su diseño Es un hecho establecido hace
                demasiado tiempo que un lector se distraerá con el contenido del
                texto de un sitio mientras que mira su diseño Es un hecho
                establecido hace demasiado tiempo que un lector se distraerá con
                el contenido del texto de un sitio mientras que mira su diseño
              </p>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
