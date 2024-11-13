import { TextField, FormControl } from '@mui/material';
import utils from "../functions/Utils";

interface DataProps {
    data: { textarea: Array<{ [key: string]: any }> };
    setBody: (event: React.ChangeEvent<HTMLInputElement>) => void;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
}

function Textarea({ data, setBody, body, errors }: DataProps) {
    if (!data.textarea) return null;

    return (
        <div className="textareaContainer">
            {data.textarea.map((prop, index) => {
                const {
                    cantWrite,
                    className = "css",
                    errorContent = "Este campo es necesario",
                    props,
                } = prop;
                const inputProp = utils.formatProps("textarea", props);

                return (
                    <FormControl key={index} className={className} fullWidth>
                        <TextField
                            {...inputProp}
                            variant="outlined"
                            multiline
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

export default Textarea;