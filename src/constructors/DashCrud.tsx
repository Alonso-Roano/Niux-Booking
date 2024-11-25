import Add from "./Add";
import Tables from "./Tables";
import { useEffect, useState } from "react";
import OffCanvas from "./OffCanvas";
import Requests from "../functions/Requests";
import View from "./View";
import Edit from "./Edit";
import RegistroDash from "../components/RegistroDash";

function DashCrud({ data }: any) {
    const [addOpen, setAddOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [paramsView, setParamsView] = useState({});
    const [tipo, setTipo] = useState({});
    const [body, setBody] = useState({});
    const [render, setRender] = useState(false)

    useEffect(() => { if (!addOpen || !editOpen || !registerOpen) setRender(!render) }, [addOpen, editOpen, registerOpen])

    const helper = (type: string, params?: any) => {
        switch (type) {
            case "Add":
                showAdd();
                break;
            case "RegistrarSocio":
                setTipo("socio")
                showRegister();
                break;
            case "RegistrarCliente":
                setTipo("cliente")
                showRegister();
                break;
            case "Delete":
                new Requests.Delete(`${data.delete.deleteURL + params.id}`)
                    .setMensaje(data.delete.mensaje)
                    .SetReder(setRender)
                    .setMensajeConfirm(data.delete.mensajeConfirm)
                    .send();
                setRender(true)
                break;
            case "View":
                setParamsView(params)
                setViewOpen(true)
                break;
            case "Update":
                setBody(params)
                setEditOpen(true)
                break;
            default:
                break;
        }
    };

    const showAdd = () => {
        setAddOpen(true);
    };

    const showRegister = () => {
        setRegisterOpen(true);
    };

    const actions = {
        pagar: data.puede.pay,
        actualizar: data.puede.update,
        leer: data.puede.leer,
        borrar: data.puede.delete
    }

    return (
        <>
            <div className="dashTableContainer">
                <Tables url={data.getURL} name={data.name} can={actions} helper={helper} cantidad={{ de: data.cantidad.desde, hasta: data.cantidad.hasta }} render={render} />
            </div>

            <OffCanvas toggleDrawer={setRegisterOpen} drawerOpen={registerOpen}>
                {registerOpen && <RegistroDash tipoUsuario={tipo} setClose={setRegisterOpen}/>}
            </OffCanvas>
            <OffCanvas toggleDrawer={setAddOpen} drawerOpen={addOpen}>
                <Add data={data.add} setClose={setAddOpen}></Add>
            </OffCanvas>
            <OffCanvas toggleDrawer={setViewOpen} drawerOpen={viewOpen} size={450}>
                <View data={paramsView} title={data.viewTitle} setClose={setEditOpen}></View>
            </OffCanvas>
            <OffCanvas toggleDrawer={setEditOpen} drawerOpen={editOpen}>
                <Edit data={data.edit} bodyDatos={body} setClose={setEditOpen}></Edit>
            </OffCanvas>
        </>

    );
}

export default DashCrud;