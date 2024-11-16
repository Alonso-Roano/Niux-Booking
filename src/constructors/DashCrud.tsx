import Add from "./Add";
import Tables from "./Tables";
import { useState } from "react";
import OffCanvas from "./OffCanvas";
import Requests from "../functions/Requests";
import View from "./View";
import Edit from "./Edit";

function DashCrud({ data }: any) {
    const [addOpen, setAddOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [paramsView, setParamsView] = useState({});
    const [body, setBody] = useState({});

    const helper = (type: string, params?: any) => {
        switch (type) {
            case "Add":
                showAdd();
                break;
            case "Delete":
                new Requests.Delete(`${data.delete.deleteURL + params.id}`)
                    .setMensaje(data.delete.mensaje)
                    .setMensajeConfirm(data.delete.mensajeConfirm)
                    .send();
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

    const actions = {
        pagar: data.puede.pay,
        actualizar: data.puede.update,
        leer: data.puede.leer,
        borrar: data.puede.delete
    }

    return (
        <>
            <div className="dashTableContainer">
                <Tables url={data.getURL} name={data.name} can={actions} helper={helper} cantidad={{ de: data.cantidad.desde, hasta: data.cantidad.hasta }} />
            </div>

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