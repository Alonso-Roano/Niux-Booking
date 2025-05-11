export const PublicRoutes = {
    HOME: "/",
    BUSINESS: "/negocio/:slugEmpresa",
    SCHEDULE: "/horario/:slugEmpresa/:slugServicio",
    DETAIL_RESERVA: "/detalle-reserva",
    BUSCADOR: "/buscador",
    NOT_FOUND: "*",
};

export const RestrictedRoutes = {
    LOGIN: "/login",
    REGISTRO_TYPE: "/registro-type",
    REGISTRO: "/registro/:tipoUsuario",
};

export const ProtectedRoutes = {
    DASHBOARD_ADMIN: "/dashboard",
    DASHBOARD_EMPRESA: "/dashboard/empresa",
    RESUMEN_RESERVA: "/reserva/resumen",
    EDIT_EMPRESA: "/editar/empresa",
    CLIENTE_RESERVACIONES: "/reservaciones",
};
