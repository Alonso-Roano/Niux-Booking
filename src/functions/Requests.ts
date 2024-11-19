import { niuxApi } from "../api/niuxApi";
import Utils from "./Utils";

async function readJson(filePath: string) {
  try {
    const response = await fetch(`/json/${filePath}`);
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al importar el archivo:", error);
    return null;
  }
}

const Read = async (setData: React.Dispatch<React.SetStateAction<any[]>>, data: string) => {
  const jsonData = await readJson(data);
  setData(jsonData);
};

const Get = async (url: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
  try {
    const response = await niuxApi.get(url);
    if (!response.data) {
      throw new Error('Error al cargar los datos');
    }
    const data = response.data;
    setData(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    setData([]);
  }
}

class Post {
  private url: string;
  private fileUploadUrl?: string;
  private body: any;
  private mensaje: string = "Datos enviados correctamente";
  private setBody?: (body: any) => void;
  private setReponse?: (response: any) => void;
  private setErrors?: (errors: any) => void;
  private setClose?: (close: any) => void;
  private data?: any;

  constructor(url: string, body: any) {
    this.url = url;
    this.body = body;
  }

  Mensaje(mensaje: string): Post {
    this.mensaje = mensaje;
    return this;
  }

  SetBody(setBody: (body: any) => void): Post {
    this.setBody = setBody;
    return this;
  }

  SetReponse(setReponse: (response: any) => void): Post {
    this.setReponse = setReponse;
    return this;
  }

  SetErrors(setErrors: (errors: any) => void): Post {
    this.setErrors = setErrors;
    return this;
  }

  SetClose(setClose: (close: any) => void): Post {
    this.setClose = setClose;
    return this;
  }

  Data(data: any): Post {
    this.data = data;
    return this;
  }

  FileUploadUrl(fileUploadUrl: string): Post {
    this.fileUploadUrl = fileUploadUrl;
    return this;
  }

  private async uploadFile(file: File) {
    console.log(file)
    if (!this.fileUploadUrl) {
      throw new Error("No file upload URL specified.");
    }

    const formData = new FormData();
    formData.append('image', file);

    console.log(formData.getAll('image'))

    try {
      const response = await niuxApi.post(this.fileUploadUrl, formData);
      console.log(response)
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      Utils.showToast({ title: "Error al subir el archivo", icon: "error" });
      throw error;
    }
  }

  private parseBodyWithFile() {
    const body: any = {};
    const fileUploads: { [key: string]: string } = {};

    Object.keys(this.body).forEach((key) => {
      let value = this.body[key];

      if (value && value.name) {
        this.uploadFile(value);
      } else {
        body[key] = value;
      }
    });

    return { body, fileUploads };
  }


  async send() {
    const { body } = this.body instanceof FormData ? { body: this.body } : this.parseBodyWithFile();
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

    if (Utils.validateInputs(this.body, this.data, this.setErrors)) {
      try {
        const response = await niuxApi.post(this.url, body);
        if (!response.data) {
          Utils.showToast({ title: "Error al enviar los datos:", icon: "error" });
          throw new Error('Error al enviar los datos');
        }
        if (this.setReponse) this.setReponse(response.data);
        if (this.setBody) this.setBody({});
        if (this.setClose) this.setClose(false);
        Utils.showToast({ title: this.mensaje, icon: "success" });
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        Utils.showToast({ title: "Error al enviar los datos:", icon: "error" });
      }
    }
  }
}

class Put {
  private url: string;
  private body: any;
  private mensaje: string = "Datos actualizados correctamente";
  private setBody?: (body: any) => void;
  private setReponse?: (response: any) => void;
  private setErrors?: (errors: any) => void;
  private setClose?: (close: any) => void;
  private data?: any;

  constructor(url: string, body: any) {
    this.url = url;
    this.body = body;
  }

  Mensaje(mensaje: string): Put {
    this.mensaje = mensaje;
    return this;
  }

  SetBody(setBody: (body: any) => void): Put {
    this.setBody = setBody;
    return this;
  }

  SetReponse(setReponse: (response: any) => void): Put {
    this.setReponse = setReponse;
    return this;
  }

  SetClose(setClose: (close: any) => void): Put {
    this.setClose = setClose;
    return this;
  }

  SetErrors(setErrors: (errors: any) => void): Put {
    this.setErrors = setErrors;
    return this;
  }

  Data(data: any): Put {
    this.data = data;
    return this;
  }

  async send() {
    console.log(this.body);
    if (this.body.sexo) {
      this.body.sexo = Number(this.body.sexo);
    }
    if (this.body.duracion) {
      const [horas, minutos] = this.body.duracion.split(':').map(Number);
      const duracionEnMinutos = (horas * 60) + minutos;
      this.body.duracion = duracionEnMinutos;
    }
    if (this.body.horaInicio) this.body.horaInicio += ":00";
    if (this.body.horaFin) this.body.horaFin += ":00";
    if (this.body.fechaReserva) {
      const currentTime = new Date();
      const [year, month, day] = this.body.fechaReserva.split("-");
      const isoDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds(),
        currentTime.getMilliseconds()
      );
      this.body.fechaReserva = isoDate.toISOString();
    }

    if (Utils.validateInputs(this.body, this.data, this.setErrors)) {
      try {
        const response = await niuxApi.put(this.url, this.body);
        if (!response.data) {
          Utils.showToast({ title: "Error al actualizar los datos:", icon: "error" });
          throw new Error("Error al actualizar los datos");
        }
        if (this.setReponse) this.setReponse(response.data);
        if (this.setBody) this.setBody({});
        if (this.setClose) this.setClose(false);
        Utils.showToast({ title: this.mensaje, icon: "success" });
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        Utils.showToast({ title: "Error al actualizar los datos:", icon: "error" });
      }
    }
  }
}

class Delete {
  private url: string;
  private mensaje: string = "Borrado con éxito";
  private mensajeConfirm: string = "¿Está seguro?";
  private setReponse?: (response: any) => void;
  private setRender?: (response: any) => void;

  constructor(url: string) {
    this.url = url;
  }

  setMensaje(mensaje: string): Delete {
    this.mensaje = mensaje;
    return this;
  }

  SetReder(setRender: (response: any) => void): Delete {
    this.setRender = setRender;
    return this;
  }

  setMensajeConfirm(mensajeConfirm: string): Delete {
    this.mensajeConfirm = mensajeConfirm;
    return this;
  }

  setSetReponse(setReponse: (response: any) => void): Delete {
    this.setReponse = setReponse;
    return this;
  }

  async send() {

    Utils.confirmToast(
      { title: this.mensajeConfirm },
      this.deleteFunction,
      { url: this.url, mensaje: this.mensaje, setReponse: this.setReponse, setRender: this.setRender }
    );
  }

  private async deleteFunction(deleteParams: any) {
    const { url, mensaje, setReponse, setRender } = deleteParams;

    try {
      const response = await niuxApi.delete(url);
      if (!response.data) {
        Utils.showToast({ title: "Error al borrar los datos:", icon: "error" });
        throw new Error("Error al borrar los datos");
      }
      if (setReponse) setReponse(response.data);
      if (setRender) setRender(false);
      Utils.showToast({ title: mensaje, icon: "success" });
    } catch (error) {
      Utils.showToast({ title: "Error al borrar los datos:", icon: "error" });
      console.error("Error al borrar los datos:", error);
    }
  }
}

export default { Read, Get, Post, Put, Delete };