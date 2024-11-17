import { useEffect, useState } from "react";
import utils from "../functions/Utils";
import "../styles/constructors/Inputs.css";

import { Button, FormControl, Typography } from "@mui/material";

interface DataProps {
    data: Array<{ [key: string]: any }>;
    setBody: any;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
    editDatos?: { [key: string]: any };
}

function InputsFile({ data, setBody, body, errors, editDatos }: DataProps) {
    const [fileSelected, setFileSelected] = useState<{ [key: string]: boolean }>({});

    if (!data) return null;

    useEffect(() => {
        if (editDatos) {
            const updates: { [key: string]: any } = {};

            data.forEach((prop) => {
                const inputProp = utils.formatProps("input", prop.props);
                const name = inputProp.name;

                if (name && editDatos[name] !== undefined) {
                    updates[name] = editDatos[name];
                }
            });

            setBody((prevBody: any) => ({
                ...prevBody,
                ...updates,
            }));
        }
    }, [editDatos, data, setBody]);

    return (
        <div className="inputsContainer">
            {data.map((prop, index) => {
                const {
                    className = "css",
                    errorContent = "Este campo es necesario",
                    props,
                } = prop;
                const inputProp = utils.formatProps("input", props);

                return (
                    <FormControl key={index} className={className} fullWidth>
                        <label
                            className={`SiJaja ${inputProp.className} ${fileSelected[inputProp.name] ? 'file-selected' : ''}`}
                        >
                            <input
                                {...inputProp}
                                type="file"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    setBody({ ...body, [inputProp.name]: file });
                                    setFileSelected({ ...fileSelected, [inputProp.name]: !!file });
                                }}
                            />
                            <Button
                                variant="outlined"
                                component="span"
                                color={errors[inputProp.name] ? "error" : "primary"}
                            >
                                {prop.labelContent || "Subir archivo"}
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
