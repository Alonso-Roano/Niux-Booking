import { useEffect, useState } from "react";
import utils from "../functions/Utils"
import Request from "../functions/Requests";
import Inputs from "./Input";
import Buttons from "./Button";
import Textarea from "./Textarea";
import "../styles/constructors/Inputs.css";
import Selects from "./Selects";
import InputsFile from "./InputsFile";
import { useAuthStore } from "../stores/auth/authStore";
import TimeSelector from "./TimeSelector";
import APISelect from "./ApiSelect";

function Add({ data, setClose}: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});
    const {user} = useAuthStore();

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
    }, [data]);

    const click = (type:string) => {
        switch (type) {
            case 'guardarServicio': enviar(); return;
        }
    }

    const enviar = async () => {
        const bodySend = {
            ...body,
            ...(user?.rol === "Socio" ? { idEmpresa: user?.idEmpresa } : {}),
            isDeleted: false
        };
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
    const sHour = datos?.horas?.horaInicio?.inicio || user?.horaInicio || "00:00:00";
    const eHour = datos?.horas?.horaInicio?.fin || user?.horaFin || "00:00:00";
    const sHour2 = datos?.horas?.horaFin?.inicio || user?.horaInicio || "00:00:00";
    const eHour2 = datos?.horas?.horaFin?.fin || user?.horaFin || "00:00:00";

    return (
    <>
        {utils.checkJson(datos) ? ( 
            <>
                <h2 className="titleDrawer">{datos.title}</h2>
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error}/>
                <Selects data={datos.select} setBody={setBody} body={body} errors={error}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error}/>
                <InputsFile data={datos.inputsFile} setBody={setBody} body={body} errors={error}/>
                <TimeSelector data={datos?.duracion ? datos.duracion : null} startHour={"00:15:00"} endHour={"04:00:00"} body={body} setBody={setBody} errors={error}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaInicio ? datos.horas.horaInicio : null} startHour={sHour} endHour={eHour} body={body} setBody={setBody} errors={error}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaFin ? datos.horas.horaFin : null} startHour={sHour2} endHour={eHour2} body={body} setBody={setBody} errors={error}></TimeSelector>
                <APISelect data={datos.selectCliente} setBody={setBody} body={body} errors={error}></APISelect>
                <APISelect data={datos.selectServicio} setBody={setBody} body={body} errors={error}></APISelect>
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