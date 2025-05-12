import Header from "@shared/components/Header";
import Hero from "@shared/components/Home/Hero";
import RecommendedBusiness from "@shared/components/Home/RecommendedBusiness";
import Reviews from "@shared/components/Home/Reviews";
import "@shared/styles/components/Home.css";
import Footer from "@shared/components/Footer";
import WeAreNiux from "@shared/svgs/WeAreNiux";
import { niuxApi } from "@core/api/niuxApi";
import { useEffect, useState } from "react";
import { type IEmpresa } from "@shared/interfaces/entities/business";
export default function Home() {
  const skeletons = [1, 2, 3, 4, 5, 6, 7];
  const [empresas, setEmpresas] = useState<IEmpresa[]>();
  const [empresasLoading, setEmpresasLoading] = useState<boolean>(false);
  const [reseniasLoading, setReseniasLoading] = useState<boolean>(false);
  const [resenias, setResenias] = useState<any>();

  useEffect(() => {
    const fetchingData = async () => {
      setEmpresasLoading(true);
      try {
        const EmpresasResponse = await niuxApi.get("/Empresa/ListaEmpresas", {
          params: { cantidadEmpresas: 10 },
        });
        setEmpresas(EmpresasResponse.data.data);
      } catch (error) {
        console.error("Error fetching empresas: ", error);
      } finally {
        setEmpresasLoading(false);
      }

      try {
        setReseniasLoading(true);
        const responseResenia = await niuxApi.get("/Resena");
        console.log(responseResenia.data.data);
        setResenias(responseResenia.data.data);
      } catch (error) {
        console.error("Error in fetchings: ", error);
      } finally {
        setReseniasLoading(false);
      }
    };
    fetchingData();
  }, []);

  return (
    <>
      <Header />
      <div className=" bg-white  overflow-hidden roboto-regular">
        <Hero />
        {/* Recomendations */}
        <RecommendedBusiness
          empresas={empresas}
          empresasLoading={empresasLoading}
          skeletons={skeletons}
        />

        {/*   Reviews */}
        <Reviews
          resenias={resenias}
          reseniasLoading={reseniasLoading}
          skeletons={skeletons}
        />

        {/* we are niux */}
        <section className=" ml-5 lg:ml-10 mt-4 mb-16 ">
          <div className=" flex justify-center items-center gap-16">
            <div className="  flex gap-2 flex-col">
              <span className=" font-semibold text-2xl tracking-wider text-gray-600 underline underline-offset-4 cursor-default select-none ">
                Somos Niux
              </span>
              <p className="  text-gray-600 max-w-[480px] mb-2">
                En Niux, somos una empresa de{" "}
                <span className=" font-semibold text-purple-600  ">
                  desarrollo de software
                </span>{" "}
                enfocada en brindar soluciones tecnológicas innovadoras y
                personalizadas para satisfacer las necesidades de nuestros
                clientes.
              </p>
              <p className="  text-gray-600 max-w-[480px]">
                Desde nuestra creación, nos hemos comprometido a ser un aliado
                estratégico para empresas y profesionales que buscan mejorar su
                eficiencia, fortalecer su presencia digital y optimizar sus
                procesos de negocio mediante herramientas tecnológicas
                avanzadas.
              </p>
            </div>
            <div className="  flex justify-start items-center ">
              <WeAreNiux />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
