import { useEffect } from "react";
import utils from "../functions/Utils";
import "../styles/constructors/Inputs.css";

interface DataProps {
    data: Array<{
        [key: string]: any;
        options?: Array<{ value: string | number; label: string }>;
    }>;
    setBody: any;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
    editDatos?: { [key: string]: any };
}

import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

function Selects({ data, setBody, body, errors, editDatos }: DataProps) {
    if (!data) return null;

    useEffect(() => {
        const updates: { [key: string]: any } = {};

        data.forEach((prop) => {
            const selectProp = utils.formatProps("select", prop.props);
            const name = selectProp.name;

            if (name && !(body[name] || (editDatos && editDatos[name]))) {
                const firstOption = prop.options?.[0]?.value;
                if (firstOption !== undefined) {
                    updates[name] = firstOption;
                }
            }
        });

        if (Object.keys(updates).length > 0) {
            setBody((prevBody: any) => ({
                ...prevBody,
                ...updates,
            }));
        }
    }, [editDatos, data, setBody, body]);

    return (
        <div className="inputsContainer">
            {data.map((prop, index) => {
                const {
                    className = "css",
                    errorContent = "Este campo es necesario",
                    props,
                    options = [],
                } = prop;
                const selectProp = utils.formatProps("select", props);

                return (
                    <FormControl
                        key={index}
                        className={className}
                        fullWidth
                        error={Boolean(errors[selectProp.name])}
                    >
                        <Select
                            {...selectProp}
                            value={body[selectProp.name] || ''}
                            onChange={(e) =>
                                utils.inputBody({ e, body, setBody })
                            }
                        >
                            {options.map((option, optIndex) => (
                                <MenuItem key={optIndex} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors[selectProp.name] && (
                            <FormHelperText>{errorContent}</FormHelperText>
                        )}
                    </FormControl>
                );
            })}
        </div>
    );
}

export default Selects;
