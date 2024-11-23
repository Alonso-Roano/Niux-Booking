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
import InputsFile from "./InputsFile";

function Edit({ data, bodyDatos, setClose }: any) {

    const [datos, setDatos] = useState<any>([]);
    const [body, setBody] = useState<{ [key: string]: any }>({});
    const [error, setError] = useState<{ [key: string]: any }>({});
    const [horas, setHoras] =  useState<string[]>([]);
    const [hours, setHours] = useState<{ [key: string]: any }>({});
    const {user} = useAuthStore();

    useEffect(() => { 
        Request.Read(setDatos, data); setError({});
        Request.Get(`Horario/Empresa/${user?.idEmpresa}`,setHoras);
    }, [data, bodyDatos]);

    useEffect(() => { 
        const fecha = new Date(body.fechaReserva); 
        const diaDeLaSemana = fecha.getDay();
        const horario:any = horas.find((item:any) => item.dia === diaDeLaSemana && item.activo === true);
        setHours({...hours, ["horaInicio"]:horario?.horaInicio, ["horaFin"]:horario?.horaFin, })
    }, [body.fechaReserva, bodyDatos]);

    const click = (type:string) => {
        switch (type) {
            case 'editarServicio': enviar(); return;
        }
    }

    const enviar = () => {
        const url = datos.url + "/" + bodyDatos.id;
        const bodySend = {
          ...body,
          ...(user?.rol === "Socio" ? { idEmpresa: user?.idEmpresa } : {}),
          isDeleted: false,
          id: bodyDatos.id
        };
      
        const containsFile = Object.values(bodySend).some((value: any) => value instanceof File);
        const request = new Request.Put(url, bodySend)
          .SetErrors(setError)
          .Data(datos)
          .SetClose(setClose)
          .SetBody(setBody);
      
        if (containsFile) {
          request.UrlCrear(datos.urlCrear)
        }
      
        request.send();
      };

    return (
    <>
        {utils.checkJson(datos) && horas ? ( 
            <>
                <h2 className="titleDrawer">{datos.title}</h2>
                <Inputs data={datos.input} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <Textarea data={datos.textarea} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <Selects data={datos.select} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}/>
                <TimeSelector data={datos?.duracion ? datos.duracion : null} startHour={"00:15:00"} endHour={"04:00:00"} body={body} setBody={setBody} errors={error} editDatos={bodyDatos}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaInicio ? datos.horas.horaInicio : null} startHour={hours?.horaInicio} endHour={hours.horaFin} body={body} setBody={setBody} errors={error} editDatos={bodyDatos}></TimeSelector>
                <TimeSelector data={datos?.horas?.horaFin ? datos.horas.horaFin : null} startHour={hours?.horaInicio} endHour={hours.horaFin} body={body} setBody={setBody} errors={error} editDatos={bodyDatos}></TimeSelector>
                <APISelect data={datos.selectCliente} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}></APISelect>
                <APISelect data={datos.selectServicio} setBody={setBody} body={body} errors={error} editDatos={bodyDatos}></APISelect>
                <InputsFile data={datos.inputsFile} setBody={setBody} body={body} errors={error} bodyDatos={bodyDatos}/>
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