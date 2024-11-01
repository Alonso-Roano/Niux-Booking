import utils from "../functions/Utils";

interface DataProps {
    data: { textarea: Array<{ [key: string]: any }> };
    setBody: (event: React.ChangeEvent<HTMLInputElement>) => void;
    body: { [key: string]: any };
    errors: { [key: string]:boolean };
}

function Textarea({ data, setBody, body, errors}: DataProps) {
    if(!data.textarea) return null;
    return (
        <div className="textareaContainer">
            {data.textarea.map((prop, index) => {
                const { cantWrite, className = "css", labelCss = "css", errorContent="Este campo es necesario", errorCss="textarea-error", props } = prop;
                const inputProp = utils.formatProps("textarea", props);
                return (
                    <div className={className} key={index}>
                        {prop.labelContent && <label htmlFor={inputProp.id} className={labelCss}>{prop.labelContent}</label>}
                        <textarea key={index} {...inputProp} onChange={(e) => utils.inputBody({ e, body, setBody, cantWrite })} className={"SiJaja " + inputProp.className} value={body[inputProp.name] || ''} ></textarea>
                        {errors[inputProp.name] && <div className={errorCss}><i className="nf nf-md-alert_circle_outline"></i><p>{errorContent}</p></div>}
                    </div>
                );
            })}
        </div>
    );
}

export default Textarea;