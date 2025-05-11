import { useEffect, useState } from "react";
import utils from "@admin/functions/Utils"
import Request from "@admin/functions/Requests";
import Inputs from "./Input";
import Buttons from "./Button";
import Textarea from "./Textarea";
import "@shared/styles/constructors/Inputs.css";
import Selects from "./Selects";
import InputsFile from "./InputsFile";
import { useAuthStore } from "@auth/stores/authStore";
import TimeSelector from "./TimeSelector";
import APISelect from "./ApiSelect";

function Add({ data, setClose}: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});
    const [horas, setHoras] =  useState<any[]>([]);
    const [hours, setHours] = useState<{ [key: string]: any }>({});
    const {user} = useAuthStore();

    useEffect(() => { 
        Request.Read(setDatos, data); setError({})
        if(user?.rol == "Socio") Request.Get(`Horario/Empresa/${user?.idEmpresa}`,setHoras);
        setBody({});
    }, [data]);

    useEffect(() => { 
        const fecha = new Date(body.fechaReserva); 
        const diaDeLaSemana = fecha.getDay();
        const horario:any = horas.find((item:any) => item.dia === diaDeLaSemana && item.activo === true);
        setHours({...hours, ["horaInicio"]:horario?.horaInicio, ["horaFin"]:horario?.horaFin, })
    }, [body.fechaReserva, horas]);

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
/*horaInicio": "0001-01-01T06:00:00",
        "horaFin": "0001-01-01T18:00:00", */
    return (
    <>
        {utils.checkJson(datos) && horas && hours ? ( 
            <>
                <h2 className="titleDrawer">{datos.title}</h2>
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error} horas={horas}/>
                <Selects data={datos.select} setBody={setBody} body={body} errors={error}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error}/>
                <InputsFile data={datos.inputsFile} setBody={setBody} body={body} errors={error}/>
                <TimeSelector data={datos?.duracion ? datos.duracion : null} startHour={"0001-01-01T00:15:00"} endHour={"0001-01-01T04:00:00"} body={body} setBody={setBody} errors={error}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaInicio ? datos.horas.horaInicio : null} startHour={hours?.horaInicio ? hours?.horaInicio : "0001-01-01T06:00:00" } endHour={hours?.horaFin ? hours?.horaFin : "0001-01-01T18:00:00"} body={body} setBody={setBody} errors={error}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaFin ? datos.horas.horaFin : null} startHour={hours?.horaInicio ? hours?.horaInicio : "0001-01-01T06:00:00" } endHour={hours?.horaFin ? hours?.horaFin : "0001-01-01T18:00:00"} body={body} setBody={setBody} errors={error}></TimeSelector>
                <APISelect data={datos.selectCliente} setBody={setBody} body={body} errors={error}></APISelect>
                <APISelect data={datos.selectServicio} setBody={setBody} body={body} errors={error}></APISelect>
                <APISelect data={datos.selectEmpresa} setBody={setBody} body={body} errors={error}></APISelect>
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