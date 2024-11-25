import Header from "../components/Header";
import ImgBusiness from "../images/services/barbershop-4762345_1280.jpg";
import Star from "../svgs/Star";
import { format } from "@formkit/tempo";
import { json, Link, useNavigate } from "react-router-dom";
import "../styles/components/Business.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { niuxApi } from "../api/niuxApi";
import GeneralBusiness from "../images/services/general-business.jpg";
import Footer from "../components/Footer";
import Calendar from "../svgs/Calendar";
import Watch from "../svgs/Watch";
import ArrowMonth from "../svgs/NextMonth";
import NextMonth from "../svgs/NextMonth";
import PreviousMonth from "../svgs/PreviousMonth";
import { dividerClasses } from "@mui/material";
interface IServicio {
  titulo: string;
  precio: number;
  slug: string;
  duracion: number;
  idEmpresa: number;
}

interface horario {
  dia: number;
  horaInicio: string;
  horaFin: string;
}
interface IEmpresa {
  foto: string;
  nombreEmpresa: string;
  paisEmpresa: string;
  ciudadEmpresa: string;
  estadoEmpresa: string;
  promedioCalificacion: number;
  totalResenas: number;
  horario: horario[];
}
export default function Schedule() {
  const navegacion = useNavigate();
  //parametros de la ruta
  const { slugEmpresa, slugServicio } = useParams();
  //estados iniciales
  const [usuario, setUsuario] = useState<any>();
  const [autorizacion, setAutorizacion] = useState<any>();
  const [fotoEmpresa, setFotoEmpresa] = useState<any>();
  const [nombreEmpresa, setNombreEmpresa] = useState<any>();
  const [nombreServicio, setNombreServicio] = useState<any>();
  const [total, setTotal] = useState<any>();
  const [fechaActual, setFechaActual] = useState<any>(); //"2024-11-23"
  const [contadorMes, setContadorMes] = useState<any>();
  const [mesSeleccionado, setMesSeleccionado] = useState<number>(); //11
  const [añoSeleccionado, setAñoSeleccionado] = useState<any>(); //2024
  const [fechaSeleccionada, setFechaSeleccionada] = useState<any>(); //"2024-11-23"
  const [diasDelMesSeleccionado, setDiasDelMesSeleccionado] = useState<any>(); //[{}]
  const [horaInicio, setHoraInicio] = useState<any>(); //"6:00 a. m."
  const [horaFin, setHoraFin] = useState<any>(); //"6:30 a. m."
  const [horaInicioBd, setHoraInicioBd] = useState<any>(); //"0001-01-01 6:0:00.0000000"
  const [horaFinBd, setHoraFinBd] = useState<any>(); //"0001-01-01 6:0:00.0000000"
  const [fechaPresentacion, setFechaPresentacion] = useState<any>(); //sábado 23 noviembre
  const [duracionServicio, setDuracionServicio] = useState<any>(); //120
  const [idServicio, setIdServicio] = useState<any>(); //1
  const [intervalosDisponibles, setIntervalosDisponibles] = useState<any>(); //[{}]
  const [servicio, setServicio] = useState<IServicio>(); //{}
  const [empresa, setEmpresa] = useState<IEmpresa>(); //{}
  const [horarios, setHorarios] = useState<any>(); //[{}]
  const [horarioPivote, setHorarioPivote] = useState<any>(); //{}

  console.log("anitp");

  const diasSemanaParaDate = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses: Record<number, string> = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octubre",
    11: "Noviembre",
    12: "Diciembre",
  };

  const diasSemana = [0, 1, 2, 3, 4, 5, 6];
  const dias = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  //servicios
  function formatDuration(minutes: number | undefined) {
    if (minutes) {
      const hours = Math.floor(minutes / 60); // Obtener las horas completas
      const remainingMinutes = minutes % 60; // Obtener los minutos restantes

      // Retornar el formato "X horas Y minutos"
      return `${hours} hora${
        hours !== 1 ? "s" : ""
      } ${remainingMinutes} minuto${remainingMinutes !== 1 ? "s" : ""}`;
    }
    return "";
  }
  function formatPromedioReseña(reseña: number) {}
  //useeffect para el servicio, horario, empresa,las citas y el mes actual y el dia actual

  console.log("h");
  console.log(horarios);
  const fetchData = async (fechaInicial = new Date()) => {
    try {
      const responseEmpresa = await niuxApi.get(
        `/Empresa/DatosEmpresaBySlug/${slugEmpresa}`
      );

      setFotoEmpresa(responseEmpresa.data.data.fotoEmpresa);
      setNombreEmpresa(responseEmpresa.data.data.nombreEmpresa);

      const responseServicio = await niuxApi.get(
        `/Servicio/GetServicioBySlug/${slugServicio}`
      );
      setDuracionServicio(responseServicio.data.data.duracion);
      setIdServicio(responseServicio.data.data.id);
      setServicio(responseServicio.data.data);

      setNombreServicio(responseServicio.data.data.titulo);
      setTotal(responseServicio.data.data.precio);
      setEmpresa(responseEmpresa.data.data);

      const businessId = responseEmpresa.data.data.id;

      if (businessId) {
        const responseHorarios = await niuxApi.get(
          `/Horario/Empresa/${businessId}`
        );
        console.log("prueba hora");
        console.log(responseHorarios.data);

        let horariosTransformados = diasSemana.map((day: any) => {
          const busquedaDia = responseHorarios.data.find(
            (horario: any) => horario.dia === day
          );
          if (busquedaDia) {
            return {
              activo: busquedaDia.activo,
              dia: dias[day],
              horaInicio: busquedaDia.horaInicio,
              horaFin: busquedaDia.horaFin,
            };
          } else {
            return {
              activo: false,
              dia: dias[day],
              horaInicio: "",
              horaFin: "",
            };
          }
        });
        console.log("hor trans");

        console.log(horariosTransformados);

        setHorarios(horariosTransformados);
        //empieza las fechas
        const currentMonth = fechaInicial.getMonth(); // 0 = enero, 1 = febrero, etc.
        const mesCorrecto = currentMonth + 1;
        setContadorMes(0);
        setMesSeleccionado(mesCorrecto);
        const currentYear = fechaInicial.getFullYear();
        setAñoSeleccionado(currentYear);
        const currentDayMonth = fechaInicial.getDate();
        //setear la fecha actual
        let feActual = `${currentYear}-${mesCorrecto}-${
          currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
        }`;
        setFechaActual(feActual);
        let feSeleccionada = `${currentYear}-${mesCorrecto}-${
          currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
        }`;
        //setear la fecha inicial en el estado
        setFechaSeleccionada(feSeleccionada);
        //setear la fecha inicial formateada en el estado
        /*   let fechaFormateada = new Date(
          `${currentYear}-${mesCorrecto}-${
            currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
          } 00:00:00.0000000`
        ); */

        // Obtenemos el número de días en el mes actual
        const daysInMonth = new Date(currentYear, mesCorrecto, 0).getDate();
        let hey = new Date(
          `${currentYear}-${mesCorrecto}-${currentDayMonth} 00:00:00.0000000`
        );
        console.log(hey);

        // Generamos un array con los días del mes (del 1 al último día)
        let arrayMeses = Array.from(
          { length: daysInMonth },
          (_, index) => index + 1
        );
        const arrayFinal = arrayMeses.map((dia: any) => {
          let diaDeLaSemana = new Date(
            `${currentYear}-${mesCorrecto}-${dia} 00:00:00.0000000`
          ).getDay();

          let diaDeLaSemanaNombre = diasSemanaParaDate[diaDeLaSemana]; //viernes
          let objeHorario = horariosTransformados.find(
            (horario) => horario.dia === diaDeLaSemanaNombre
            //{horaInicio,HoraFin}
          );
          return {
            activo: objeHorario?.activo,
            fecha: `${currentYear}-${mesCorrecto}-${dia > 9 ? dia : "0" + dia}`,
            diaSemana: diaDeLaSemanaNombre,
            dia: dia > 9 ? dia : parseInt("0" + dia),
            horaInicio: objeHorario?.horaInicio,
            horaFin: objeHorario?.horaFin,
          };
        });
        console.log("meses");
        console.log(arrayFinal);

        setDiasDelMesSeleccionado(arrayFinal);

        //filtrar horarios
        let objetoFechaSeleccionado = arrayFinal.find(
          (item) => item.fecha === feSeleccionada
        );
        if (objetoFechaSeleccionado) {
          if (
            objetoFechaSeleccionado.activo == false
            /*   objetoFechaSeleccionado.horaFin == "" &&
            objetoFechaSeleccionado.horaInicio == "" */
          ) {
            setIntervalosDisponibles([]);
          } else {
            let horaInicio = objetoFechaSeleccionado.horaInicio;

            let dateHoraInicio = new Date(horaInicio);
            /*   console.log("sdh");

            console.log(dateHoraInicio);

            let dateHoraInicioFormat = format(dateHoraInicio, "h:mm a", "es");
            console.log("dbsi");
            console.log(dateHoraInicioFormat); */

            let horaInicioMinutos =
              dateHoraInicio.getHours() * 60 + dateHoraInicio.getMinutes();
            /*      console.log("hora inicio minutos");
          console.log(horaInicioMinutos); */

            let horaFin = objetoFechaSeleccionado.horaFin;
            let dateHoraFin = new Date(horaFin);
            let horaFinMinutos =
              dateHoraFin.getHours() * 60 + dateHoraFin.getMinutes();
            /*     console.log("hora fin minutos");
          console.log(horaFinMinutos);
          console.log("hhh");
          console.log(objetoFechaSeleccionado); */

            // Duración del servicio en minutos
            let servicioMinutos = responseServicio.data.data.duracion;
            // Arreglo para guardar los intervalos válidos
            let intervalosDisponibles = [];
            // Iniciar desde horaInicioMinutos y avanzar de 15 en 15
            let tiempoEvaluado = horaInicioMinutos;
            while (tiempoEvaluado + servicioMinutos <= horaFinMinutos) {
              // Calcular la hora de inicio y fin del intervalo actual
              let inicio = tiempoEvaluado;
              let fin = tiempoEvaluado + servicioMinutos;

              // Convertir los minutos a formato de hora
              let horaInicioFormato = new Date(
                `${currentYear}-${mesCorrecto}-${
                  currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
                } ${Math.floor(inicio / 60)}:${inicio % 60}:00.0000000`
              );

              let horaFinFormato = new Date(
                `${currentYear}-${mesCorrecto}-${
                  currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
                } ${Math.floor(fin / 60)}:${fin % 60}:00.0000000`
              );

              // Agregar el intervalo al arreglo
              intervalosDisponibles.push({
                /*    fecha: `${currentYear}-${mesCorrecto}-${
                currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
              }`, */

                fechaPresentacion: format(horaInicioFormato, "dddd DD MMMM"),
                tiempoInicio: inicio,
                tiempoFin: fin,
                horaInicio: format(horaInicioFormato, "h:mm a", "es"),
                horaFin: format(horaFinFormato, "h:mm a", "es"),
                horaInicioBD: inicio,
                horaFinBD: fin,
                /* horaInicioBD: `${Math.floor(inicio / 60)}:${inicio % 60}`,
                horaFinBD: `${Math.floor(fin / 60)}:${fin % 60}`, */
              });

              // Incrementar el tiempo evaluado en 15 minutos
              tiempoEvaluado += 15;
            }
            //filtrar si la fecha seleccionada es igual a la fecha actual
            if (feSeleccionada == feActual) {
              let fechaAct = new Date();
              let horaAct = fechaAct.getHours() * 60 + fechaAct.getMinutes();
              const intervalosFiltrados = intervalosDisponibles.filter(
                (intervalo) => intervalo.tiempoInicio > horaAct
              );
              intervalosDisponibles = intervalosFiltrados;
            }
            let idServi = responseServicio.data.data.id;
            let reActuales = [];
            try {
              const reservasActuales = await niuxApi.get(
                `/Reserva/GetReservasByIdServicioAndFecha`,
                {
                  params: {
                    idServicio: idServi,
                    fecha: feSeleccionada.toString(),
                  },
                }
              );
              console.log("reservaciones actuales");
              let rePreFormateados = reservasActuales.data.data;
              let reActualesFormateados = rePreFormateados.map(
                (reservacion: any) => {
                  let horaInicioDate = new Date(reservacion.horaInicio);
                  let horaInicioMinutos =
                    horaInicioDate.getHours() * 60 +
                    horaInicioDate.getMinutes();
                  let horaFinDate = new Date(reservacion.horaFin);
                  let horaFinMinutos =
                    horaFinDate.getHours() * 60 + horaFinDate.getMinutes();
                  return {
                    ...reservacion,
                    horaInicioMinutos: horaInicioMinutos,
                    horaFinMinutos: horaFinMinutos,
                  };
                }
              );
              reActuales = reActualesFormateados;
              /*    console.log("reservacion formateados");
            console.log(reActuales); */
            } catch (error) {
              console.log(error);
            }
            if (reActuales.length > 0) {
              // Filtrar intervalos disponibles excluyendo los solapados
              intervalosDisponibles = intervalosDisponibles.filter(
                (intervalo) => {
                  return !reActuales.some((reservacion: any) => {
                    const inicioDisponible = intervalo.tiempoInicio;
                    const finDisponible = intervalo.tiempoFin;
                    const inicioReservado = reservacion.horaInicioMinutos;
                    const finReservado = reservacion.horaFinMinutos;

                    // Verificar si hay solapamiento
                    return !(
                      finDisponible <= inicioReservado ||
                      inicioDisponible >= finReservado
                    );
                  });
                }
              );
            }

            console.log("Intervalos disponibles:");
            setIntervalosDisponibles(intervalosDisponibles);
            console.log(intervalosDisponibles);
          }
        }
      }

      /* console.log("se");
      console.log(responseServicio.data.data);
      console.log("em");
      console.log(responseEmpresa.data.data); */
    } catch (error) {
      console.log(error);
    }
  };
  const handleIntervaloSeleccionado = (datos: any) => {
    const { fechaPresentacion, horaInicio, horaInicioBD, horaFin, horaFinBD } =
      datos;
    console.log(datos);
    setFechaPresentacion(fechaPresentacion);
    setHoraInicio(horaInicio);
    setHoraFin(horaFin);
    setHoraInicioBd(horaInicioBD);
    setHoraFinBd(horaFinBD);
  };
  const handleDiaSeleccionado = async (datos: any) => {
    let { fecha, horaInicio, horaFin, dia, activo } = datos;
    /*  let letFeSeleccionada = new Date(`${fecha} 00:00:00.0000000`); */
    setFechaSeleccionada(fecha);
    console.log("dis");

    console.log(datos);

    setFechaPresentacion("");
    setHoraInicio("");
    setHoraFin("");
    setHoraInicioBd("");
    setHoraFinBd("");
    if (activo == false) {
      setIntervalosDisponibles([]);
      console.log("supasdod");
    } else {
      let letHoraInicio = horaInicio;
      let dateHoraInicio = new Date(letHoraInicio);
      let horaInicioMinutos =
        dateHoraInicio.getHours() * 60 + dateHoraInicio.getMinutes();

      let letHoraFin = horaFin;
      let dateHoraFin = new Date(letHoraFin);
      let horaFinMinutos =
        dateHoraFin.getHours() * 60 + dateHoraFin.getMinutes();

      // Duración del servicio en minutos
      let servicioMinutos = duracionServicio;
      // Arreglo para guardar los intervalos válidos
      let intervalosDisponibles = [];
      // Iniciar desde horaInicioMinutos y avanzar de 15 en 15
      let tiempoEvaluado = horaInicioMinutos;
      while (tiempoEvaluado + servicioMinutos <= horaFinMinutos) {
        // Calcular la hora de inicio y fin del intervalo actual
        let inicio = tiempoEvaluado;
        let fin = tiempoEvaluado + servicioMinutos;

        // Convertir los minutos a formato de hora
        let horaInicioFormato = new Date(
          `${añoSeleccionado}-${mesSeleccionado}-${
            dia > 9 ? dia : "0" + dia
          } ${Math.floor(inicio / 60)}:${inicio % 60}:00.0000000`
        );

        let horaFinFormato = new Date(
          `${añoSeleccionado}-${mesSeleccionado}-${
            dia > 9 ? dia : "0" + dia
          } ${Math.floor(fin / 60)}:${fin % 60}:00.0000000`
        );

        // Agregar el intervalo al arreglo
        intervalosDisponibles.push({
          /*    fecha: `${currentYear}-${mesCorrecto}-${
          currentDayMonth > 9 ? currentDayMonth : "0" + currentDayMonth
        }`, */

          fechaPresentacion: format(horaInicioFormato, "dddd DD MMMM"),
          tiempoInicio: inicio,
          tiempoFin: fin,
          horaInicio: format(horaInicioFormato, "h:mm a", "es"),
          horaFin: format(horaFinFormato, "h:mm a", "es"),
          horaInicioBD: inicio,
          horaFinBD: fin,
          /*  horaInicioBD: `${Math.floor(inicio / 60)}:${inicio % 60}`,
          horaFinBD: `${Math.floor(fin / 60)}:${fin % 60}`, */
        });

        // Incrementar el tiempo evaluado en 15 minutos
        tiempoEvaluado += 15;
      }
      //filtrar si la fecha seleccionada es igual a la fecha actual
      if (fecha == fechaActual) {
        let fechaAct = new Date();
        let horaAct = fechaAct.getHours() * 60 + fechaAct.getMinutes();
        const intervalosFiltrados = intervalosDisponibles.filter(
          (intervalo) => intervalo.tiempoInicio > horaAct
        );
        intervalosDisponibles = intervalosFiltrados;
      }
      let idServi = idServicio;
      let reActuales = [];
      try {
        const reservasActuales = await niuxApi.get(
          `/Reserva/GetReservasByIdServicioAndFecha`,
          {
            params: {
              idServicio: idServi,
              fecha: fecha.toString(),
            },
          }
        );
        console.log("reservaciones actuales");
        let rePreFormateados = reservasActuales.data.data;
        let reActualesFormateados = rePreFormateados.map((reservacion: any) => {
          let horaInicioDate = new Date(reservacion.horaInicio);
          let horaInicioMinutos =
            horaInicioDate.getHours() * 60 + horaInicioDate.getMinutes();
          let horaFinDate = new Date(reservacion.horaFin);
          let horaFinMinutos =
            horaFinDate.getHours() * 60 + horaFinDate.getMinutes();
          return {
            ...reservacion,
            horaInicioMinutos: horaInicioMinutos,
            horaFinMinutos: horaFinMinutos,
          };
        });
        reActuales = reActualesFormateados;
        /*    console.log("reservacion formateados");
      console.log(reActuales); */
      } catch (error) {
        console.log(error);
      }
      if (reActuales.length > 0) {
        // Filtrar intervalos disponibles excluyendo los solapados
        intervalosDisponibles = intervalosDisponibles.filter((intervalo) => {
          return !reActuales.some((reservacion: any) => {
            const inicioDisponible = intervalo.tiempoInicio;
            const finDisponible = intervalo.tiempoFin;
            const inicioReservado = reservacion.horaInicioMinutos;
            const finReservado = reservacion.horaFinMinutos;

            // Verificar si hay solapamiento
            return !(
              finDisponible <= inicioReservado ||
              inicioDisponible >= finReservado
            );
          });
        });
      }

      console.log("Intervalos disponibles:");
      setIntervalosDisponibles(intervalosDisponibles);
      console.log(intervalosDisponibles);
    }
  };
  console.log(horarios);

  const cambioDeMes = (accion: any, mesProp: any, añoProp: any) => {
    if (contadorMes <= 5) {
      if (accion == "aumentar") {
        // Sumar un mes
        let fecha = new Date(`${añoProp}-${mesProp}-01 00:00:00.0000000`);
        let fechaAumentada = new Date(fecha.setMonth(fecha.getMonth() + 1));
        let mes = fechaAumentada.getMonth() + 1;
        let año = fechaAumentada.getFullYear();

        // Obtenemos el número de días en el mes elegido
        const daysInMonth = new Date(año, mes, 0).getDate();

        // Generamos un array con los días del mes (del 1 al último día)
        let arrayMeses = Array.from(
          { length: daysInMonth },
          (_, index) => index + 1
        );
        const arrayFinal = arrayMeses.map((dia: any) => {
          let diaDeLaSemana = new Date(
            `${año}-${mes}-${dia} 00:00:00.0000000`
          ).getDay();

          let diaDeLaSemanaNombre = diasSemanaParaDate[diaDeLaSemana]; //viernes
          let objeHorario = horarios.find(
            (horario: any) => horario.dia === diaDeLaSemanaNombre
            //{horaInicio,HoraFin}
          );
          return {
            fecha: `${año}-${mes}-${dia > 9 ? dia : "0" + dia}`,
            diaSemana: diaDeLaSemanaNombre,
            dia: dia > 9 ? dia : parseInt("0" + dia),
            horaInicio: objeHorario?.horaInicio,
            horaFin: objeHorario?.horaFin,
          };
        });
        console.log("meses");
        console.log(arrayFinal);
        setDiasDelMesSeleccionado(arrayFinal);
        setMesSeleccionado(mes);
        setAñoSeleccionado(año);
        setFechaSeleccionada("");
        setFechaPresentacion("");
        setHoraInicio("");
        setHoraFin("");
        setHoraInicioBd("");
        setHoraFinBd("");
        setIntervalosDisponibles([]);
        setContadorMes((prev: any) => prev + 1);
        /*  console.log(fechaAumentada);
        console.log(mes);
        console.log(año); */
      }
    }
    if (accion == "disminuir") {
      // Sumar un mes
      let fecha = new Date(`${añoProp}-${mesProp}-01 00:00:00.0000000`);
      let fechaAumentada = new Date(fecha.setMonth(fecha.getMonth() - 1));
      let mes = fechaAumentada.getMonth() + 1;
      let año = fechaAumentada.getFullYear();

      // Obtenemos el número de días en el mes elegido
      const daysInMonth = new Date(año, mes, 0).getDate();

      // Generamos un array con los días del mes (del 1 al último día)
      let arrayMeses = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
      );
      const arrayFinal = arrayMeses.map((dia: any) => {
        let diaDeLaSemana = new Date(
          `${año}-${mes}-${dia} 00:00:00.0000000`
        ).getDay();

        let diaDeLaSemanaNombre = diasSemanaParaDate[diaDeLaSemana]; //viernes
        let objeHorario = horarios.find(
          (horario: any) => horario.dia === diaDeLaSemanaNombre
          //{horaInicio,HoraFin}
        );
        return {
          fecha: `${año}-${mes}-${dia > 9 ? dia : "0" + dia}`,
          diaSemana: diaDeLaSemanaNombre,
          dia: dia > 9 ? dia : parseInt("0" + dia),
          horaInicio: objeHorario?.horaInicio,
          horaFin: objeHorario?.horaFin,
        };
      });
      console.log("meses");
      console.log(arrayFinal);
      setDiasDelMesSeleccionado(arrayFinal);
      setMesSeleccionado(mes);
      setAñoSeleccionado(año);
      setFechaSeleccionada("");
      setFechaPresentacion("");
      setHoraInicio("");
      setHoraFin("");
      setHoraInicioBd("");
      setHoraFinBd("");
      setIntervalosDisponibles([]);
      setContadorMes((prev: any) => prev - 1);
      /*  console.log(fechaAumentada);
        console.log(mes);
        console.log(año); */
    }
  };
  console.log(contadorMes);
  const SubmitReserva = () => {
    // Crear un objeto con los valores
    const datosReserva = {
      fechaSeleccionada,
      horaInicioBd,
      horaFinBd,
      horaInicio,
      horaFin,
      fechaPresentacion,
      añoSeleccionado,
      fotoEmpresa,
      nombreEmpresa,
      nombreServicio,
      duracionServicio,
      idServicio,
      total,
    };
    localStorage.setItem("datosReserva", JSON.stringify(datosReserva));
    navegacion(
      `/detalle-reserva?fecha=${fechaSeleccionada}&horaInicio=${horaInicioBd}&horaFin=${horaFinBd}&s=${idServicio}`
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let user: any;
    const authData = localStorage.getItem("auth-storage"); // O sessionStorage.getItem()
    if (authData) {
      const parsedData = JSON.parse(authData); // Convierte el string en un objeto
      const status = parsedData?.state?.status; // Accede a "status"
      setAutorizacion(status);
      user = parsedData?.state?.user; // Accede al objeto "user"
      setUsuario(user);
      console.log(status); // Esto debería mostrar "unauthorized"
      console.log(user); // Esto debería mostrar "unauthorized"
    } else {
      setAutorizacion("unauthorized");
      setUsuario(null);
    }
    fetchData();
  }, []);
  return (
    <>
      <Header />

      <section className=" roboto-regular lg:ml-10 ml-5 mb-5 min-h-screen">
        <div className=" mt-5">
          <h2 className=" font-semibold text-4xl">Seleccionar Hora</h2>
        </div>
        <div className=" grid lg:grid-cols-5 gap-5 grid-cols-1">
          <div className=" col-span-3 mt-4">
            <div className="  flex items-center justify-between">
              <h4 className=" font-medium text-md capitalize">
                {mesSeleccionado && añoSeleccionado
                  ? meses[mesSeleccionado] + " " + añoSeleccionado
                  : ""}
              </h4>
              <div className=" flex items-center gap-2">
                {contadorMes && contadorMes > 0 ? (
                  <span
                    onClick={() =>
                      cambioDeMes("disminuir", mesSeleccionado, añoSeleccionado)
                    }
                    className=" cursor-pointer  hover:bg-neutral-200 p-1 rounded-lg"
                  >
                    <PreviousMonth />
                  </span>
                ) : null}

                <span
                  onClick={() =>
                    cambioDeMes("aumentar", mesSeleccionado, añoSeleccionado)
                  }
                  className=" cursor-pointer hover:bg-neutral-200 p-1 rounded-lg"
                >
                  <NextMonth />
                </span>
              </div>
            </div>

            <div className=" flex gap-4 overflow-x-scroll flex-shrink-0 mt-4 services-scroll">
              {diasDelMesSeleccionado &&
                diasDelMesSeleccionado.map((dia: any, index: any) => {
                  if (dia.fecha >= fechaActual) {
                    return (
                      <span
                        key={dia.fecha}
                        onClick={() => handleDiaSeleccionado({ ...dia })}
                        className={`hover:cursor-pointer font-medium text-xl flex-shrink-0 h-16 w-16 rounded-full flex justify-center items-center p-4  ${
                          dia.fecha === fechaSeleccionada
                            ? "bg-[#7B6FCC] text-white hover:bg-[#5448A1]"
                            : "border hover:bg-[#F5F5F6]"
                        }`}
                      >
                        {dia.dia}
                      </span>
                    );
                  }
                  return null;
                })}
            </div>
            <div className=" flex flex-col gap-4 mt-8 lg:mr-10 mr-5">
              {intervalosDisponibles && intervalosDisponibles.length > 0 ? (
                intervalosDisponibles.map((intervalo: any, index: any) => (
                  <span
                    onClick={() =>
                      handleIntervaloSeleccionado({ ...intervalo })
                    }
                    key={index}
                    className={` text-start  cursor-pointer focus:ring-2 focus:ring-[#7B6FCC] rounded-md border p-4  hover:bg-[#F5F5F6]   text-lg mb-2 ${
                      horaInicio == intervalo.horaInicio
                        ? "border-[#7B6FCC] border-2 "
                        : ""
                    }`}
                  >
                    {intervalo.horaInicio}
                  </span>
                ))
              ) : (
                <div className=" min-h-[400px] border rounded-lg flex flex-col gap-3 justify-center items-center">
                  <div className=" h-12 w-12 mb-1">
                    <img
                      src={
                        empresa && empresa.foto ? empresa.foto : GeneralBusiness
                      }
                      alt=""
                      className=" rounded-full object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <span className=" font-medium text-xl">
                      Sin citas disponibles para esta fecha
                    </span>
                  </div>
                  <div>
                    <span className=" text-neutral-500 font-medium ">
                      {fechaSeleccionada && fechaSeleccionada}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" col-span-2 border lg:mr-10 max-h-[500px]   mr-5 rounded-md p-7">
            <div className=" flex items-center gap-4">
              <div className=" h-16 w-16">
                <img
                  src={empresa && empresa.foto ? empresa.foto : GeneralBusiness}
                  className=" rounded-md object-cover h-full w-full"
                  alt=""
                />
              </div>
              <div>
                <span className=" font-medium">{empresa?.nombreEmpresa}</span>
                <div className=" flex gap-1 items-center">
                  <span className=" font-medium">
                    {empresa?.promedioCalificacion !== undefined
                      ? Number.isInteger(empresa.promedioCalificacion)
                        ? `${empresa.promedioCalificacion}.0`
                        : empresa.promedioCalificacion
                      : 0.0}
                  </span>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <span>
                    ({empresa?.totalResenas ? empresa?.totalResenas : 0})
                  </span>
                </div>
                <span className=" text-sm text-neutral-500">
                  {" "}
                  {empresa &&
                  empresa.paisEmpresa &&
                  empresa.ciudadEmpresa &&
                  empresa.estadoEmpresa
                    ? empresa?.paisEmpresa +
                      ", " +
                      empresa?.ciudadEmpresa +
                      ", " +
                      empresa?.estadoEmpresa
                    : "Sin Dirección de Empresa"}
                </span>
              </div>
            </div>
            {fechaPresentacion && (
              <div className=" flex flex-col mt-3 gap-2">
                <div className=" flex items-center gap-1 text-neutral-500 text-sm ">
                  <Calendar />
                  <span className="  ">{fechaPresentacion}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-500 text-sm ">
                  <Watch />
                  {horaInicio && horaFin ? (
                    <span>{`${horaInicio} - ${horaFin} (${formatDuration(
                      servicio?.duracion
                    )} de duración)`}</span>
                  ) : null}
                </div>
              </div>
            )}

            <div className=" flex justify-between mt-3 items-center">
              <div className=" flex flex-col ">
                <span className=" capitalize ">{servicio?.titulo}</span>
                <span className=" text-neutral-500 text-sm">
                  {formatDuration(servicio?.duracion)}
                </span>
              </div>
              <div>
                <span>${servicio?.precio} MXN</span>
              </div>
            </div>
            <div className=" flex justify-between border-t mt-5 pt-4">
              <span className=" font-semibold">Total</span>
              <span className=" font-semibold">${servicio?.precio} MXN</span>
            </div>
            {horaInicioBd && horaFinBd && fechaSeleccionada && idServicio ? (
              autorizacion == "unauthorized" ? (
                <div className=" rounded-md mt-6 hover:bg-black/80   bg-black text-white flex justify-center items-center ">
                  <Link
                    className=" font-medium w-full h-full text-center py-2"
                    to={"/login"}
                  >
                    Continuar
                  </Link>
                </div>
              ) : (
                <div className=" rounded-md mt-6 hover:bg-black/80   bg-black text-white flex justify-center items-center ">
                  <button
                    className=" font-medium w-full h-full text-center py-2"
                    onClick={SubmitReserva}
                  >
                    Continuar
                  </button>
                </div>
              )
            ) : (
              <div className="rounded-md mt-6  cursor-not-allowed   bg-black/60 text-white flex justify-center items-center">
                {" "}
                <span className=" font-medium w-full h-full text-center py-2">
                  Continuar
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
