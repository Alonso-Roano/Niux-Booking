import { useEffect } from "react";
import utils from "../functions/Utils";
import "../styles/constructors/Inputs.css";

interface DataProps {
    data: Array<{ [key: string]: any }>;
    setBody: any;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
    editDatos?: { [key: string]: any };
}

import { TextField, FormControl } from '@mui/material';

function Inputs({ data, setBody, body, errors, editDatos }: DataProps) {
    if (!data) return null;

    useEffect(() => {
        if (editDatos) {
            const updates: { [key: string]: any } = {};
    
            data.forEach((prop) => {
                const inputProp = utils.formatProps("input", prop.props);
                const name = inputProp.name;
    
                if (name && editDatos[name] !== undefined) {
                    let value = editDatos[name];
    
                    if (inputProp.type === "date" && typeof value === "string" && value.includes("/")) {
                        const [day, month, year] = value.split("/");
                        value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
                    }
    
                    updates[name] = value;
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
                    cantWrite,
                    className = "css",
                    errorContent = "Este campo es necesario",
                    props,
                } = prop;
                const inputProp = utils.formatProps("input", props);

                if (inputProp.type === "date") {
                    const today = new Date().toISOString().split("T")[0];
                    inputProp.inputProps = {
                        ...inputProp.inputProps,
                        min: today,
                    };
                }

                return (
                    <FormControl key={index} className={className} fullWidth>
                        <TextField
                            {...inputProp}
                            variant="standard"
                            label={prop.labelContent}
                            error={Boolean(errors[inputProp.name])}
                            helperText={errors[inputProp.name] ? errorContent : ''}
                            onChange={(e) =>
                                utils.inputBody({ e, body, setBody, cantWrite })
                            }
                            value={body[inputProp.name] || ''}
                            className={"SiJaja " + inputProp.className}
                            InputLabelProps={{
                                shrink: body[inputProp.name] || inputProp.type === "date" ? true : false,
                            }}
                        />
                    </FormControl>
                );
            })}
        </div>
    );
}

export default Inputs;
