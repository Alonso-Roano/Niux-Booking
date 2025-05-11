import { createElement } from "react";
import utils from "@admin/functions/Utils";

export default function Element({ data,  setBody, body }: any) {
    return (
        <div>
            {data.constructor.map((prop:any, index:any) => {
                const { cantWrite, type, props } = prop;
                const inputProp = utils.formatProps(type, props);

                return (
                    createElement(type, {
                        key: index,
                        ...inputProp,
                        onChange: type === 'input' || type === 'textarea' ? (e:any) => utils.inputBody({ e, body, setBody, cantWrite }) : undefined,
                        value: type === 'input' || type === 'textarea' ? body[inputProp.name] || '' : undefined
                    })
                );
            })}
        </div>

    )
}