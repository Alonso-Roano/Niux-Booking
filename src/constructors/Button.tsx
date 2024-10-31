import utils from "../functions/Utils";

interface ButtonProps {
    data: { buttons: Array<{ [key: string]: any }> };
    Click: (event: React.MouseEvent<HTMLButtonElement>, action: string, params:any) => void;
    params: Array<{ [key: string]: any }> | Array<string> | Array<number> | any[];
}

function Button({ data, Click, params}: ButtonProps) {
    return (
        <div className="buttonContainer">
            {data.buttons.map((prop, index) => {
                const { className = "css", onClickId="none", props } = prop;
                const buttonProp = utils.formatProps("button", props);
                return (
                    <div className={className} key={index}>
                        <button
                            {...buttonProp}
                            onClick={(e) => {
                                Click(e, onClickId, params[index]);
                            }}
                            className={"ButtonClass " + buttonProp.className}
                        >
                            {buttonProp.label || "Button"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default Button;
