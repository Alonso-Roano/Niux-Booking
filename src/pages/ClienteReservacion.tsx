import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { niuxApi } from "../api/niuxApi";
import { useAuthStore } from "../stores/auth/authStore";
import Utils from "../functions/Utils";
import Footer from "../components/Footer";

interface Reserva {
  idReserva: number;
  nombreEmpresa: string;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  tituloServicio: string;
  precioServicio: number;
  duracionServicio: number;
  idServicio: number;
  imagenServicio: string; // Nueva propiedad para almacenar la URL de la imagen del servicio
}

const ClienteReservacion: React.FC = () => {
  const { user } = useAuthStore((state) => state);
  const [idCliente, setIdCliente] = useState<number | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);

  // Función para convertir minutos en una cadena legible
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h` : ""} ${remainingMinutes > 0 ? `${remainingMinutes}min` : ""}`.trim();
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Función para formatear la hora
  const formatTime = (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };

  // Obtener idCliente
  useEffect(() => {
    const fetchIdCliente = async () => {
      try {
        const response = await niuxApi.get(`/Cliente/GetClienteByIdAppUser/${user?.id}`);
        if (response.data.success) {
          setIdCliente(response.data.data.id);
        } else {
          Utils.showToast({
            icon: "error",
            title: "Error al obtener el ID del cliente.",
          });
        }
      } catch (error) {
        Utils.showToast({
          icon: "error",
          title: "Error al obtener el ID del cliente.",
        });
      }
    };

    if (user?.id) {
      fetchIdCliente();
    }
  }, [user]);

  // Obtener reservaciones y sus imágenes
  useEffect(() => {
    const fetchReservas = async () => {
      if (!idCliente) return;

      try {
        const response = await niuxApi.get(`/Reserva/GetReservasByIdCliente/${idCliente}`);
        if (response.data.success) {
          const formattedReservas = await Promise.all(
            response.data.data.map(async (reserva: any) => {
              const imagenResponse = await niuxApi.get(`/ImagenServicio/ObtenerImagenes/${reserva.idServicio}`);
              const imagenData = imagenResponse.data.data;
              const imagenUrl =
                imagenData && imagenData.length > 0
                  ? `${import.meta.env.VITE_BACKEND_API}${imagenData[0].url}`
                  : "/images/default-serviceLg.jpg";

              return {
                idReserva: reserva.idReserva,
                nombreEmpresa: reserva.nombreEmpresa,
                fechaReserva: formatDate(reserva.fechaReserva),
                horaInicio: formatTime(reserva.horaInicio),
                horaFin: formatTime(reserva.horaFin),
                tituloServicio: reserva.tituloServicio,
                precioServicio: reserva.precioServicio,
                duracionServicio: formatDuration(reserva.duracionServicio),
                idServicio: reserva.idServicio,
                imagenServicio: imagenUrl,
              };
            })
          );
          setReservas(formattedReservas);
        } else {
          Utils.showToast({
            icon: "info",
            title: "No se encontraron reservaciones.",
          });
        }
      } catch (error) {
        Utils.showToast({
          icon: "error",
          title: "Error al obtener las reservaciones.",
        });
      }
    };

    fetchReservas();
  }, [idCliente]);

  return (
    <>
      <Header />
      <div className="flex justify-center  bg-gray-100 py-8 min-h-screen">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card Historial */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Historial de Reservaciones</h2>
            {reservas.length > 0 ? (
              reservas.map((reserva) => (
                <div
                  key={reserva.idReserva}
                  className={`flex gap-4 items-center border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer mb-3 ${
                    selectedReserva?.idReserva === reserva.idReserva ? "border-[#7B6FCC] border-2" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedReserva(reserva)}
                >
                  <img
                    src={reserva.imagenServicio}
                    alt="Imagen Servicio"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{reserva.tituloServicio}</h3>
                    <p className="text-sm text-gray-600">
                      {reserva.nombreEmpresa}, {reserva.fechaReserva}
                    </p>
                    <p className="text-sm text-gray-600">
                      {reserva.horaInicio} - {reserva.horaFin}
                    </p>
                    <p className="text-sm text-gray-600">${reserva.precioServicio}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Aún no hay reservaciones.</p>
            )}
          </div>

          {/* Detalle del Historial */}
          <div className="bg-white shadow-md rounded-lg p-4">
            {selectedReserva ? (
              <>
                <h2 className="text-lg font-semibold mb-4">Detalles de Reservacion</h2>
                <img
                  src={selectedReserva.imagenServicio}
                  alt="Imagen Servicio"
                  className="w-full h-48 rounded-lg object-cover mb-4"
                />
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{selectedReserva.tituloServicio}</h2>
                  <span className="px-4 py-1 text-sm font-semibold text-white bg-[#7B6FCC] rounded-full">
                    Reservación
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{selectedReserva.nombreEmpresa}</p>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Resumen</h3>
                  <div className="flex items-center mb-2">
                    <span className="w-24 font-medium text-gray-700">Servicio:</span>
                    <span className="text-gray-600">
                      {selectedReserva.tituloServicio} | {selectedReserva.duracionServicio}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-24 font-medium text-gray-700">Fecha:</span>
                    <span className="text-gray-600">{selectedReserva.fechaReserva}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="w-24 font-medium text-gray-700">Horario:</span>
                    <span className="text-gray-600">
                      {selectedReserva.horaInicio} - {selectedReserva.horaFin}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-700">Precio:</span>
                    <span className="text-gray-600">${selectedReserva.precioServicio}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center">
                <p className="text-gray-600 text-center text-xl justify-center">
                  Selecciona una reservación para ver el detalle.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClienteReservacion;
