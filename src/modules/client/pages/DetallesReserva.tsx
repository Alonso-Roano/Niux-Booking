import iconLocation from "@/assets/icons/icon-location.svg";
import iconService from "@/assets/icons/icon-service.svg";
import iconTime from "@/assets/icons/icon-time.svg";
import iconCalendar from "@/assets/icons/icon-calendar.svg";
import Header from "@shared/components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GeneralBusiness from "@shared/images/services/general-business.jpg";
import Swal from "sweetalert2";

import { niuxApi } from "@core/api/niuxApi";

const DetallesReserva = () => {
  const [usuario, setUsuario] = useState<any>();
  const [idCliente, setIdCliente] = useState<any>();
  const [token, setToken] = useState<any>();
  const [autorizacion, setAutorizacion] = useState<any>();
  const [fecha, setFecha] = useState<any>();
  const [horaInicio, setHoraInicio] = useState<any>();
  const [horaFin, setHoraFin] = useState<any>();
  const [servicio, setServicio] = useState<any>();
  const [datosReserva, setDatosReserva] = useState<any>();

  const navegacion = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Accede a los parámetros de consulta
  const fetchData = async () => {
    let user: any;
    const authData = localStorage.getItem("auth-storage"); // O sessionStorage.getItem()
    if (authData) {
      const parsedData = JSON.parse(authData); // Convierte el string en un objeto
     
      const status = parsedData?.state?.status; // Accede a "status"
      if (status !== "unauthorized") {
        setAutorizacion(status);
        const token = parsedData?.state?.token; // Accede a "status"
        setToken(token);

        user = parsedData?.state?.user; // Accede al objeto "user"
        setUsuario(user);
     
        const storageReserva = localStorage.getItem("datosReserva");
        const datosReserva = storageReserva ? JSON.parse(storageReserva) : {};
        setDatosReserva(datosReserva);
        const datosCliente = await niuxApi.get(
          `/Cliente/GetClienteByIdAppUser/${user.id}`
        );
        setIdCliente(datosCliente.data.data.id);
      } else {
        user = null;
        setUsuario(null);
      }
    } else {
      setAutorizacion("unauthorized");
      user = null;
      setUsuario(null);
    }
    if (!user) {
      navegacion("/login");
    }
  };

  const enviarReserva = async () => {
    if (!idCliente || !datosReserva) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Faltan datos para completar la reserva.",
      });
      return;
    }

    const payload = {
      isDeleted: false,
      nombre: `Reserva de ${usuario.nombre} para el ${datosReserva.fechaSeleccionada}`,
      descripcion: `Reserva del servicio ${datosReserva.nombreServicio}`,
      cantidadPersonas: 1,
      fechaReserva: `${datosReserva.fechaSeleccionada}T00:00:00`,
      horaInicio: `${datosReserva.fechaSeleccionada}T${String(
        Math.floor(datosReserva.horaInicioBd / 60)
      ).padStart(2, "0")}:${String(datosReserva.horaInicioBd % 60).padStart(
        2,
        "0"
      )}:00`,
      horaFin: `${datosReserva.fechaSeleccionada}T${String(
        Math.floor(datosReserva.horaFinBd / 60)
      ).padStart(2, "0")}:${String(datosReserva.horaFinBd % 60).padStart(
        2,
        "0"
      )}:00`,
      idCliente: idCliente,
      idServicio: parseInt(datosReserva.idServicio, 10),
    };

    // Mostrar confirmación antes de reservar
    Swal.fire({
      title: "¿Confirmar reserva?",
      text: `Vas a reservar el servicio "${datosReserva.nombreServicio}" para ${datosReserva.fechaSeleccionada}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, reservar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await niuxApi.post("/Reserva", payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Mostrar mensaje de éxito y redirigir
          Swal.fire({
            icon: "success",
            title: "Reserva creada",
            text: "La reserva fue creada con éxito.",
          }).then(() => {
            navegacion("/"); // Redirige a la página de inicio
          });
        } catch (error) {
          console.error("Error al crear la reserva:", error);

          // Mostrar mensaje de error
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al procesar la reserva.",
          });
        }
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

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
  return (
    <>
      <Header />
      <div className=" bg-neutral-200 roboto-general min-h-screen  flex">
        {/* Resumen */}
        <div className=" w-[500px] h-fit border mx-auto mt-5 border-gray-300 bg-white rounded-lg p-8  shadow-xs">
          <h2 className="text-4xl font-bold ">Detalles de la reserva</h2>
          <div className="flex  mt-6 gap-4 mb-2">
            <div className=" h-20 w-20 rounded-full">
              <img
                src={
                  datosReserva && datosReserva.fotoEmpresa
                    ? datosReserva.fotoEmpresa
                    : GeneralBusiness
                }
                alt="Barbería"
                className=" object-cover h-full w-full rounded-full "
              />
            </div>
            <div className=" flex flex-col gap-2">
              <h3 className="text-2xl  font-medium">
                {datosReserva && datosReserva?.nombreEmpresa}
              </h3>
              <span className=" font-medium text-neutral-600 ">
                {" "}
                {datosReserva && datosReserva?.nombreServicio}{" "}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Resumen</h2>
          <div className="mt-6 space-y-4">
            <div className=" flex  gap-2 text-base">
              <img className="W-15 h-15" src={iconService} alt="" />
              <p className="font-semibold">Servicio:</p>{" "}
              <p className="text-[#707070] font-semi ">
                {datosReserva && datosReserva?.nombreServicio} |{" "}
                {datosReserva && datosReserva.duracionServicio
                  ? formatDuration(datosReserva.duracionServicio)
                  : "00:00"}
              </p>
            </div>
            <div className="flex gap-2 text-base">
              <img className="W-15 h-15" src={iconCalendar} alt="" />
              <p className="font-semibold">Fecha:</p>{" "}
              <p className="text-[#707070] font-semi">
                {datosReserva && datosReserva?.fechaPresentacion}{" "}
                {datosReserva && datosReserva?.añoSeleccionado}
              </p>
            </div>
            <div className="flex  gap-2 text-base">
              <img className="W-15 h-15" src={iconTime} alt="" />
              <p className="font-semibold">Horario:</p>{" "}
              <p className="text-[#707070] font-semi">
                {datosReserva && datosReserva?.horaInicio} -{" "}
                {datosReserva && datosReserva?.horaFin}
              </p>
            </div>
            <p className="text-lg font-bold">
              TOTAL: ${datosReserva && datosReserva?.total} MX
            </p>
          </div>
          <button
            onClick={enviarReserva}
            className="mt-6 w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-center text-lg font-medium hover:bg-purple-700 transition duration-200"
          >
            Reservar
          </button>
        </div>
      </div>
    </>
  );
};

export default DetallesReserva;
