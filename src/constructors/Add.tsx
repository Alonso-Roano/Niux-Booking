import { useEffect, useState } from "react";
import utils from "../functions/Utils"
import Request from "../functions/Requests";
import Inputs from "./Input";
import Buttons from "./Button";
import Textarea from "./Textarea";
import "../styles/constructors/Inputs.css";
import Selects from "./Selects";
import InputsFile from "./InputsFile";

function Add({ data, setClose}: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
    }, [data]);

    const click = (type:string) => {
        switch (type) {
            case 'guardarServicio': enviar(); return;
        }
    }

    const enviar = () => {
        const bodySend = {...body, "idEmpresa":1, "isDeleted": false}
        const containsFile = Object.values(bodySend).some((value:any) => value instanceof File);
        console.log(bodySend)
        if (containsFile) {
            new  Request.Post(datos.url, bodySend)
                        .SetErrors(setError)
                        .Data(datos)
                        .SetClose(setClose)
                        .SetBody(setBody)
                        .FileUploadUrl(datos.imageUrl)
                        .send();
        } else {
            new  Request.Post(datos.url, bodySend)
                        .SetErrors(setError)
                        .Data(datos)
                        .SetClose(setClose)
                        .SetBody(setBody)
                        .send();
        }
    }

    return (
    <>
        {utils.checkJson(datos) ? ( 
            <>
                <h2 className="titleDrawer">{datos.title}</h2>
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error}/>
                <Selects data={datos.select} setBody={setBody} body={body} errors={error}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error}/>
                <InputsFile data={datos.inputsFile} setBody={setBody} body={body} errors={error}/>
                {datos.buttons ? <Buttons data={datos} Click={click}></Buttons> : <></>}
            </>
           ) : (
            <div className='loaderContent'><div className='loader'></div></div>
           ) 
        }
    </>
    );
}

export default Add;