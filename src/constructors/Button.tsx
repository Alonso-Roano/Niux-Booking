import { Button } from "@mui/material";
import utils from "../functions/Utils";

interface ButtonProps {
    data: { buttons: Array<{ [key: string]: any }> };
    Click: (event: React.MouseEvent<HTMLAnchorElement>, action: string, params:any) => void;
    params: Array<{ [key: string]: any }> | Array<string> | Array<number> | any[];
}

function Buttons({ data, Click, params}: ButtonProps) {
    if(!data.buttons) return null;
    return (
        <div className="buttonContainer">
            {data.buttons.map((prop, index) => {
                const { className = "css", onClickId="none", props } = prop;
                const buttonProp = utils.formatProps("button", props);
                return (
                    <div className={className} key={index}>
                        <Button
                            {...buttonProp}
                            onClick={(e) => {
                                Click(e, onClickId, params[index]);
                            }}
                            variant="contained"
                            className={"ButtonClass " + buttonProp.className}
                            sx={{ textTransform: 'none' }} 
                        >
                            {buttonProp.label || "Button"}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}

export default Buttons;
