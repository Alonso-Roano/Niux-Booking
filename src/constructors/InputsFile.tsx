import { useState } from "react";
import utils from "../functions/Utils";
import "../styles/constructors/Inputs.css";

import { Button, FormControl, Typography } from "@mui/material";

interface DataProps {
    data: Array<{ [key: string]: any }>;
    setBody: any;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
}

function InputsFile({ data, setBody, body, errors }: DataProps) {

    if (!data) return null;

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
                            className={`SiJaja ${inputProp.className} ${body[inputProp.name] ? 'file-selected' : ''}`}
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
