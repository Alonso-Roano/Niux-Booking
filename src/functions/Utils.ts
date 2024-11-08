import Swal from "sweetalert2";

const checkJson = (json: any) => { return typeof json === 'object' && json !== null && Object.keys(json).length > 0 }

const inputBody = (params: any) => {
    const { e, body, setBody, cantWrite = "." } = params;
    const { name, value } = e.target;
    const regex = new RegExp(`[${cantWrite}]`);
    if (!regex.test(value)) setBody({ ...body, [name]: value });
};

const formatProps = (type: string, { identifier, ...rest }: any) => {
    switch (type) {
        case 'input':
            return {
                ...rest,
                id: rest.id || identifier,
                name: rest.name || identifier,
                placeholder: rest.placeholder || `Escribe tu ${identifier}`,
                className: rest.className || `input-${identifier}`,
                type: rest.type || 'text'
            };

        case 'textarea':
            return {
                ...rest,
                id: rest.id || identifier,
                name: rest.name || identifier,
                placeholder: rest.placeholder || identifier,
                className: rest.className || `textarea-${identifier}`,
                rows: rest.rows || 3
            };

        case 'button':
            return {
                ...rest,
                id: rest.id || identifier,
                name: rest.name || identifier,
                className: rest.className || `button-${identifier}`,
                type: rest.type || 'button',
            };

        case 'select':
            return {
                ...rest,
                id: rest.id || identifier,
                name: rest.name || identifier,
                className: rest.className || `select-${identifier}`,
                options: rest.options || []
            };

        case 'label':
            return {
                ...rest,
                id: rest.id || identifier,
                htmlFor: rest.htmlFor || identifier,
                className: rest.className || `label-${identifier}`,
                text: rest.text || ''
            };

        case 'img':
            return {
                ...rest,
                id: rest.id || identifier,
                src: rest.src || '',
                alt: rest.alt || identifier,
                className: rest.className || `img-${identifier}`,
                width: rest.width || 'auto',
                height: rest.height || 'auto'
            };

        case 'a':
            return {
                ...rest,
                id: rest.id || identifier,
                href: rest.href || '#',
                target: rest.target || '_self',
                className: rest.className || `link-${identifier}`,
                text: rest.text || ''
            };

        case 'div':
            return {
                ...rest,
                id: rest.id || identifier,
                className: rest.className || `div-${identifier}`,
                role: rest.role || 'presentation'
            };

        default:
            return { ...rest };
    }
};

const Toast = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: false,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const showToast = (params: any) => {
    Toast.fire(params)
}

const confirmToast = (params: any, confirmFunction: any, functionParams:any) => {
    Toast.fire({
        ...params,
        showCancelButton: true,
        showConfirmButton: true,
        icon: params.icon || "warning",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        timer:false
    }).then((result) => {
        if (result.isConfirmed) {
            confirmFunction(functionParams);
        }
    });
};

const getInputs = (data: any): string[] => {
    const result: string[] = [];

    const inputTypes = ['input', 'textarea', 'select', 'radio', 'checkbox'];

    inputTypes.forEach((type) => {
        if (data[type]) {
            data[type]?.forEach((element: any) => {
                const nameOrIdentifier = element.props.name || element.props.identifier;
                if (nameOrIdentifier) {
                    result.push(nameOrIdentifier);
                }
            });
        }
    });

    return result;
};

const validateInputs = (body: { [key: string]: any }, data: any, setErrors:any) => {
    console.log(setErrors, data)
    if(!(setErrors && data)) return true;
    setErrors((prevState:any) => Object.fromEntries(Object.keys(prevState).map(key => [key, false])));
    const names = getInputs(data);
    const emptyFields = names.filter(name => !body[name] && body[name] !== true);

    if(emptyFields.length === 0) return true;

    console.log(emptyFields);
    console.log(body)

    emptyFields.forEach(field => setErrors((prevErrors:any) => ({...prevErrors, [field]: true })));
    return false;
};

export default { checkJson, inputBody, formatProps, showToast, confirmToast, validateInputs };