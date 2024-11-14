import { useEffect, useState } from "react";
import utils from "../functions/Utils"
import Request from "../functions/Requests";
import Inputs from "./Input";
import Buttons from "./Button";
import Textarea from "./Textarea";

function Add({ data }: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});
    const [response, setReponse] = useState<any>(null);

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
    }, [data]);

    const click = (event:React.MouseEvent<HTMLAnchorElement>, type:string, params:any) => {
        console.log(event, params)
        switch (type) {
            case 'si': enviar(); return;
            case 'no': actualizar(); return;
            case 'eliminar': Delete(); return;
        }
    }

    const enviar = () => {
        const url="https://jsonplaceholder.typicode.com/posts";
        new Request.Post(url, body).SetErrors(setError).Data(datos).send();
    }

    const actualizar = () => {
        const url="https://jsonplaceholder.typicode.com/posts/1";
        const bodysi = {...body, ["id"]:101}
        new Request.Put(url, bodysi).SetErrors(setError).Data(datos).SetReponse(setReponse).send();
    }

    const Delete = () => {
        const url="https://jsonplaceholder.typicode.com/posts/1";
        new Request.Delete(url).setSetReponse(setReponse).send();
    }

    return (
    <>
        {utils.checkJson(datos) ? ( 
            <>
                <Inputs data={datos} setBody={setBody} body={body} errors={error}/>
                <Textarea data={datos} setBody={setBody} body={body} errors={error}/>
                {datos.buttons ? <Buttons data={datos} Click={click} params={["Carlos",{id:1,nombre:"hola",correo:"sijaja"},1]}></Buttons> : <></>}
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