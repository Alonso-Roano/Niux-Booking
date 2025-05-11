import { useEffect, useState } from "react";
import utils from "@admin/functions/Utils";
import "@shared/styles/constructors/Inputs.css";

import { Button, FormControl, Typography } from "@mui/material";
import Update from "@shared/svgs/Update";
import OffCanvas from "./OffCanvas";
import Requests from "@admin/functions/Requests";

interface DataProps {
    data: Array<{ [key: string]: any }>;
    setBody: any;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
    bodyDatos?: { [key: string]: any };
}

function InputsFile({ data, setBody, body, errors, bodyDatos }: DataProps) {
    if (!data) return null;

    const [editImg, setEditImg] = useState<any>(false);
    const [img, setImg] = useState<any>(false);

    useEffect(() => {
        if (bodyDatos?.imagenes?.length) {
            const imagenes = bodyDatos.imagenes.map((imagen: any) => ({
                url: imagen.url,
                idServicio: imagen.idServicio,
                servicio: imagen.servicio,
                id: imagen.id,
                isDeleted: imagen.isDeleted,
                createdAt: imagen.createdAt,
            }));

            if (!body.imagenes || body.imagenes.length === 0) {
                setBody((prevBody: any) => ({ ...prevBody, imagenes }));
            }
        }
    }, [bodyDatos, setBody]);

    const numImagenes = bodyDatos?.imagenes?.length || 0;
    const inputsFaltantes = bodyDatos?.foto ? 0: Math.max(data.length - numImagenes, 0);

    const enviar = () =>{
        if(img.Archivo){
            // Crear el FormData y agregar los campos necesarios
        const formData = new FormData();
        formData.append("Archivo", img.Archivo);

        // Agregar otros campos si es necesario
        Object.keys(img).forEach((key) => {
            if (key !== "Archivo" && key !== "url") {
                formData.append(key, img[key]);
            }
        });

        console.log(data)
        // Enviar la solicitud utilizando el FormData
        new Requests.Put(data[0].url, formData)
            .SetClose(setEditImg)
            .Mensaje("Se ha editado la imagen")
            .SetBody(setImg)
            .send();
        }
        setEditImg(!editImg)
    }

    return (
        <div className="inputsContainer inputFile">
            {/* Renderizar imágenes si existen en bodyDatos */}
            {bodyDatos?.imagenes?.length > 0 && (
                <div className="imagenesContainer">
                    <Typography variant="h6">Imágenes cargadas:</Typography>
                    <div className="imagenesGrid">
                        {bodyDatos?.imagenes.map((imagen: any) => (
                            <div key={imagen.id} className="imagenCard">
                                <img
                                    src={import.meta.env.VITE_BACKEND_API+imagen.url}
                                    alt={`Imagen ${imagen.id}`}
                                />
                                <span className="icon" tabIndex={1} onClick={()=>{setEditImg(!editImg); setImg({url:import.meta.env.VITE_BACKEND_API+imagen.url, IdImagenServicio:imagen.id})}}>
                                    <Update/>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {bodyDatos?.foto && (
                <div className="imagenesContainer">
                    <Typography variant="h6">Imágenes cargadas:</Typography>
                    <div className="imagenesGrid">
                            <div className="imagenCard">
                                <img
                                    src={import.meta.env.VITE_BACKEND_API+bodyDatos.foto}
                                    alt={`Imagen`}
                                />
                                <span className="icon" tabIndex={1} onClick={()=>{setEditImg(!editImg); setImg({url:import.meta.env.VITE_BACKEND_API+bodyDatos.foto, IdEmpresa:bodyDatos.id})}}>
                                    <Update/>
                                </span>
                            </div>
                    </div>
                </div>
            )}
            <OffCanvas drawerOpen={editImg} toggleDrawer={setEditImg}>
                <div>
                    <h5 className="titleDrawer">Editar Imagen</h5>
                    <span className="editImagen"><img src={img.url} alt="" /></span>
                    <FormControl fullWidth>
                        <label
                            className={`SiJaja ${img["Archivo"] ? 'file-selected' : 'file'}`}
                        >
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.gif"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setImg({ ...img, ["Archivo"]: file });
                                }}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                color="primary"
                            >
                                {!img["Archivo"] ? "Agregar imagen" :"Imagen agregada"}
                            </Button>
                        </label>
                    </FormControl>
                    <div className="buttonContainer">
                    <Button
                            onClick={() => {
                                enviar();
                            }}
                            variant="contained"
                            className={"ButtonClass button-guardar"}
                            sx={{ textTransform: 'none' }} 
                        >
                            Guardar
                    </Button>
                    </div>
                    
                </div>
            </OffCanvas>

            {Array.from({ length: inputsFaltantes }).map((_, index) => {
                const prop = data[index] || {};
                const {
                    className = "css",
                    errorContent = "Este campo es necesario",
                    props,
                } = prop;
                const inputProp = utils.formatProps("input", props || {});

                return (
                    <FormControl key={`input-${index}`} className={className} fullWidth>
                        <label
                            className={`SiJaja ${inputProp.className} ${body[inputProp.name] ? 'file-selected' : 'file'}`}
                        >
                            <input
                                {...inputProp}
                                type="file"                                
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setBody({ ...body, [inputProp.name]: file });
                                }}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                color={errors[inputProp.name] ? "error" : "primary"}
                            >
                                {!body[inputProp.name] ? prop.labelContent : prop.otherLabelContent}
                            </Button>
                        </label>
                        {errors[inputProp.name] && (
                            <Typography color="error" variant="caption">
                                {errorContent}
                            </Typography>
                        )}
                    </FormControl>
                );
            })}
        </div>
    );
}

export default InputsFile;
