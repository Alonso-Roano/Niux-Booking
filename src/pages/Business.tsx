import Header from "../components/Header";
import Location from "../svgs/Location";
import Star from "../svgs/Star";
import Barber from "../images/services/barbershop-4762345_1280.jpg";
import { Link } from "react-router-dom";
import "../styles/components/Business.css";
import ImgUser from "../images/users/beard-1845166_1280.jpg";
import Footer from "../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { niuxApi } from "../api/niuxApi";
export default function Business() {
  /*   const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const half = queryParams.get("half"); */
  const [promedioCalificacion, setPromedioCalificacion] = useState<number>();
  console.log(promedioCalificacion);
  const diasSemana = [0, 1, 2, 3, 4, 5, 6];
  const dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  const halfFloor =
    promedioCalificacion !== undefined ? Math.floor(promedioCalificacion) : 0;
  const arrStar = Array.from(
    {
      length: halfFloor,
    },
    (_, index) => index
  );

  const { slugEmpresa } = useParams();
  const [empresa, setEmpresa] = useState<any>();
  const [servicios, setServicios] = useState<any>();
  const [horarios, setHorarios] = useState<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slugEmpresa) {
      console.error("slugEmpresa es undefined o vacío");
      return; // Si no hay slugEmpresa, no hacemos nada
    }
    const fetchingData = async () => {
      try {
        const responseBusinesss: any = await niuxApi.get(
          `/Empresa/DatosEmpresaBySlug/${slugEmpresa}`
        );
        setPromedioCalificacion(
          responseBusinesss.data.data.promedioCalificacion
        );

        const businessId = responseBusinesss.data.data.id;

        if (!businessId) {
          console.error("ID de empresa no encontrado");
          return; // Termina la función si no hay un ID válido
        }
        const responseServicios = await niuxApi.get(
          `/Servicio/GetServiciosByIdEmpresa/${businessId}`
        );
        const responseHorarios = await niuxApi.get(
          `/Horario/Empresa/${businessId}`
        );
        setHorarios(
          diasSemana.map((day: any) => {
            const busquedaDia = responseHorarios.data.find(
              (horario: any) => horario.dia === day
            );
            if (busquedaDia) {
              return {
                dia: dias[day],
                horaInicio: busquedaDia.horaInicio,
                horaFin: busquedaDia.horaFin,
              };
            } else {
              return { dia: dias[day], horaInicio: "", horaFin: "" };
            }
          })
        );
        setEmpresa(responseBusinesss.data.data);
        setServicios(responseServicios.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingData();
  }, [slugEmpresa]);
  console.log("e");
  console.log(empresa);
  console.log("s");
  console.log(servicios);
  console.log("h");
  console.log(horarios);

  function formatDuration(minutes: number | undefined) {
    if (minutes) {
      const hours = Math.floor(minutes / 60); // Obtener las horas completas
      const remainingMinutes = minutes % 60; // Obtener los minutos restantes

      // Retornar el formato "X horas Y minutos"
      return `${hours} hora${
        hours !== 1 ? "s" : ""
      } ${remainingMinutes} minuto${remainingMinutes !== 1 ? "s" : ""}`;
    }
    return "";
  }
  const convertirHora = (hora: string) => {
    const date = new Date(hora); // Crear un objeto Date a partir de la cadena ISO
    let horas = date.getHours(); // Obtener la hora en formato de 24 horas
    const minutos = date.getMinutes(); // Obtener los minutos
    const ampm = horas >= 12 ? "p.m." : "a.m."; // Determinar si es AM o PM

    // Convertir a formato de 12 horas
    horas = horas % 12;
    horas = horas ? horas : 12; // La hora "0" se convierte a "12"
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    return `${horas}:${minutosFormateados} ${ampm}`; // Retornar el formato "8:00 a.m." o "6:00 p.m."
  };

  return (
    <>
      {/*    <Header /> */}
      <section className=" roboto-regular lg:ml-10 ml-5 pt-12">
        <h2 className=" text-5xl  font-semibold">{empresa?.nombreEmpresa}</h2>
        <div className=" flex items-center gap-4 mt-3">
          <div className=" flex gap-2 items-center ">
            <span className=" font-medium">
              {promedioCalificacion !== null
                ? Number.isInteger(promedioCalificacion)
                  ? promedioCalificacion + ".0"
                  : promedioCalificacion
                : null}
            </span>
            {arrStar && arrStar.map((star) => <Star key={star} />)}
            <span className=" font-medium">
              ({empresa && empresa?.totalResenas})
            </span>
          </div>
          <div className=" flex gap-1 items-center text-neutral-500">
            <Location />
            <span className=" capitalize   ">
              {empresa &&
                empresa.paisEmpresa +
                  ", " +
                  empresa.ciudadEmpresa +
                  ", " +
                  empresa.estadoEmpresa}
            </span>
          </div>
        </div>
        <section className=" grid grid-cols-3 gap-6 lg:mr-10 mr-5 mt-6 mb-6 max-h-[500px]  border">
          <div className=" col-span-2 max-h-[500px] ">
            <img
              src={Barber}
              alt=""
              className=" object-cover rounded-md h-full w-full"
            />
          </div>
          <div className=" col-span-1 flex   gap-6   flex-col  max-h-[500px]">
            <div className="    ">
              <img
                src={Barber}
                alt=""
                className=" object-cover rounded-md h-full w-full"
              />
            </div>
            <div className=" max-h-[226px] ">
              <img
                src={Barber}
                alt=""
                className=" object-cover rounded-md h-full w-full"
              />
            </div>
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
              {servicios ? (
                servicios.map((servicio: any) => (
                  <Link
                    key={servicio?.id}
                    to={`/horario/${slugEmpresa}/${servicio?.slug}`}
                    className="  hover:bg-[#F5F5F6] flex justify-between p-4 border rounded-md mb-9"
                  >
                    <div className=" max-w-[620px] flex flex-col gap-2 ">
                      <div className=" flex flex-col   max-w-[620px] ">
                        <span className="max-w-[620px] truncate font-medium capitalize">
                          {servicio.titulo}
                        </span>
                        <span className=" text-slate-500">
                          {formatDuration(servicio?.duracion)}
                        </span>
                      </div>
                      <div className=" flex items-center gap-2 font-medium">
                        <span>${servicio?.precio}</span> <span>MXN</span>
                      </div>
                    </div>
                    <div className="  flex items-center">
                      <Link
                        className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                        to={`/horario/${slugEmpresa}/${servicio?.slug}`}
                      >
                        Reservar
                      </Link>
                    </div>
                  </Link>
                ))
              ) : (
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </ul>
          </div>
          <div className=" col-span-1">
            <h3 className=" text-4xl font-semibold">Horarios</h3>
            <ul className=" my-2">
              {horarios ? (
                horarios.map((horario: any) => (
                  <li className="  py-2  flex justify-between  items-center border-b border-slate-400">
                    <span className=" font-medium">{horario.dia}</span>{" "}
                    <span className=" font-light">
                      {" "}
                      {horario.horaInicio && horario.horaFin
                        ? `${convertirHora(
                            horario.horaInicio
                          )} - ${convertirHora(horario.horaFin)}`
                        : "Cerrado"}
                    </span>
                  </li>
                ))
              ) : (
                <div
                  role="status"
                  className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
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
