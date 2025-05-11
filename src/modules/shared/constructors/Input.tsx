import { useEffect, useState } from "react";
import utils from "@admin/functions/Utils";
import "@shared/styles/constructors/Inputs.css";

interface DataProps {
  data: Array<{ [key: string]: any }>;
  setBody: any;
  body: { [key: string]: any };
  errors: { [key: string]: boolean };
  editDatos?: { [key: string]: any };
  horas?: any;
}

import { TextField, FormControl } from "@mui/material";

function Inputs({ data, setBody, body, errors, editDatos, horas }: DataProps) {
  const [activeDays, setActiveDays] = useState<number[]>([]);

  useEffect(() => {
    if (horas) {
      const days = horas.filter((hora:any) => hora.activo).map((hora:any) => hora.dia);
      setActiveDays(days);
    }
  }, [horas]);

  useEffect(() => {
    if (editDatos) {
      const updates: { [key: string]: any } = {};

      data.forEach((prop) => {
        const inputProp = utils.formatProps("input", prop.props);
        const name = inputProp.name;

        if (name && editDatos[name] !== undefined) {
          let value = editDatos[name];

          if (inputProp.type === "date" && typeof value === "string" && value.includes("/")) {
            const [day, month, year] = value.split("/");
            value = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
          }

          updates[name] = value;
        }
      });

      setBody((prevBody: any) => ({
        ...prevBody,
        ...updates,
      }));
    }
  }, [editDatos, data, setBody]);

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="inputsContainer">
      {data.map((prop, index) => {
        const {
          cantWrite,
          className = "css",
          errorContent = "Este campo es necesario",
          props,
        } = prop;
        const inputProp = utils.formatProps("input", props);

        if (inputProp.type === "date") {
          inputProp.inputProps = {
            ...inputProp.inputProps,
            min: minDate,
            step: 1,
            onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedDate = new Date(e.target.value);
              const selectedDay = selectedDate.getDay();
              if (!activeDays.includes(selectedDay)) {
                e.preventDefault();
              }
            },
          };
        }

        return (
          <FormControl key={index} className={className} fullWidth>
            <TextField
              {...inputProp}
              variant="standard"
              label={prop.labelContent}
              error={Boolean(errors[inputProp.name])}
              helperText={errors[inputProp.name] ? errorContent : ""}
              onChange={(e) =>
                utils.inputBody({ e, body, setBody, cantWrite })
              }
              value={body[inputProp.name] || ""}
              className={"SiJaja " + inputProp.className}
              InputLabelProps={{
                shrink: body[inputProp.name] || inputProp.type === "date" ? true : false,
              }}
            />
          </FormControl>
        );
      })}
    </div>
  );
}

export default Inputs;
