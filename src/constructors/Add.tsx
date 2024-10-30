import { useEffect, useState } from "react";
import utils from "../functions/utils"
import Request from "../functions/Requests";
import Input from "./Input";

function Add({ data }: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState({});

    useEffect(() => { Request.read(setDatos, data); }, [data]);

    return (
    <>
        {utils.checkJson(datos) ? <Input data={datos} setBody={setBody} body={body}/> : <>Cargando...</>}
    </>
    );
}

export default Add;