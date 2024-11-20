import Header from "../components/Header";
import ImgGirlBooking from "../images/Imagen3-Photoroom.png";
import RecentBarber from "../images/services/barbershop-4762345_1280.jpg";
import Search from "../svgs/Search";
import "../styles/components/Home.css";
import Star from "../svgs/Star";
import { Link } from "react-router-dom";
import Location from "../svgs/Location";
import StarForReview from "../svgs/StarForReview";
import UserForReview from "../images/users/beard-1845166_1280.jpg";
import Footer from "../components/Footer";
import WeAreNiux from "../svgs/WeAreNiux";
import { niuxApi } from "../api/niuxApi";
import { useEffect, useState } from "react";
import GeneralBusiness from "../images/services/general-business.jpg";
import GeneralUser from "../images/users/general-user.png";
export default function Home() {
  interface IEmpresa {
    id: number;
    nombreCategoria: string;
    nombreEmpresa: string;
    pais: string;
    ciudad: string;
    estado: string;
    foto: null | string;
    promedioCalificacion: number;
    totalComentarios: number;
    slugEmpresa: string;
  }
  interface IPerson {
    apellido1: string;
    apellido2: string;
    applicationUser: null;
    createdAt: string;
    edad: number;
    id: number;
    idApplicationUser: string;
    isDeleted: boolean;
    nombres: string;
    sexo: number;
  }
  interface ICliente {
    createdAt: string;
    id: number;
    idPersona: number;
    isDeleted: boolean;
    persona: IPerson;
  }
  interface IResenia {
    comentario: string;
    idServicio: number;
    servicio: null | object;
    idCliente: number;
    cliente: null | ICliente;
    id: number;
    isDeleted: boolean;
    createdAt: string;
  }
  const skeletons = [1, 2, 3, 4, 5];
  const [empresas, setEmpresas] = useState<IEmpresa[]>();
  const [resenias, setResenias] = useState<any>();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const EmpresasResponse = await niuxApi.get("/Empresa/ListaEmpresas", {
          params: { cantidadEmpresas: 10 },
        });
        setEmpresas(EmpresasResponse.data.data);
      } catch (error) {
        console.error("Error fetching empresas: ", error);
      }

      try {
        const responseResenia = await niuxApi.get("/Resena");
        const fetchingClient = responseResenia.data.data.map(
          async (resenia: IResenia) => {
            const clienteResponse = await niuxApi.get(
              `/Cliente/${resenia.idCliente}`
            );
            return { ...resenia, cliente: clienteResponse.data.data };
          }
        );
        const promisesForClients = await Promise.all(fetchingClient);
        const fetchingPerson = promisesForClients.map(
          async (resenia: IResenia) => {
            const person = await niuxApi.get(
              `/Persona/${resenia.cliente?.idPersona}`
            );
            return {
              ...resenia,
              cliente: { ...resenia.cliente, persona: person.data.data },
            };
          }
        );
        const promisesforPersons = await Promise.all(fetchingPerson);
        setResenias(promisesforPersons);
      } catch (error) {
        console.error("Error in fetchings: ", error);
      }
    };

    fetchingData();
  }, []);
  /*   console.log("r");
  console.log(resenias);
  console.log("e");
  console.log(empresas); */

  return (
    <>
      {/*  <Header /> */}
      <body className="  bg-white overflow-hidden roboto-regular">
        <section className=" ml-5 lg:ml-10 roboto-regular mt-10  relative  bg-white">
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
            <span
              className=" bg-[#b6cef7]    h-60 w-64 blur-3xl     absolute top-2  left-10 "
              style={{ animation: "slideHorizontal 8s infinite" }}
            ></span>
            <span
              className=" bg-[#b6cef7]   h-60 w-64 blur-3xl    absolute top-8  left-[300px] "
              style={{ animation: "slideVertical 5s infinite" }}
            ></span>

            <span
              className=" bg-[#a29edb]  h-64 w-64 blur-3xl  absolute top-0  left-1/2"
              style={{ animation: "slideHorizontal 10s infinite" }}
            ></span>
            <span
              className=" bg-[#a29edb]  h-64 w-64 blur-3xl    absolute top-0  right-0"
              style={{ animation: "slideRight 7s infinite" }}
            ></span>

            <div className=" z-10">
              <p className=" font-bold text-5xl max-w-[500px] text-balance  leading-snug">
                Encuentra y reserva los servicios ideales para ti, al instante y
                desde cualquier lugar.
              </p>
              <p className="  text-2xl max-w-[500px] text-pretty mt-6 text-gray-500">
                Encuentra y reserva los servicios ideales para ti, al instante y
                desde cualquier lugar.
              </p>
              <div className=" border border-slate-400 h-10 w-[370px]   pl-4 mt-10 rounded-lg flex gap-2 items-center">
                <button className=" text-red-500">
                  <Search />
                </button>
                <input
                  type="text"
                  placeholder="Buscar Reservaciones ..."
                  className="  focus:outline-none   h-9 rounded-lg pl-2 w-full"
                />
              </div>
            </div>
            <div className="  max-h-[450px] max-w-[450px] mx-auto z-10   ">
              <img
                src={ImgGirlBooking}
                alt=""
                className=" w-full h-full duration-1000 mix-blend-multiply [mask-image:linear-gradient(black_60%,transparent)]     "
                style={{ animation: "customBounce 5s infinite" }}
              />
            </div>
          </div>
        </section>
        {/* Recent */}
        <section className="  ml-5 lg:ml-10 mt-16 mb-32 section-recent">
          <h2 className=" font-semibold text-2xl mb-4">Vistos Recientemente</h2>
          <div className=" overflow-hidden">
            <div className=" flex gap-6 pt-2 px-1 pb-3 carrusel-scroll  items-center overflow-x-scroll">
              <Link
                to={""}
                className=" w-[320px] min-h-[300px]  shadow-lg rounded-md"
              >
                <div className=" w-[320px] h-[170px] overflow-hidden group">
                  <img
                    src={RecentBarber}
                    className=" w-full h-full object-cover rounded-t-md group-hover:scale-105 duration-300"
                    alt=""
                  />
                </div>
                <footer>
                  <h3 className=" pl-3 pt-2 font-medium text-lg">
                    Barber Shop
                  </h3>
                  <section className=" pl-3 pt-1">
                    <div className=" flex items-center gap-1">
                      <span>5.0</span>
                      <div>
                        <Star />
                      </div>
                      <span>(1000)</span>
                    </div>
                  </section>
                  <section className=" pl-3 pt-1 flex items-center gap-1">
                    <Location />
                    <p className=" text-[#707070]">
                      Av. las Torres Blv. Kukulkan
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 pb-2">
                    <button className=" border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6] ">
                      Barberia
                    </button>
                  </section>
                </footer>
              </Link>
              <Link
                to={""}
                className=" w-[320px] min-h-[300px]  shadow-lg rounded-md"
              >
                <div className=" w-[320px] h-[170px] overflow-hidden group">
                  <img
                    src={RecentBarber}
                    className=" w-full h-full object-cover rounded-t-md group-hover:scale-105 duration-300"
                    alt=""
                  />
                </div>
                <footer>
                  <h3 className=" pl-3 pt-2 font-medium text-lg">
                    Barber Shop
                  </h3>
                  <section className=" pl-3 pt-1">
                    <div className=" flex items-center gap-1">
                      <span>5.0</span>
                      <div>
                        <Star />
                      </div>
                      <span>(1000)</span>
                    </div>
                  </section>
                  <section className=" pl-3 pt-1 flex items-center gap-1">
                    <Location />
                    <p className=" text-[#707070]">
                      Av. las Torres Blv. Kukulkan
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 pb-2">
                    <button className=" border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6] ">
                      Barberia
                    </button>
                  </section>
                </footer>
              </Link>
              <Link
                to={""}
                className=" w-[320px] min-h-[300px]  shadow-lg rounded-md"
              >
                <div className=" w-[320px] h-[170px] overflow-hidden group">
                  <img
                    src={RecentBarber}
                    className=" w-full h-full object-cover rounded-t-md group-hover:scale-105 duration-300"
                    alt=""
                  />
                </div>
                <footer>
                  <h3 className=" pl-3 pt-2 font-medium text-lg">
                    Barber Shop
                  </h3>
                  <section className=" pl-3 pt-1">
                    <div className=" flex items-center gap-1">
                      <span>5.0</span>
                      <div>
                        <Star />
                      </div>
                      <span>(1000)</span>
                    </div>
                  </section>
                  <section className=" pl-3 pt-1 flex items-center gap-1">
                    <Location />
                    <p className=" text-[#707070]">
                      Av. las Torres Blv. Kukulkan
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 pb-2">
                    <button className=" border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6] ">
                      Barberia
                    </button>
                  </section>
                </footer>
              </Link>

              <Link
                to={""}
                className=" w-[320px] min-h-[300px]  shadow-lg rounded-md"
              >
                <div className=" w-[320px] h-[170px] overflow-hidden group">
                  <img
                    src={RecentBarber}
                    className=" w-full h-full object-cover rounded-t-md group-hover:scale-105 duration-300"
                    alt=""
                  />
                </div>
                <footer>
                  <h3 className=" pl-3 pt-2 font-medium text-lg">
                    Barber Shop
                  </h3>
                  <section className=" pl-3 pt-1">
                    <div className=" flex items-center gap-1">
                      <span>5.0</span>
                      <div>
                        <Star />
                      </div>
                      <span>(1000)</span>
                    </div>
                  </section>
                  <section className=" pl-3 pt-1 flex items-center gap-1">
                    <Location />
                    <p className=" text-[#707070]">
                      Av. las Torres Blv. Kukulkan
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 pb-2">
                    <button className=" border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6] ">
                      Barberia
                    </button>
                  </section>
                </footer>
              </Link>
            </div>
          </div>
        </section>
        {/* Recomendations */}
        <section className="  ml-5 lg:ml-10 mt-16 mb-32 section-recent">
          <h2 className=" font-semibold text-2xl mb-4">Recomendaciones</h2>
          <div className=" overflow-hidden">
            <div className=" flex gap-6 pt-2 px-1 pb-3 carrusel-scroll  items-center overflow-x-scroll">
              {empresas
                ? empresas.map((empresa) => (
                    <Link
                      key={empresa.id}
                      to={`/negocio/${empresa.slugEmpresa}`}
                      className=" w-[320px] min-h-[300px]  shadow-lg rounded-md"
                    >
                      <div className=" w-[320px] h-[170px] overflow-hidden group">
                        <img
                          src={empresa.foto ? empresa.foto : GeneralBusiness}
                          className=" w-full h-full object-cover rounded-t-md group-hover:scale-105 duration-300"
                          alt=""
                        />
                      </div>
                      <footer>
                        <h3 className=" pl-3 pt-2 font-medium text-lg">
                          {empresa.nombreEmpresa}
                        </h3>
                        <section className=" pl-3 pt-1">
                          <div className=" flex items-center gap-1">
                            <span>
                              {" "}
                              {empresa?.promedioCalificacion !== undefined
                                ? Number.isInteger(empresa.promedioCalificacion)
                                  ? `${empresa.promedioCalificacion}.0` // Si es entero, agrega .0
                                  : empresa.promedioCalificacion
                                : null}
                            </span>
                            <div>
                              <Star />
                            </div>
                            <span>({empresa.totalComentarios})</span>
                          </div>
                        </section>
                        <section className=" pl-3 pt-1 flex items-center gap-1">
                          <Location />
                          <p className=" text-[#707070]">
                            {empresa.pais +
                              ", " +
                              empresa.ciudad +
                              ", " +
                              empresa.estado}
                          </p>
                        </section>
                        <section className=" pl-3 pt-2 pb-2">
                          <button className=" border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6] ">
                            {empresa.nombreCategoria}
                          </button>
                        </section>
                      </footer>
                    </Link>
                  ))
                : skeletons.map((e) => (
                    <div
                      key={e}
                      role="status"
                      className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 "
                    >
                      <div className="flex items-center justify-center h-48 mb-4 bg-gray-400 rounded ">
                        <svg
                          className="w-10 h-10 text-gray-300 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full  w-48 mb-4" />
                      <div className="h-2 bg-gray-300 rounded-full  mb-2.5" />
                      <div className="h-2 bg-gray-300 rounded-full  mb-2.5" />
                      <div className="h-2 bg-gray-300 rounded-full " />
                      <div className="flex items-center mt-4">
                        <svg
                          className="w-10 h-10 me-3 text-gray-300 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div>
                          <div className="h-2.5 bg-gray-300 rounded-full  w-32 mb-2" />
                          <div className="w-48 h-2 bg-gray-300 rounded-full " />
                        </div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ))}
            </div>
          </div>
        </section>
        {/*   Reviews */}
        <section className="  ml-5 lg:ml-10 mt-16 mb-32 section-recent">
          <h2 className=" font-semibold text-2xl mb-4">Reseñas</h2>
          <div className=" overflow-hidden">
            <div className=" flex gap-6 pt-2 px-1 pb-3 carrusel-scroll  items-center overflow-x-scroll">
              {resenias
                ? resenias.map((resenia: any) => (
                    <Link
                      to={""}
                      key={resenia.id}
                      className=" min-w-[320px] min-h-[300px] px-4  shadow-lg rounded-md border"
                    >
                      <div className=" flex justify-around items-center gap-1 max-w-[280px] mx-auto   pt-2 ">
                        <StarForReview />
                        <StarForReview />
                        <StarForReview />
                        <StarForReview />
                        <StarForReview />
                      </div>
                      <footer>
                        <h3 className=" pl-3 pt-2 font-medium max-w-[280px] mx-auto text-lg line-clamp-1">
                          Excelente Servicio {resenia.comentario}
                        </h3>
                        <section className=" pl-3 pt-1 max-w-[280px] line-clamp-6 mx-auto text-pretty text-[#474747]">
                          <p>
                            NiuxBooking ha transformado la manera en que
                            gestionamos nuestras citas. Los pacientes ahora
                            reservan en línea, y las notificaciones automáticas
                            ayudan a reducir cancelaciones de último momento.
                            Nos permite enfocarnos en brindar mejor atención en
                            vez de gestionar la agenda.
                          </p>
                        </section>
                        <section className=" pl-3 pt-2 flex items-center gap-1 pb-2">
                          <div className=" h-10 w-10 rounded-full">
                            <img
                              src={GeneralUser}
                              className=" w-full h-full rounded-full object-cover"
                              alt=""
                            />
                          </div>
                          <span>
                            {resenia?.cliente?.persona?.nombres +
                              " " +
                              resenia?.cliente?.persona?.apellido1 +
                              " " +
                              resenia?.cliente?.persona?.apellido2}
                          </span>
                        </section>
                      </footer>
                    </Link>
                  ))
                : skeletons.map((e) => (
                    <div
                      key={e}
                      role="status"
                      className="max-w-sm animate-pulse"
                    >
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
          </div>
        </section>

        {/* we are niux */}
        <section className=" ml-5 lg:ml-10 mt-4 mb-10">
          <div className=" grid lg:grid-cols-3 gap-10 lg:gap-0  grid-cols-1 px-16   lg:px-24">
            <div className=" col-span-1 flex justify-start items-center ">
              <WeAreNiux />
            </div>
            <div className=" col-span-2 flex gap-2 flex-col">
              <span className=" font-semibold text-3xl ">Somos Niux</span>
              <p className=" text-[#474747] text-xl">
                En Niux, somos una empresa de desarrollo de software enfocada en
                brindar soluciones tecnológicas innovadoras y personalizadas
                para satisfacer las necesidades de nuestros clientes. Desde
                nuestra creación, nos hemos comprometido a ser un aliado
                estratégico para empresas y profesionales que buscan mejorar su
                eficiencia, fortalecer su presencia digital y optimizar sus
                procesos de negocio mediante herramientas tecnológicas
                avanzadas.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </body>
    </>
  );
}
