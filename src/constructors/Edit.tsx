import { useEffect, useState } from "react";
import utils from "../functions/Utils"
import Request from "../functions/Requests";
import Inputs from "./Input";
import Buttons from "./Button";
import Textarea from "./Textarea";

function Edit({ data, bodyDatos, setClose }: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
    }, [data]);

    const click = (type:string) => {
        switch (type) {
            case 'editarServicio': enviar(); return;
        }
    }

    const enviar = () => {
        const url=datos.url+bodyDatos.id;
        const bodySend = {...body, "idEmpresa":1, "id":bodyDatos.id, "isDeleted": false}
        new Request.Put(url, bodySend)
            .SetErrors(setError)
            .Data(datos)
            .SetClose(setClose)
            .send();
    }

    return (
    <>
        {utils.checkJson(datos) ? ( 
            <>
                <h2 className="titleDrawer">{datos.title}</h2>
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                {datos.buttons ? <Buttons data={datos} Click={click}></Buttons> : <></>}
            </>
           ) : (
            <div className='loaderContent'><div className='loader'></div></div>
           ) 
        }
    </>
    );
}

export default Edit;