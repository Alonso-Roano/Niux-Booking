import axios from "axios";
import Utils from "./Utils";

const Axios = axios.create({
  baseURL: 'https://api.example.com', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function readJson(filePath: string) {
  try {
    const response = await fetch(`./json/${filePath}`);
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

const setToken = (token: any) => { return { headers: { 'Authorization': `Bearer ${token ? token : "token"}` } } }

const Read = async (setData: React.Dispatch<React.SetStateAction<any[]>>, data: string) => {
  const jsonData = await readJson(data);
  setData(jsonData);
};

const Get = async (url: string, setData: React.Dispatch<React.SetStateAction<any[]>>, token?: any) => {
  const headers = setToken(token);
  try {
    const response = await Axios.get(url, headers);
    if (!response.data) {
      throw new Error('Error al cargar los datos');
    }
    const data = response.data.results;
    setData(data);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    setData([]);
  }
}

class Post {
  private url: string;
  private body: any;
  private token?: any;
  private mensaje: string = "Datos enviados correctamente";
  private setBody?: (body: any) => void;
  private setReponse?: (response: any) => void;
  private setErrors?: (errors: any) => void;
  private data?: any;

  constructor(url: string, body: any) {
    this.url = url;
    this.body = body;
  }

  Token(token: any): Post {
    this.token = token;
    return this;
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

  Data(data: any): Post {
    this.data = data;
    return this;
  }

  async send() {
    const headers = setToken(this.token);

    if (Utils.validateInputs(this.body, this.data, this.setErrors)) {
      try {
        const response = await Axios.post(this.url, this.body, headers);
        if (!response.data) {
          Utils.showToast({ title: "Error al enviar los datos:", icon: "error" });
          throw new Error('Error al enviar los datos');
        }
        if (this.setReponse) this.setReponse(response.data);
        if (this.setBody) this.setBody({});
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
  private token?: any;
  private mensaje: string = "Datos actualizados correctamente";
  private setBody?: (body: any) => void;
  private setReponse?: (response: any) => void;
  private setErrors?: (errors: any) => void;
  private data?: any;

  constructor(url: string, body: any) {
    this.url = url;
    this.body = body;
  }

  Token(token: any): Put {
    this.token = token;
    return this;
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

  SetErrors(setErrors: (errors: any) => void): Put {
    this.setErrors = setErrors;
    return this;
  }

  Data(data: any): Put {
    this.data = data;
    return this;
  }

  async send() {
    const headers = setToken(this.token);
    console.log(this.body);

    if (Utils.validateInputs(this.body, this.data, this.setErrors)) {
      try {
        const response = await Axios.put(this.url, this.body, headers);
        if (!response.data) {
          Utils.showToast({ title: "Error al actualizar los datos:", icon: "error" });
          throw new Error("Error al actualizar los datos");
        }
        if (this.setReponse) this.setReponse(response.data);
        if (this.setBody) this.setBody({});
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
  private token?: any;
  private mensaje: string = "Borrado con éxito";
  private mensajeConfirm: string = "¿Está seguro?";
  private setReponse?: (response: any) => void;

  constructor(url: string) {
    this.url = url;
  }

  setToken(token: any): Delete {
    this.token = token;
    return this;
  }

  setMensaje(mensaje: string): Delete {
    this.mensaje = mensaje;
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
    const headers = setToken(this.token);

    Utils.confirmToast(
      { title: this.mensajeConfirm },
      this.deleteFunction,
      { url: this.url, headers, mensaje: this.mensaje, setReponse: this.setReponse }
    );
  }

  private async deleteFunction(deleteParams: any) {
    const { url, headers, mensaje, setReponse } = deleteParams;

    try {
      const response = await Axios.delete(url, headers);
      if (!response.data) {
        Utils.showToast({ title: "Error al borrar los datos:", icon: "error" });
        throw new Error("Error al borrar los datos");
      }
      if (setReponse) setReponse(response.data);
      Utils.showToast({ title: mensaje, icon: "success" });
    } catch (error) {
      Utils.showToast({ title: "Error al borrar los datos:", icon: "error" });
      console.error("Error al borrar los datos:", error);
    }
  }
}

export default { Read, Get, Post, Put, Delete };