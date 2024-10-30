import { useEffect, useState } from "react";
import utils from "../functions/utils"
import Request from "../functions/Requests";
import Input from "./Input";

function DashContent({ data }: any) {

  const [datos, setDatos] = useState<any>([]);

  useEffect(() => { Request.read(setDatos, data); }, [data]);

  return (
    utils.checkJson(datos) ? <Input data={datos} /> : <>Cargando...</>
  );
}

export default DashContent;