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
    const [horas, setHoras] =  useState<string[]>([]);
    const [hours, setHours] = useState<{ [key: string]: any }>({});
    const {user} = useAuthStore();

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
        Request.Get(`Horario/Empresa/${user?.idEmpresa}`,setHoras);
    }, [data]);

    useEffect(() => { 
        const fecha = new Date(body.fechaReserva); 
        const diaDeLaSemana = fecha.getDay();
        const horario:any = horas.find((item:any) => item.dia === diaDeLaSemana && item.activo === true);
        setHours({...hours, ["horaInicio"]:horario?.horaInicio, ["horaFin"]:horario?.horaFin, })
    }, [body.fechaReserva]);

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
        {utils.checkJson(datos) && horas ? ( 
            <>
                <h2 className="titleDrawer">{datos.title}</h2>
                <p>{JSON.stringify(hours)}</p>
                <p>{JSON.stringify(horas)}</p>
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error} horas={horas}/>
                <Selects data={datos.select} setBody={setBody} body={body} errors={error}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error}/>
                <InputsFile data={datos.inputsFile} setBody={setBody} body={body} errors={error}/>
                <TimeSelector data={datos?.duracion ? datos.duracion : null} startHour={"00:15:00"} endHour={"04:00:00"} body={body} setBody={setBody} errors={error}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaInicio ? datos.horas.horaInicio : null} startHour={hours?.horaInicio} endHour={hours.horaFin} body={body} setBody={setBody} errors={error}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaFin ? datos.horas.horaFin : null} startHour={hours?.horaInicio} endHour={hours.horaFin} body={body} setBody={setBody} errors={error}></TimeSelector>
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