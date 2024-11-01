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
    const [response, setReponse] = useState<any>(null);

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
    }, [data]);

    const click = (event:React.MouseEvent<HTMLButtonElement>, type:string, params:any) => {
        console.log(event, params)
        switch (type) {
            case 'si': enviar(); return;
            case 'no': actualizar(); return;
            case 'eliminar': Delete(); return;
        }
    }

    const enviar = () => {
        const url="https://jsonplaceholder.typicode.com/posts";
        Request.Post(url, body, null, {data:datos, setErrors:setError, setBody:setBody, setReponse:setReponse});
    }

    const actualizar = () => {
        const url="https://jsonplaceholder.typicode.com/posts/1";
        const bodysi = {...body, ["id"]:101}
        Request.Put(url, bodysi, null, {data:datos, setErrors:setError, setBody:setBody, setReponse:setReponse});
    }

    const Delete = () => {
        const url="https://jsonplaceholder.typicode.com/posts/1";
        Request.Delete(url, null, {setReponse:setReponse});
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
        {response && JSON.stringify(response)}
    </>
    );
}

export default Add;