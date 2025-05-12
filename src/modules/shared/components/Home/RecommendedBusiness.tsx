import IconBusiness from "@shared/svgs/Business";
import Star from "@shared/svgs/Star";
import Location from "@shared/svgs/Location";
import GeneralBusiness from "@shared/images/services/general-business.jpg";
import { Link } from "react-router-dom";
import { type IEmpresa } from "@shared/interfaces/entities/business";

export default function RecommendedBusiness({
  empresas,
  empresasLoading,
  skeletons,
}: {
  empresas: IEmpresa[] | undefined;
  empresasLoading: boolean;
  skeletons: number[];
}) {
  return (
    <section className="  ml-5 lg:ml-10 mt-16 mb-32    ">
      <h2 className=" font-semibold text-2xl mb-4 tracking-wider text-gray-700 underline underline-offset-4 select-none cursor-default ">
        Recomendaciones
      </h2>

      <div className=" overflow-hidden">
        <div className=" flex gap-8 pt-2 px-1 pb-3 carrusel-scroll  items-center overflow-x-scroll">
          {empresas ? (
            empresas.map((empresa) => (
              <Link
                key={empresa.id}
                to={`/negocio/${empresa.slugEmpresa}`}
                className=" min-w-[320px] min-h-[300px] group      overflow-hidden  rounded-md"
              >
                <div className=" w-[320px] h-[170px] overflow-hidden group">
                  <img
                    src={
                      empresa.foto
                        ? import.meta.env.VITE_BACKEND_API + empresa.foto
                        : GeneralBusiness
                    }
                    className=" w-full h-full  object-cover rounded-t-md group-hover:scale-105 duration-300"
                    alt=""
                  />
                </div>
                <footer className=" border  bg-white      relative  border-gray-300 group-hover:border-gray-300/70 border-t-0 rounded-b-md">
                  <h3 className=" relative   pl-2 py-2 font-medium truncate line-clamp-1 text-gray-800 tracking-wide  capitalize text-lg flex items-center gap-2">
                    <span className=" text-gray-500 bg-gray-400/20  rounded-full p-1 ">
                      <IconBusiness />
                    </span>
                    {empresa.nombreEmpresa}
                  </h3>

                  <section className=" relative  pl-3 pt-1">
                    <div className=" flex items-center gap-1">
                      <span className=" font-medium text-gray-800 text-sm">
                        {" "}
                        {empresa?.promedioCalificacion !== undefined
                          ? Number.isInteger(empresa.promedioCalificacion)
                            ? `${empresa.promedioCalificacion}.0`
                            : empresa.promedioCalificacion
                          : null}
                      </span>
                      <div>
                        <Star />
                      </div>
                      <span className=" text-neutral-600 text-sm">
                        ({empresa.totalComentarios})
                      </span>
                    </div>
                  </section>
                  <section className=" relative pl-3 pt-1 flex items-center gap-1">
                    <Location />
                    <p className=" text-neutral-600  truncate line-clamp-1  ">
                      {empresa.pais +
                        ", " +
                        empresa.ciudad +
                        ", " +
                        empresa.estado}
                    </p>
                  </section>
                  <section className=" pl-3 pt-2 pb-2">
                    <button className="text-blue-500 bg-blue-500/10 p-1 relative px-3 pl-4.5 text-sm font-medium rounded-2xl hover:bg-blue-400/20 ">
                      {empresa.nombreCategoria}
                      <span className="absolute  border   left-2 top-1/2 -translate-y-1/2    size-1 bg-blue-500   rounded-full"></span>
                    </button>
                  </section>
                </footer>
              </Link>
            ))
          ) : empresasLoading ? (
            skeletons.map((e) => (
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
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2  justify-center lg:mr-10 mr-5 text-center  flex-1 h-full py-20 rounded-md bg-gray-100">
              <span className=" text-gray-600 font-medium cursor-default  ">
                No se encontraron las empresas, intentalo más tarde.
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" size-10 text-gray-400"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path
                    strokeDasharray="64"
                    strokeDashoffset="64"
                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                  >
                    <animate
                      fill="freeze"
                      attributeName="strokeDashoffset"
                      dur="0.6s"
                      values="64;0"
                    />
                  </path>
                  <path strokeDasharray="8" strokeDashoffset="8" d="M12 7v6">
                    <animate
                      fill="freeze"
                      attributeName="strokeDashoffset"
                      begin="0.6s"
                      dur="0.2s"
                      values="8;0"
                    />
                  </path>
                  <path
                    strokeDasharray="2"
                    strokeDashoffset="2"
                    d="M12 17v0.01"
                  >
                    <animate
                      fill="freeze"
                      attributeName="strokeDashoffset"
                      begin="0.8s"
                      dur="0.2s"
                      values="2;0"
                    />
                  </path>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
