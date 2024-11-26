import Header from "../components/Header";
import Location from "../svgs/Location";
import Star from "../svgs/Star";
import Barber from "../images/services/barbershop-4762345_1280.jpg";
import { json, Link } from "react-router-dom";
import "../styles/components/Business.css";
import ImgUser from "../images/users/beard-1845166_1280.jpg";
import Footer from "../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { niuxApi } from "../api/niuxApi";
import { format } from "@formkit/tempo";
import Swal from "sweetalert2";
import GeneralBusiness from "../images/services/general-business.jpg";

export default function Business() {
  const skeletons = [1, 2, 3, 4, 5];

  /*   const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const half = queryParams.get("half"); */
  const [promedioCalificacion, setPromedioCalificacion] = useState<number>();
  const [modal, setModal] = useState(false);
  const [autorizacion, setAutorizacion] = useState<any>();
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

  interface Servicio {
    slug: string;
    imagenes: string[] | null; // Puede ser un array de strings o null
    titulo: string;
    descripcion: string;
    precio: number;
    duracion: number;
    idEmpresa: number;
    id: number;
    isDeleted: boolean;
  }

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
  const [servicioSeleccionado, setServicioSeleccionado] = useState<any>();
  const [usuario, setUsuario] = useState<any>();
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [resenias, setResenias] = useState<any>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comentario.trim() || !calificacion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!servicioSeleccionado || !usuario) {
      console.error(
        "Faltan datos esenciales para enviar la reseña y puntuación."
      );
      return;
    }
    try {
      const datosCliente = await niuxApi.get(
        `/Cliente/GetClienteByIdAppUser/${usuario.id}`
      );

      const resenaData = {
        isDeleted: false,
        comentario,
        idServicio: servicioSeleccionado.id,
        idCliente: datosCliente.data.data.id,
      };

      const puntuacionData = {
        calificacion: parseInt(calificacion, 10),
        idServicio: servicioSeleccionado.id,
        idCliente: datosCliente.data.data.id,
      };

      // Hacer ambos POST simultáneamente

      const responseResena = await niuxApi.post("/Resena", resenaData);
      const responsePuntuaion = await niuxApi.post(
        "/Puntuacion/AgregarPuntuacionServicio",
        puntuacionData
      );

      closeModal(); // Cierra el modal después de enviar
      // Muestra el SweetAlert de éxito
      Swal.fire({
        title: "¡Éxito!",
        text: "Tu reseña y puntuación han sido enviadas correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setComentario("");
      setCalificacion("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un problema al enviar los datos. Intenta de nuevo.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let user: any;
    const authData = localStorage.getItem("auth-storage"); // O sessionStorage.getItem()
    if (authData) {
      const parsedData = JSON.parse(authData); // Convierte el string en un objeto
      const status = parsedData?.state?.status; // Accede a "status"
      setAutorizacion(status);
      user = parsedData?.state?.user; // Accede al objeto "user"
      setUsuario(user);
    } else {
      setAutorizacion("unauthorized");
      setUsuario(null);
    }

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
        let arService: any;
        const responseServicios = await niuxApi.get(
          `/Servicio/GetServiciosByIdEmpresa/${businessId}`
        );
        if (user) {
          const datosCliente = await niuxApi.get(
            `/Cliente/GetClienteByIdAppUser/${user.id}`
          );

          const rS = responseServicios.data.data;
          const mapServices = rS.map(async (servicio: any) => {
            const countService = await niuxApi.get(
              "/Resena/GetTotalReseniasByClienteAndServicio",
              {
                params: {
                  idCliente: datosCliente.data.data.id,
                  idServicio: servicio.id,
                },
              }
            );

            return {
              ...servicio,
              count: countService.data.data,
            };
          });
          const promiseServices = await Promise.all(mapServices);
          arService = promiseServices;
        } else {
          arService = responseServicios.data.data;
        }

        const serviceId = responseServicios.data.data[0];
        if (serviceId) {
          const responseResenias = await niuxApi.get(
            `/Resena/GetResenasByIdServicio/${serviceId.id}`
          );
          setResenias(responseResenias.data.data);
        }

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
                activo: busquedaDia.activo,
                dia: dias[day],
                horaInicio: busquedaDia.horaInicio,
                horaFin: busquedaDia.horaFin,
              };
            } else {
              return {
                dia: dias[day],
                horaInicio: "",
                horaFin: "",
                activo: false,
              };
            }
          })
        );
        setEmpresa(responseBusinesss.data.data);
        setServicios(arService);
      } catch (error) {}
    };
    fetchingData();
  }, [slugEmpresa]);

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
  const toggleModal = (servicio: any) => {
    document.body.style.overflow = "hidden";
    setModal(!modal);

    setServicioSeleccionado(servicio);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModal(!modal);
  };
  if (!closeModal) {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <Header />
      <section className=" roboto-regular lg:ml-10 ml-5 pt-12">
        {/* Main modal */}

        {modal && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center flex  w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow ">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    {servicioSeleccionado?.titulo
                      ? servicioSeleccionado.titulo
                      : "Nombre del Servicio"}
                  </h3>

                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                    data-modal-hide="authentication-modal"
                    onClick={closeModal}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4" action="#">
                    <div>
                      <label
                        htmlFor="comentario"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Comentario
                      </label>
                      <textarea
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        name="comentario"
                        id="comentario"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label
                        htmlFor="calificacion"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Calificación
                      </label>
                      <select
                        required
                        name="calificacion"
                        id="calificacion"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="">Selecciona una calificación</option>
                        <option value="1">1</option>
                        <option value=" 2">2</option>
                        <option value=" 3">3</option>
                        <option value=" 4">4</option>
                        <option value=" 5">5</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full text-white bg-black hover:bg-black/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   "
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

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
              empresa.paisEmpresa &&
              empresa.ciudadEmpresa &&
              empresa.estadoEmpresa
                ? empresa?.paisEmpresa +
                  ", " +
                  empresa?.ciudadEmpresa +
                  ", " +
                  empresa?.estadoEmpresa
                : "Sin Dirección de Empresa"}
            </span>
          </div>
        </div>
        <section className=" grid grid-cols-3 gap-6 lg:mr-10 mr-5 mt-6 mb-6 max-h-[500px]  border">
          <div className=" col-span-2 max-h-[500px] ">
            <img
              src={
                empresa && empresa.foto
                  ? import.meta.env.VITE_BACKEND_API + empresa?.foto
                  : GeneralBusiness
              }
              alt=""
              className=" object-cover rounded-md h-full w-full"
            />
          </div>
          <div className=" col-span-1 flex   gap-6   flex-col  max-h-[500px]">
            <div className="    ">
              <img
                src={
                  empresa && empresa.foto
                    ? import.meta.env.VITE_BACKEND_API + empresa?.foto
                    : GeneralBusiness
                }
                alt=""
                className=" object-cover rounded-md h-full w-full"
              />
            </div>
            <div className=" max-h-[226px] ">
              <img
                src={
                  empresa && empresa.foto
                    ? import.meta.env.VITE_BACKEND_API + empresa?.foto
                    : GeneralBusiness
                }
                alt=""
                className=" object-cover rounded-md h-full w-full"
              />
            </div>
          </div>
        </section>
        <section className=" mt-12 grid lg:grid-cols-3 gap-5 grid-cols-1 lg:mr-10 mr-5">
          <div className=" col-span-2">
            <h3 className=" text-4xl font-semibold">Servicios</h3>

            <div className=" flex items-center gap-2 my-2   overflow-x-scroll services-scroll font-medium">
              {servicios &&
                servicios.map((service: any) => (
                  <button className=" px-3 py-[6px]  rounded-3xl bg-black text-white max-w-[180px] flex-shrink-0 truncate ">
                    {service.titulo}
                  </button>
                ))}
              {/*   <Link
                to={""}
                className=" px-3 py-[6px]  rounded-3xl bg-black text-white max-w-[180px] flex-shrink-0 truncate "
                 px-3 py-[6px] rounded-3xl flex-shrink-0   hover:bg-[#F5F5F6] max-w-[180px] truncate 
              >
                Destacados
              </Link> */}
            </div>

            <ul className=" mt-8  ">
              {servicios ? (
                servicios.map((servicio: any) => (
                  <div
                    key={servicio?.id}
                    className=" cursor-pointer  hover:bg-[#F5F5F6] flex justify-between p-4 border rounded-md mb-9"
                  >
                    <Link
                      to={`/horario/${slugEmpresa}/${servicio?.slug}`}
                      className=" max-w-[620px] flex flex-col gap-2  w-full "
                    >
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
                    </Link>
                    <div className="  flex gap-2 items-center ">
                      <Link
                        className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                        to={`/horario/${slugEmpresa}/${servicio?.slug}`}
                      >
                        Reservar
                      </Link>
                      {autorizacion &&
                      autorizacion !== "unauthorized" &&
                      servicio.count < 1 ? (
                        <button
                          onClick={() => toggleModal(servicio)}
                          className=" border py-1 px-2 rounded-2xl bg-white  hover:bg-[#F5F5F6]"
                          /*   to={`/servicio/${servicio?.slug}`} */
                        >
                          Calificar
                        </button>
                      ) : null}
                    </div>
                  </div>
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
                      {horario.activo
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
            {resenias
              ? resenias.map((resenia: any) => {
                  const stars = Math.floor(resenia.calificacionCliente);
                  const aStar = Array.from(
                    {
                      length: stars,
                    },
                    (_, index) => index
                  );
                  return (
                    <div
                      key={resenia.id}
                      className="  shadow rounded-lg bg-neutral-50 p-5 max-h-[150px] min-h-[150px]"
                    >
                      <div className=" flex gap-2 items-center ">
                        <div className=" h-10 w-10">
                          <img
                            src={ImgUser}
                            className=" h-full w-full object-cover  rounded-full"
                            alt=""
                          />
                        </div>
                        <div className=" flex flex-col">
                          <span>
                            {resenia?.nombrePersona} {resenia?.apellido1}{" "}
                            {resenia?.apellido2}
                          </span>
                          <span className=" text-slate-500  text-sm capitalize">
                            {format(resenia.fechaCreacion, { date: "full" })}
                          </span>
                          <div className=" flex items-center gap-1">
                            <span className=" font-semibold">
                              {" "}
                              {resenia.calificacionCliente &&
                              Number.isInteger(resenia.calificacionCliente)
                                ? resenia.calificacionCliente + ".0"
                                : resenia.calificacionCliente}
                            </span>

                            {aStar.map((star, index) => (
                              <Star key={index} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="  line-clamp-2 text-gray-600">
                        {resenia.comentario}
                      </p>
                    </div>
                  );
                })
              : skeletons.map((e) => (
                  <div key={e} role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-300 rounded-full w-48 mb-4" />
                    <div className="h-2 bg-gray-300 rounded-full max-w-[360px] mb-2.5" />
                    <div className="h-2 bg-gray-300 rounded-full  mb-2.5" />
                    <div className="h-2 bg-gray-300 rounded-full  max-w-[330px] mb-2.5" />
                    <div className="h-2 bg-gray-300 rounded-full  max-w-[300px] mb-2.5" />
                    <div className="h-2 bg-gray-300 rounded-full  max-w-[300px] mb-2.5" />
                    <div className="h-2 bg-gray-300 rounded-full  max-w-[360px]" />
                    <span className="sr-only">Loading...</span>
                  </div>
                ))}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
