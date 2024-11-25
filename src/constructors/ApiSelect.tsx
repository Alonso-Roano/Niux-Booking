import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "../styles/constructors/Inputs.css";
import { niuxApi } from "../api/niuxApi";
import { useAuthStore } from "../stores/auth/authStore";

interface DataProps {
    data: any;
    setBody: any;
    body: { [key: string]: any };
    errors: { [key: string]: boolean };
    editDatos?: { [key: string]: any }; 
}

function APISelect({
    data,
    setBody,
    body,
    errors,
    editDatos,
}: DataProps) {
    if (!data) return null;
    const {user} = useAuthStore();

    const [options, setOptions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                let url = data.apiUrl;
                if (url.endsWith("{}")) {
                    url = url.replace(/\/\{\}$/, "");
                    url = `${url}/${user?.idEmpresa}`;
                }
                const response = await niuxApi.get(url);
                let datos = response.data;
                if (datos.data == null) datos = { data: datos };
                setOptions(datos.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos de la API:", error);
                setLoading(false);
            }
        };
        

        fetchOptions();
    }, [data.apiUrl]);

    useEffect(() => {
        if (!editDatos && options.length > 0) {
            setBody((prevBody: any) => ({
                ...prevBody,
                [data.name]: options[0][data.valueField],
            }));
        }

        if (editDatos && editDatos[data.name]) {
            setBody((prevBody: any) => ({
                ...prevBody,
                [data.name]: editDatos[data.name],
            }));
        }
    }, [editDatos, data.name, setBody, options, data.valueField]);

    const handleChange = (event: any) => {
        const value = event.target.value;
        setBody((prevBody: any) => ({
            ...prevBody,
            [data.name]: value,
        }));
    };

    if (loading) return <div>Cargando opciones...</div>;

    return (
        <FormControl fullWidth>
            <InputLabel id={`${data.name}-select-label`} sx={{ marginTop: 2, marginLeft: -2 }} error={Boolean(errors[data.name])}>
            {Boolean(errors[data.name]) ? data.errorContent : data.label}
            </InputLabel>
            <Select
                labelId={`${data.name}-select-label`}
                value={body[data.name] || ""}
                onChange={handleChange}
                error={Boolean(errors[data.name])}
                variant="standard"
            >
                {options.length > 0 && options.map((option, index) => (
                    <MenuItem key={index} value={option[data.valueField]}>
                        {option[data.labelField]}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default APISelect;
