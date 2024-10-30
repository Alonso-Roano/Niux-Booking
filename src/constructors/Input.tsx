import utils from "../functions/utils";

interface DataProps {
    data:{ inputs: Array<{ [key: string]: any }>};
    setBody: (event: React.ChangeEvent<HTMLInputElement>) => void;
    body: { [key: string]: any };
}

function Input({ data,  setBody, body }: DataProps) { 
    return (
        <div>
            {data.inputs.map((prop, index) => {
                const { cantWrite, ...rest } = prop;
                return (<input key={index} {...rest} onChange={(e) => utils.inputBody({e, body, setBody, cantWrite})} value={body[prop.name] || ''}/>);
            })}
        </div>
    );
}

export default Input;