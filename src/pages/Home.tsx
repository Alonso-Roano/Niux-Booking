import Header from "../components/Header";
import ImgGirlBooking from "../images/Imagen3-Photoroom.png";
export default function Home() {
  return (
    <>
      <Header />
      <body className="  bg-white overflow-hidden">
        <section className=" ml-5 lg:ml-10 roboto-regular mt-10  relative min-h-dvh bg-white">
          <div className=" grid grid-cols-1 lg:grid-cols-2">
            <span
              className=" bg-[#b6cef7]    h-60 w-64 blur-3xl    absolute top-2  left-10 "
              style={{ animation: "slideHorizontal 8s infinite" }}
            ></span>
            <span
              className=" bg-[#b6cef7]   h-60 w-64 blur-3xl   absolute top-8  left-[300px] "
              style={{ animation: "slideVertical 5s infinite" }}
            ></span>

            <span
              className=" bg-[#a29edb]  h-64 w-64 blur-3xl   absolute top-0  left-1/2"
              style={{ animation: "slideHorizontal 10s infinite" }}
            ></span>
            <span
              className=" bg-[#a29edb]  h-64 w-64 blur-3xl   absolute top-0  right-0"
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
            </div>
            <div className="  max-h-[450px] max-w-[450px] mx-auto z-10   ">
              <img
                src={ImgGirlBooking}
                alt=""
                className=" w-full h-full duration-1000 mix-blend-multiply [mask-image:linear-gradient(black_60%,transparent)]    "
                style={{ animation: "customBounce 5s infinite" }}
              />
            </div>
          </div>
        </section>
      </body>
    </>
  );
}
