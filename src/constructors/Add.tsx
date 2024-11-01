import { useEffect, useState } from "react";
import utils from "../functions/Utils"
import Request from "../functions/Requests";
import Input from "./Input";
import Button from "./Button";
import Textarea from "./Textarea";

function Add({ data }: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});

    useEffect(() => { 
        Request.read(setDatos, data); setError({})
    }, [data]);

    const click = (event:React.MouseEvent<HTMLButtonElement>, type:string, params:any) => {
        console.log(event, params)
        switch (type) {
            case 'si': enviar(); return;
        }
    }

    const enviar = () => {
        const url="https://jsonplaceholder.typicode.com/posts";
        Request.post(url, body, null, {data:datos, setErrors:setError, setBody:setBody});
    }

    return (
    <>
        {utils.checkJson(datos) ? ( 
            <>
                <Input data={datos} setBody={setBody} body={body} errors={error}/>
                <Textarea data={datos} setBody={setBody} body={body} errors={error}/>
                {datos.buttons ? <Button data={datos} Click={click} params={["Carlos",{id:1,nombre:"hola",correo:"sijaja"},1]}></Button> : <></>}
            </>
           ) : (
            <>Cargando...</>
           ) 
        }
    </>
    );
}

export default Add;