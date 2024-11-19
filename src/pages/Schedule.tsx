import Header from "../components/Header";
import ImgBusiness from "../images/services/barbershop-4762345_1280.jpg";
import Star from "../svgs/Star";
import { Link } from "react-router-dom";
import "../styles/components/Business.css";
import { useEffect, useState } from "react";
interface IServicio {
  nombre: string;
  precio: number;
  slug: string;
  duracion: number;
  idEmpresa: number;
}

interface horario {
  dia: number;
  horaInicio: string;
  horaFin: string;
}
interface IEmpresa {
  nombre: string;
  direccion: string;
  promedioReseñas: number;
  TotalReseñas: number;
  horario: horario[];
}
export default function Schedule() {
  //dia actual
  const fecha = new Date();
  const diaActual = fecha.getDate();
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(diaActual);

  console.log(diaSeleccionado);
  function getDaysOfCurrentMonth() {
    // Obtenemos la fecha actual
    const currentDate = new Date();
    // Obtenemos el mes actual y el año
    const currentMonth = currentDate.getMonth(); // 0 = enero, 1 = febrero, etc.
    const currentYear = currentDate.getFullYear();
    const currentDay = currentDate.getDate();
    console.log(currentDay);

    // Obtenemos el número de días en el mes actual
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    console.log(daysInMonth);

    // Generamos un array con los días del mes (del 1 al último día)
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ).filter((day) => day >= currentDay);
    return daysArray;
  }
  const daysOfCurrentMonth = getDaysOfCurrentMonth();

  const reservacionesDiaSeleccionado = [];
  const times = [
    "10:00 a.m.",
    "11:00 a.m.",
    "12:00 p.m.",
    "1:00 p.m.",
    "2:00 p.m.",
    "3:00 p.m.",
    "4:00 p.m.",
    "5:00 p.m.",
    "6:00 p.m.",
  ];
  //servicios
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
  function formatPromedioReseña(reseña: number) {}
  const [servicio, setServicio] = useState<IServicio>();
  const [empresa, setEmpresa] = useState<IEmpresa>();
  console.log(servicio);

  //useeffect para el servicio las citas y la empresa
  useEffect(() => {
    setServicio({
      nombre: "Corte Taper Fade",
      precio: 250,
      slug: "barber-shop-beard",
      duracion: 80,
      idEmpresa: 1,
    });
    setEmpresa({
      nombre: "Barber Shop Beard",
      direccion: "MX, Calle Almendro, Colonia zetina Gazca",
      promedioReseñas: 5,
      TotalReseñas: 100,
      horario: [
        {
          dia: 1,
          horaInicio: "",
          horaFin: "",
        },
        {
          dia: 2,
          horaInicio: "",
          horaFin: "",
        },
        {
          dia: 3,
          horaInicio: "",
          horaFin: "",
        },
        {
          dia: 4,
          horaInicio: "",
          horaFin: "",
        },
        {
          dia: 5,
          horaInicio: "",
          horaFin: "",
        },
      ],
    });
  }, []);
  //useeffect para los
  useEffect(() => {}, [diaSeleccionado]);
  return (
    <>
      <Header />

      <section className=" roboto-regular lg:ml-10 ml-5">
        <div className=" mt-5">
          <h2 className=" font-semibold text-4xl">Seleccionar Hora</h2>
        </div>
        <div className=" grid lg:grid-cols-5 gap-5 grid-cols-1">
          <div className=" col-span-3 mt-4">
            <h4 className=" font-medium text-md">Noviembre 2024</h4>

            <div className=" flex gap-4 overflow-x-scroll flex-shrink-0 mt-4 services-scroll">
              {daysOfCurrentMonth.map((day, index) => {
                if (day === diaSeleccionado) {
                  return (
                    <span
                      key={index}
                      className=" hover:cursor-pointer font-medium text-xl flex-shrink-0 hover:bg-[#5448A1] h-16 w-16 rounded-full flex justify-center items-center p-4 bg-[#7B6FCC]   text-white"
                    >
                      {day}
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={index}
                      className=" hover:cursor-pointer font-medium text-xl flex-shrink-0 hover:bg-[#F5F5F6] h-16 w-16 rounded-full flex justify-center items-center p-4 border"
                    >
                      {day}
                    </span>
                  );
                }
              })}
            </div>
            <div className=" flex flex-col gap-4 mt-8 lg:mr-10 mr-5">
              {times.map((time, index) => (
                <span
                  key={index}
                  className=" text-start  cursor-pointer focus:ring-2 focus:ring-[#7B6FCC] rounded-md border p-4  hover:bg-[#F5F5F6]   text-lg mb-2 "
                >
                  {time}
                </span>
              ))}
            </div>
          </div>

          <div className=" col-span-2 border lg:mr-10 max-h-[500px]   mr-5 rounded-md p-7">
            <div className=" flex items-center gap-4">
              <div className=" h-16 w-16">
                <img
                  src={ImgBusiness}
                  className=" rounded-md object-cover h-full w-full"
                  alt=""
                />
              </div>
              <div>
                <span className=" font-medium">{empresa?.nombre}</span>
                <div className=" flex gap-1 items-center">
                  <span className=" font-medium">
                    {empresa?.promedioReseñas &&
                    empresa.promedioReseñas % 2 !== 0 &&
                    empresa?.promedioReseñas &&
                    empresa.promedioReseñas % 2 !== 1
                      ? empresa.promedioReseñas
                      : empresa?.promedioReseñas + ".0"}
                  </span>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <span>({empresa?.TotalReseñas})</span>
                </div>
                <span className=" text-sm text-neutral-500">
                  {" "}
                  {empresa?.direccion}
                </span>
              </div>
            </div>
            <div className=" flex justify-between mt-5 items-center">
              <div className=" flex flex-col">
                <span className=" ">{servicio?.nombre}</span>
                <span className=" text-neutral-500 text-sm">
                  {formatDuration(servicio?.duracion)}
                </span>
              </div>
              <div>
                <span>
                  ${servicio?.precio}
                  MXN
                </span>
              </div>
            </div>
            <div className=" flex justify-between border-t mt-5 pt-4">
              <span className=" font-semibold">Total</span>
              <span className=" font-semibold">${servicio?.precio} MXN</span>
            </div>
            <div className=" rounded-md mt-6 hover:bg-black/80   bg-black text-white flex justify-center items-center ">
              <Link
                className=" font-medium w-full h-full text-center py-2"
                to={""}
              >
                Continuar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
