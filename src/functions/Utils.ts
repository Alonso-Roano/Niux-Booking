import Swal from "sweetalert2";
import { dictionary } from "./Dictionary";

const checkJson = (json: any) => { return typeof json === 'object' && json !== null && Object.keys(json).length > 0 }

const inputBody = (params: any) => {
    const { e, body, setBody, cantWrite = "." } = params;
    const { name, value } = e.target;
    const regex = new RegExp(`[${cantWrite}]`);

    const convertedValue = value !== "" && !isNaN(value) ? parseFloat(value) : value;

    if (!regex.test(value)) {
        setBody({ ...body, [name]: convertedValue });
    }
};

const convertToMinutes = (time:any) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
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

const confirmToast = (params: any, confirmFunction: any, functionParams: any) => {
    Toast.fire({
        ...params,
        showCancelButton: true,
        showConfirmButton: true,
        icon: params.icon || "warning",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        timer: false
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

const validateInputs = (body: { [key: string]: any }, data: any, setErrors: any) => {
    if (!(setErrors && data)) return true;

    setErrors((prevState: any) => Object.fromEntries(Object.keys(prevState).map(key => [key, false])));

    const names = getInputs(data);

    let emptyFields = names.filter(name => body[name] === undefined || body[name] === null || body[name] === '' || body["sexo"] == -1 );

    if(body["horaInicio"]) if(body["horaInicio"] == "Selecciona una fecha") emptyFields.push("fechaReserva");

    if(body["horaInicio"] && body["horaFin"]) if (convertToMinutes(body["horaInicio"]) >= convertToMinutes(body["horaFin"])) {
        emptyFields.push("horaInicio");
        emptyFields.push("horaFin");
    }

    if(data.imageUrl) if(data.imageUrl == "api/ImagenServicio/SubirImagen"){
        if(!body["image1"] && !body["image2"] && !body["image3"]){
            emptyFields.push("image1");
            emptyFields.push("image2");
            emptyFields.push("image3");
        }
    }

    if (emptyFields.length === 0) return true;

    emptyFields.forEach(field => setErrors((prevErrors: any) => ({ ...prevErrors, [field]: true })));

    return false;
};

function getDefinition(word: string): string {
    const translation = dictionary[word.toLowerCase()];
    if (translation) {
        return translation;
    } else {
        return "Traducción no encontrada.";
    }
}

function flattenObject(obj: any, prefix: string = ''): Record<string, any> {
    let result: Record<string, any> = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(result, flattenObject(obj[key], newKey));
            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
}

function mapJsonToHtml(json: Record<string, any>): string {
    const baseUrl = "https://localhost:7044/";
    let html = '';
    let imageHtml = '';

    for (const key in json) {
        if ((key !== "id") && (key !== "idEmpresa") && (key !== "isDeleted") && (key !== "idServicio") && (key !== "idReserva") && (key !== "idCliente")) {
            if (json.hasOwnProperty(key)) {
                const value = json[key];
                const traduccion = key === 'imagenes' ? 'Imagen' : getDefinition(key);

                if (key === 'imagenes' && Array.isArray(value)) {
                    value.forEach((imagen: { url: string }) => {
                        if (imagen.url) {
                            imageHtml += `<div class="viewCard">
                                            <h5>${traduccion}:</h5>
                                            <span><img src="${baseUrl}${imagen.url}" /></span>
                                          </div>`;
                        }
                    });
                } else if (typeof value === 'object' && value !== null) {
                    html += `<div class="viewCard">
                                <p><strong>${traduccion}:</strong></p>
                                ${mapJsonToHtml(value)}
                             </div>`;
                } else {
                    if (typeof value === 'string' && value.startsWith('http')) {
                        html += `<div class="viewCard">
                                    <p><span>${traduccion}:</span></p>
                                    <img src="${value}" alt="${traduccion}" />
                                 </div>`;
                    } else {
                        html += `<div class="viewCard">
                                    <h5>${traduccion}:</h5>
                                    <p>${value}</p>
                                 </div>`;
                    }
                }
            }
        }
    }

    return html + imageHtml;
}
  
function transformData(body:any) {
    if (body.sexo) {
      body.sexo = Number(body.sexo);
    }
    if (body.duracion) {
      const [horas, minutos] = body.duracion.split(':').map(Number);
      const duracionEnMinutos = (horas * 60) + minutos;
      body.duracion = duracionEnMinutos;
    }
    if (body.horaInicio) body.horaInicio += ":00";
    if (body.horaFin) body.horaFin += ":00";
    if (body.fechaReserva) {
      const currentTime = new Date();
      const [year, month, day] = body.fechaReserva.split("-");
      const isoDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        currentTime.getMilliseconds()
      );
      body.fechaReserva = isoDate.toISOString();
    }
    if (body.estatus) body.estatus = Number(body.estatus);
  } 


export default { checkJson, inputBody, formatProps, showToast, confirmToast, validateInputs, getDefinition, flattenObject, mapJsonToHtml, transformData };