import GeneralUser from "@shared/images/users/general-user.png";
import StarForReview from "@shared/svgs/StarForReview";
import { Link } from "react-router-dom";

export default function Reviews({
  resenias,
  reseniasLoading,
  skeletons,
}: {
  resenias: any;
  reseniasLoading: boolean;
  skeletons: number[];
}) {
  return (
    <section className="  ml-5 lg:ml-10 mt-16 mb-32 ">
      <h2 className=" font-semibold text-2xl mb-4 text-gray-700    tracking-wider underline underline-offset-4 cursor-default select-none">
        Reseñas
      </h2>
      <div className=" overflow-hidden">
        <div className=" flex gap-6 pt-2 px-1 pb-3 carrusel-scroll  items-center overflow-x-scroll">
          {resenias ? (
            resenias.map((resenia: any) => (
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
                        src={GeneralUser}
                        className=" w-full h-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <span></span>
                  </section>
                </footer>
              </Link>
            ))
          ) : reseniasLoading ? (
            skeletons.map((e) => (
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
            ))
          ) : (
            <div className="flex flex-col items-center gap-2 justify-center lg:mr-10 mr-5 text-center flex-1 h-full py-20 rounded-md bg-gray-100">
              <span className=" text-gray-600 font-medium cursor-default ">
                No se encontraron las reseñas, intentalo más tarde.{" "}
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
