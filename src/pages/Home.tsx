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
export default function Home() {
  return (
    <>
      <Header />
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
        {/*   Reviews */}
        <section className="  ml-5 lg:ml-10 mt-16 mb-32 section-recent">
          <h2 className=" font-semibold text-2xl mb-4">Reseñas</h2>
          <div className=" overflow-hidden">
            <div className=" flex gap-6 pt-2 px-1 pb-3 carrusel-scroll  items-center overflow-x-scroll">
              <Link
                to={""}
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
                  <h3 className=" pl-3 pt-2 font-medium max-w-[280px] mx-auto text-lg">
                    Excelente Servicio
                  </h3>
                  <section className=" pl-3 pt-1 max-w-[280px] mx-auto text-pretty text-[#474747]">
                    <p>
                      NiuxBooking ha transformado la manera en que gestionamos
                      nuestras citas. Los pacientes ahora reservan en línea, y
                      las notificaciones automáticas ayudan a reducir
                      cancelaciones de último momento. Nos permite enfocarnos en
                      brindar mejor atención en vez de gestionar la agenda.
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 flex items-center gap-1 pb-2">
                    <div className=" h-10 w-10 rounded-full">
                      <img
                        src={UserForReview}
                        className=" w-full h-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <span>Pedro Espinoza</span>
                  </section>
                </footer>
              </Link>
              <Link
                to={""}
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
                  <h3 className=" pl-3 pt-2 font-medium max-w-[280px] mx-auto text-lg">
                    Excelente Servicio
                  </h3>
                  <section className=" pl-3 pt-1 max-w-[280px] mx-auto text-pretty text-[#474747]">
                    <p>
                      NiuxBooking ha transformado la manera en que gestionamos
                      nuestras citas. Los pacientes ahora reservan en línea, y
                      las notificaciones automáticas ayudan a reducir
                      cancelaciones de último momento. Nos permite enfocarnos en
                      brindar mejor atención en vez de gestionar la agenda.
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 flex items-center gap-1 pb-2">
                    <div className=" h-10 w-10 rounded-full">
                      <img
                        src={UserForReview}
                        className=" w-full h-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <span>Pedro Espinoza</span>
                  </section>
                </footer>
              </Link>
              <Link
                to={""}
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
                  <h3 className=" pl-3 pt-2 font-medium max-w-[280px] mx-auto text-lg">
                    Excelente Servicio
                  </h3>
                  <section className=" pl-3 pt-1 max-w-[280px] mx-auto text-pretty text-[#474747]">
                    <p>
                      NiuxBooking ha transformado la manera en que gestionamos
                      nuestras citas. Los pacientes ahora reservan en línea, y
                      las notificaciones automáticas ayudan a reducir
                      cancelaciones de último momento. Nos permite enfocarnos en
                      brindar mejor atención en vez de gestionar la agenda.
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 flex items-center gap-1 pb-2">
                    <div className=" h-10 w-10 rounded-full">
                      <img
                        src={UserForReview}
                        className=" w-full h-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <span>Pedro Espinoza</span>
                  </section>
                </footer>
              </Link>
              <Link
                to={""}
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
                  <h3 className=" pl-3 pt-2 font-medium max-w-[280px] mx-auto text-lg">
                    Excelente Servicio
                  </h3>
                  <section className=" pl-3 pt-1 max-w-[280px] mx-auto text-pretty text-[#474747]">
                    <p>
                      NiuxBooking ha transformado la manera en que gestionamos
                      nuestras citas. Los pacientes ahora reservan en línea, y
                      las notificaciones automáticas ayudan a reducir
                      cancelaciones de último momento. Nos permite enfocarnos en
                      brindar mejor atención en vez de gestionar la agenda.
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 flex items-center gap-1 pb-2">
                    <div className=" h-10 w-10 rounded-full">
                      <img
                        src={UserForReview}
                        className=" w-full h-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <span>Pedro Espinoza</span>
                  </section>
                </footer>
              </Link>
              <Link
                to={""}
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
                  <h3 className=" pl-3 pt-2 font-medium max-w-[280px] mx-auto text-lg">
                    Excelente Servicio
                  </h3>
                  <section className=" pl-3 pt-1 max-w-[280px] mx-auto text-pretty text-[#474747]">
                    <p>
                      NiuxBooking ha transformado la manera en que gestionamos
                      nuestras citas. Los pacientes ahora reservan en línea, y
                      las notificaciones automáticas ayudan a reducir
                      cancelaciones de último momento. Nos permite enfocarnos en
                      brindar mejor atención en vez de gestionar la agenda.
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 flex items-center gap-1 pb-2">
                    <div className=" h-10 w-10 rounded-full">
                      <img
                        src={UserForReview}
                        className=" w-full h-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <span>Pedro Espinoza</span>
                  </section>
                </footer>
              </Link>
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
