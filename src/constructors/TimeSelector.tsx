import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "../styles/constructors/Inputs.css";

interface DataProps {
    startHour: string; 
    endHour: string;
    setBody: any;
    body: { [key: string]: any };
    data: any;
    errors: { [key: string]: boolean };
    editDatos?: { [key: string]: any }; 
}

const convertTo24HourFormat = (time: string): string => {
    const [hourMinute, meridian] = time.split(" ");
    let [hours, minutes] = hourMinute.split(":").map(Number);
    if (meridian.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (meridian.toUpperCase() === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

function TimeSelector({
    data,
    startHour,
    endHour,
    setBody,
    body,
    errors,
    editDatos,
}: DataProps) {
    if (!data) return null;

    const [timeOptions, setTimeOptions] = useState<string[]>([]);

    useEffect(() => {
        const generateTimeOptions = (start: string, end: string): string[] => {
            const options: string[] = [];
            const [startH, startM] = start.split(":").map(Number);
            const [endH, endM] = end.split(":").map(Number);

            let current = new Date();
            current.setHours(startH, startM, 0, 0);

            const endDate = new Date();
            endDate.setHours(endH, endM, 0, 0);

            while (current <= endDate) {
                options.push(current.toTimeString().slice(0, 5));
                current.setMinutes(current.getMinutes() + 15);
            }
            return options;
        };

        setTimeOptions(generateTimeOptions(startHour, endHour));
    }, [startHour, endHour]);

    useEffect(() => {
        if (editDatos) {
            const transformedData = { ...editDatos };

            if (editDatos.duracion) {
                const horas = Math.floor(editDatos.duracion / 60);
                const minutos = editDatos.duracion % 60;
                transformedData.duracion = `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
            }
            if (editDatos.horaInicio) {
                transformedData.horaInicio = convertTo24HourFormat(editDatos.horaInicio);
            }
            if (editDatos.horaFin) {
                transformedData.horaFin = convertTo24HourFormat(editDatos.horaFin);
            }

            setBody((prevBody: any) => ({
                ...prevBody,
                [data.name]: transformedData[data.name],
            }));
        }
    }, [editDatos, data.name, setBody]);

    const handleChange = (event: any) => {
        const value = event.target.value as string;
        setBody((prevBody: any) => ({
            ...prevBody,
            [data.name]: value,
        }));
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="time-select-label" sx={{ marginTop: 2, marginLeft: -2 }}>
                {data.label}
            </InputLabel>
            <Select
                labelId="time-select-label"
                value={body[data.name] || ""}
                onChange={handleChange}
                error={Boolean(errors[data.name])}
                variant="standard"
            >
                {timeOptions.map((time, index) => (
                    <MenuItem key={index} value={time}>
                        {time}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default TimeSelector;
