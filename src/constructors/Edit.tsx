import { useEffect, useState } from "react";
import utils from "../functions/Utils"
import Request from "../functions/Requests";
import Inputs from "./Input";
import Buttons from "./Button";
import Textarea from "./Textarea";
import { useAuthStore } from "../stores/auth/authStore";
import TimeSelector from "./TimeSelector";
import APISelect from "./ApiSelect";
import Selects from "./Selects";

function Edit({ data, bodyDatos, setClose }: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});
    const {user} = useAuthStore();

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
    }, [data]);

    const click = (type:string) => {
        switch (type) {
            case 'editarServicio': enviar(); return;
        }
    }

    const enviar = () => {
        const url=datos.url+"/"+bodyDatos.id;
        const bodySend = {
            ...body,
            ...(user?.rol === "Socio" ? { idEmpresa: user?.idEmpresa } : {}),
            isDeleted: false,
            id:bodyDatos.id
        };
        new Request.Put(url, bodySend)
            .SetErrors(setError)
            .Data(datos)
            .SetClose(setClose)
            .send();
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
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <Selects data={datos.select} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <TimeSelector data={datos?.duracion ? datos.duracion : null} startHour={"00:15:00"} endHour={"04:00:00"} body={body} setBody={setBody} errors={error} editDatos={bodyDatos}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaInicio ? datos.horas.horaInicio : null} startHour={sHour} endHour={eHour} body={body} setBody={setBody} errors={error} editDatos={bodyDatos}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaFin ? datos.horas.horaFin : null} startHour={sHour2} endHour={eHour2} body={body} setBody={setBody} errors={error} editDatos={bodyDatos}></TimeSelector>
                <APISelect data={datos.selectCliente} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}></APISelect>
                <APISelect data={datos.selectServicio} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}></APISelect>
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