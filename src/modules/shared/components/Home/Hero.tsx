import { Link } from "react-router-dom";
import Search from "@shared/svgs/Search";
export default function Hero() {
    return (
         <section className="relative backdrop-blur-sm bg-transparent   z-10 py-20">
                 <span  style={{ animation: "slideHorizontal 40s infinite" }} className="absolute  size-10 blur-sm bg-gradient-to-b -z-10 from-white via-fuchsia-200 to-white"></span>
                 <span  style={{ animation: "slideHorizontal 40s infinite" }} className="absolute top-10 right-10  size-10 blur-sm bg-gradient-to-b -z-10 from-white via-fuchsia-200 to-white"></span>
                 <span  style={{ animation: "slideRight 40s infinite" }} className="absolute top-20 right-20  size-10 blur-sm bg-gradient-to-b -z-10 from-white via-fuchsia-200 to-white"></span>
                 <span  style={{ animation: "slideHorizontal 40s infinite" }} className="absolute top-30 right-30  size-10 blur-sm bg-gradient-to-b -z-10 from-white via-fuchsia-200 to-white"></span>
                 <span  style={{ animation: "slideHorizontal 40s infinite" }} className="absolute top-40 left-40  size-10 blur-sm bg-gradient-to-b -z-10 from-white via-fuchsia-200 to-white"></span>
                 <span  style={{ animation: "slideRight 40s infinite" }} className="absolute top-50 left-50  size-10 blur-sm bg-gradient-to-b -z-10 from-white via-fuchsia-200 to-white"></span>
       
                 <div className=" flex justify-center items-center text-center"> 
                     <p className=" font-bold  text-black   text-4xl max-w-[800px]    text-balance   leading-snug">
                       Encuentra y  <span className=" -skew-y-3 bg-linear-to-bl    from-violet-500 to-fuchsia-500 inline-block text-white px-2 ">reserva</span> los servicios ideales para ti, al instante y
                       desde cualquier lugar.
                     </p>
                 </div>
                    
                     <Link
                       className=" border-[1.5px] border-gray-200      mt-10 flex rounded-xl relative  hover:border-purple-400 duration-200    h-10 w-[370px]  mx-auto "
                       to={"/Buscador"}
                     > 
                       <div className=" bg-white pl-2  rounded-xl flex items-center  absolute inset-0">
                       <button className=" ">
                         <span className=" cursor-pointer ">
       
                         <Search   />
                         </span>
                       </button>
                         <input
                         type="text"
                         placeholder="Buscar Reservaciones ..."
                         className="  focus:outline-none  placeholder:text-gray-800   h-9 rounded-lg pl-2 w-full"
                         />
                         </div>
                         
                     </Link>
                
               </section>
    );
}