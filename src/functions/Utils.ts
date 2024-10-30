const checkJson = (json:any) => {return typeof json === 'object' && json !== null && Object.keys(json).length > 0}

const inputBody = (params:any) => {
    const { e, body, setBody, cantWrite = "." } = params;
    const { name, value } = e.target;
    const regex = new RegExp(`[${cantWrite}]`);
    if (!regex.test(value)) setBody({ ...body, [name]: value });
};

export default {checkJson, inputBody};