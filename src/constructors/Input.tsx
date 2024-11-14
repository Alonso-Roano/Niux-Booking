import utils from "../functions/Utils";

interface DataProps {
    data: { input: Array<{ [key: string]: any }> };
    setBody: (event: React.ChangeEvent<HTMLInputElement>) => void;
    body: { [key: string]: any };
    errors: { [key: string]:boolean };
}

import { TextField, FormControl } from '@mui/material';

function Inputs({ data, setBody, body, errors }: DataProps) {
    if (!data.input) return null;

    return (
        <div className="inputsContainer">
            {data.input.map((prop, index) => {
                const {
                    cantWrite,
                    className = "css",
                    errorContent = "Este campo es necesario",
                    props,
                } = prop;
                const inputProp = utils.formatProps("input", props);

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
                        />
                    </FormControl>
                );
            })}
        </div>
    );
}


export default Inputs;