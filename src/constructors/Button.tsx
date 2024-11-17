import { Button } from "@mui/material";
import utils from "../functions/Utils";

interface ButtonProps {
    data: { buttons: Array<{ [key: string]: any }> };
    Click: (action: string) => void;
}

function Buttons({ data, Click}: ButtonProps) {
    if(!data.buttons) return null;
    return (
        <div className="buttonContainer">
            {data.buttons.map((prop, index) => {
                const { onClickId="none", props } = prop;
                const buttonProp = utils.formatProps("button", props);
                return (
                        <Button
                            {...buttonProp}
                            onClick={() => {
                                Click(onClickId);
                            }}
                            key={index}
                            variant="contained"
                            className={"ButtonClass " + buttonProp.className}
                            sx={{ textTransform: 'none' }} 
                        >
                            {buttonProp.label || "Button"}
                        </Button>
                );
            })}
        </div>
    );
}

export default Buttons;
