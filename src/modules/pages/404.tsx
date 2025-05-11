import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <section className="roboto-regular  relative  bg-white max-w-screen min-h-screen overflow-hidden">
          <div className="flex-col md:flex-row flex items-center justify-center gap-[75px] mt-10 mb-10">
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
            <div className="z-10">
                <h1 className="text-8xl font-bold text-[#7B6FCC] text-center">404</h1>
                <p className="mt-4 text-2xl text-gray-800 text-center">Pagina no encontrada</p>
                <p className="mt-6 text-gray-700 text-center">
                    Acá tenemos links que pueden ser de ayuda:
                </p>
                <ul className="mt-4 space-y-2 flex flex-col justify-center items-center w-100">
                    <li className="w-full flex justify-center items-center">
                        <Link
                        to="/"
                        className="inline-block px-4 py-2 bg-[#7B6FCC] w-1/2 text-center text-white font-semibold rounded-lg shadow hover:bg-[#6B5FbC] transition-colors duration-200"
                        >
                        Página de inicio
                        </Link>
                    </li>
                    <li className="w-full flex justify-center items-center">
                        <Link
                        to="/Buscador"
                        className="inline-block px-4 py-2 bg-[#7B6FCC] w-1/2 text-center text-white font-semibold rounded-lg shadow hover:bg-[#6B5FbC] transition-colors duration-200"
                        >
                        Buscador
                        </Link>
                    </li>
                    </ul>

            </div>

            <div className="mt-8 z-10">
                <img
                    src="/images/confuse.png" // Reemplaza con tu URL de imagen
                    alt="Confused Person"
                    className="h-60 bubble"
                />
            </div>
          </div>
        </section>
    );
};

export default PageNotFound;
