import utils from "../functions/Utils";

interface DataProps {
    data: { input: Array<{ [key: string]: any }> };
    setBody: (event: React.ChangeEvent<HTMLInputElement>) => void;
    body: { [key: string]: any };
    errors: { [key: string]:boolean };
}

function Input({ data, setBody, body, errors}: DataProps) {
    if(!data.input) return null;
    return (
        <div className="inputsContainer">
            {data.input.map((prop, index) => {
                const { cantWrite, className = "css", labelCss = "css", errorContent="Este campo es necesario", errorCss="input-error", props } = prop;
                const inputProp = utils.formatProps("input", props);
                return (
                    <div className={className} key={index}>
                        {prop.labelContent && <label htmlFor={inputProp.id} className={labelCss}>{prop.labelContent}</label>}
                        <input key={index} {...inputProp} onChange={(e) => utils.inputBody({ e, body, setBody, cantWrite })} className={"SiJaja " + inputProp.className} value={body[inputProp.name] || ''} />
                        {errors[inputProp.name] && <div className={errorCss}><i className="nf nf-md-alert_circle_outline"></i><p>{errorContent}</p></div>}
                    </div>
                );
            })}
        </div>
    );
}

export default Input;