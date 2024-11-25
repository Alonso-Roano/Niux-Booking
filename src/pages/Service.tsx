import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { niuxApi } from "../api/niuxApi";

export default function Services() {
  const { slugServicio } = useParams();
  const [servicio, setServicio] = useState();

  const fetchData = async () => {
    try {
      const responseServicio = await niuxApi.get(
        `/Servicio/GetServicioBySlug/${slugServicio}`
      );
      setServicio(responseServicio.data.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div>hola serviciso</div>
    </>
  );
}
