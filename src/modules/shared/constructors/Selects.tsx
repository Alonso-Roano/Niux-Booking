import { useEffect } from "react";
import utils from "@admin/functions/Utils";
import "@shared/styles/constructors/Inputs.css";
import { FormControl, Select, MenuItem, FormHelperText } from "@mui/material";

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

function Selects({ data, setBody, body, errors, editDatos }: DataProps) {
    if(!data)return null;

    useEffect(() => {
        const initializeValues = () => {
            const initialValues: { [key: string]: any } = {};
            data.forEach((prop) => {
                const selectProp = utils.formatProps("select", prop.props);
                const name = selectProp.name;

                if (name) {
                    if (editDatos && editDatos[name]) {
                        initialValues[name] = editDatos[name];
                    } else {
                        const firstOption = prop.options?.[0]?.value;
                        if (firstOption !== undefined) {
                            initialValues[name] = firstOption;
                        }
                    }
                }
            });

            if (Object.keys(initialValues).length > 0) {
                setBody((prevBody: any) => ({
                    ...prevBody,
                    ...initialValues,
                }));
            }
        };

        initializeValues();
    }, [data, editDatos, setBody]);

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
                            value={body[selectProp.name] || ""}
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
