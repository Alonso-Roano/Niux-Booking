import Header from "../components/Header";
import "../styles/components/Home.css";
import Star from "../svgs/Star";
import { Link } from "react-router-dom";
import Location from "../svgs/Location";
import Footer from "../components/Footer";
import { niuxApi } from "../api/niuxApi";
import { useEffect, useState } from "react";
import GeneralBusiness from "../images/services/general-business.jpg";
import { InputAdornment, TextField } from "@mui/material";
import Search from "../svgs/Search";
export default function Buscador() {
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
    const skeletons = [1, 2, 3, 4, 5];
    const [empresas, setEmpresas] = useState<IEmpresa[]>();
    const [filterText, setFilterText] = useState<string>();

    useEffect(() => {
        const fetchingData = async () => {

            try {
                const EmpresasResponse = await niuxApi.get("Empresa/TodasEmpresasPublico");
                setEmpresas(EmpresasResponse.data.data);
            } catch (error) {
                console.error("Error fetching empresas: ", error);
            }

        };

        fetchingData();
    }, []);

    return (
        <>
            <Header />
            <div className="  bg-white overflow-hidden roboto-regular">
                <section className="sectionBuscador">
                    <span className='dashBusqueda buscadorEmpresa'>
                        <TextField
                            label={"Buscar " + name}
                            variant="outlined"
                            value={filterText}
                            onChange={(e) => { setFilterText(e.target.value); }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    "& fieldset": {
                                        borderColor: "#47474799",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#222",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#8FBCFF",
                                    },
                                    "& .MuiInputLabel-root": {
                                        height: "40px"
                                    }
                                },
                                backgroundColor: "#fff",
                                height: "40px",
                                width:"100%"
                            }}
                        />
                    </span>
                    <h2 className=" font-semibold text-2xl mb-4">Recomendaciones</h2>
                    <div className=" overflow-hidden">
                        <div className="EmpresasBuscar">
                            {empresas
                                ? empresas.map((empresa) => (
                                    <Link
                                        key={empresa.id}
                                        to={`/negocio/${empresa.slugEmpresa}`}
                                        className="shadow-lg rounded-md"
                                    >
                                        {console.log(empresa)}
                                        <div className="h-[170px] overflow-hidden group">
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
                                                    {empresa.pais &&  empresa.ciudad && empresa.estado?
                                                    empresa.pais +
                                                        ", " +
                                                        empresa.ciudad +
                                                        ", " +
                                                        empresa.estado : "Sin ubicacion"}
                                                </p>
                                            </section>
                                            <section className=" pl-3 pt-2 pb-2">
                                                <button className=" border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6] ">
                                                    {empresa.nombreCategoria ? empresa.nombreCategoria : "Sin categoria" }
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

                <Footer />
            </div>
        </>
    );
}
