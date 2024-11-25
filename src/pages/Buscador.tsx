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
import { debounce } from "lodash";

export default function Buscador() {
    const skeletons = [1, 2, 3];
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [visibleEmpresas, setVisibleEmpresas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterText, setFilterText] = useState<string>("");
    const ITEMS_PER_LOAD = 3;
    const ITEMS_INCREMENT = 3;

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const empresasResponse = await niuxApi.get("Empresa/TodasEmpresasPublico");
                const serviciosResponse = await niuxApi.get("Servicio/GetServiciosTodasEmpresas");
                const empresasConServicios = empresasResponse.data.data.map((empresa: any) => ({
                    ...empresa,
                    servicios: serviciosResponse.data.data.filter(
                        (servicio: any) => servicio.idEmpresa === empresa.id
                    ),
                }));
                setEmpresas(empresasConServicios);
                setVisibleEmpresas(empresasConServicios.slice(0, ITEMS_PER_LOAD));
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchingData();
    }, []);

    const handleScroll = debounce(async () => {
        const bottom =
            window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 50;
    
        if (bottom && isLoading) {
            setIsLoading(true);
            const nextItems = empresas.slice(
                visibleEmpresas.length,
                visibleEmpresas.length + ITEMS_INCREMENT
            );
            setVisibleEmpresas((prev) => [...prev, ...nextItems]);
            
        }else{setIsLoading(false);}
    }, 200);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [visibleEmpresas, empresas]);

    const filteredEmpresas = visibleEmpresas.filter((empresa: any) => {
        const filterTextLower = filterText.toLowerCase();
    
        const matchNombreEmpresa = empresa.nombreEmpresa?.toLowerCase().includes(filterTextLower) || false;
        const matchCategoria = empresa.nombreCategoria?.toLowerCase().includes(filterTextLower) || false;
        const matchServicios = empresa.servicios.some((servicio: any) =>
            (servicio.titulo?.toLowerCase().includes(filterTextLower) ||
            servicio.descripcion?.toLowerCase().includes(filterTextLower)) || false
        );
    
        return matchNombreEmpresa || matchCategoria || matchServicios;
    });
    return (
        <>
            <Header />
            <div className="bg-white overflow-hidden roboto-regular">
                <section className="sectionBuscador">
                    <span className="dashBusqueda buscadorEmpresa">
                        <TextField
                            label="Buscar"
                            variant="outlined"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
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
                                },
                                backgroundColor: "#fff",
                                width: "100%",
                            }}
                        />
                    </span>
                    <h2 className="font-semibold text-2xl mb-4">Empresas</h2>
                    <div className="overflow-hidden EmpresasBuscar">
                        {filteredEmpresas.length > 0 ? (
                            filteredEmpresas.map((empresa: any, index: any) => (
                                <Link key={index} to={`/negocio/${empresa.slugEmpresa}`} className="shadow-lg rounded-md">
                                    <div className="h-[170px] overflow-hidden group redondeo">
                                        <img
                                            src={
                                                empresa.foto
                                                    ? import.meta.env.VITE_BACKEND_API+empresa.foto
                                                    : GeneralBusiness
                                            }
                                        className="w-full h-full object-cover rounded-t-md group-hover:scale-105 duration-300"
                                        alt=""
                                        />
                                    </div>
                                    <footer>
                                        <h3 className="pl-3 pt-2 font-medium text-lg">
                                            {empresa.nombreEmpresa}
                                        </h3>
                                        <section className="pl-3 pt-1">
                                            <div className="flex items-center gap-1">
                                                <span>
                                                    {empresa.promedioCalificacion.toFixed(1)}
                                                </span>
                                                <Star />
                                                <span>({empresa.totalComentarios})</span>
                                            </div>
                                        </section>
                                        <section className="pl-3 pt-1 flex items-center gap-1">
                                            <Location />
                                            <p className="text-[#707070]">
                                                {empresa.pais && empresa.ciudad && empresa.estado
                                                    ? `${empresa.pais}, ${empresa.ciudad}, ${empresa.estado}`
                                                    : "Sin ubicación"}
                                            </p>
                                        </section>
                                        <section className="pl-3 pt-2 pb-2">
                                            <button className="border p-1 px-2 rounded-2xl hover:bg-[#F5F5F6]">
                                                {empresa.nombreCategoria || "Sin categoría"}
                                            </button>
                                        </section>
                                    </footer>
                                </Link>
                            ))
                        ) : (
                            skeletons.map((e) => (
                                <div
                                    key={e}
                                    role="status"
                                    className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6"
                                >
                                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-400 rounded"></div>
                                    <div className="h-2.5 bg-gray-300 rounded-full w-48 mb-4"></div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
                {isLoading && (
                        <div className="flex justify-center py-4">
                            <div className="loader"></div>
                        </div>
                    )}
                <Footer />
            </div>
        </>
    );
}
