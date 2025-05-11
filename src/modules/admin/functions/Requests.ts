import { niuxApi } from "@core/api/niuxApi";
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

  private clearBodyProperties(): void {
    if (typeof this.body === "object" && this.body !== null) {
      Object.keys(this.body).forEach((key) => {
        const value = this.body[key];
        if(key == "sexo"){
          this.body[key] = "h";
        }else{
          if (typeof value === "number" || !isNaN(Number(value))) {
            this.body[key] = 0;
          } else if (typeof value === "string") {
            this.body[key] = "";
          } else {
            this.body[key] = null;
          }
        }
      });
    }
  }

  private async uploadFile(file: File, id: string | number) {
    if (!this.fileUploadUrl) {
      throw new Error("No file upload URL specified.");
    }

    const formData = new FormData();
    formData.append("Archivo", file);
    formData.append("idServicio", id.toString());

    try {
      const response = await niuxApi.post(this.fileUploadUrl,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      Utils.showToast({ title: "Error al subir el archivo", icon: "error" });
      throw error;
    }
  }

  private async uploadFilesWithId(id: string | number) {
    const files = Object.keys(this.body)
      .map((key) => this.body[key])
      .filter((value) => value instanceof File);
    if (!this.fileUploadUrl || files.length === 0) return;
    for (const file of files) {
      await this.uploadFile(file, id);
    }
  }

  private parseBodyWithoutFiles() {
    const body: any = {};

    Object.keys(this.body).forEach((key) => {
      const value = this.body[key];
      if (!(value instanceof File)) {
        body[key] = value;
      }
    });

    return body;
  }

  async send() {
    const body = this.body instanceof FormData ? this.body : this.parseBodyWithoutFiles();

    Utils.transformData(body);

    if (Utils.validateInputs(this.body, this.data, this.setErrors)) {
      try {
        const response = await niuxApi.post(this.url, body);
        if (!response.data) {
          Utils.showToast({ title: "Error al enviar los datos:", icon: "error" });
          throw new Error("Error al enviar los datos");
        }
        
        if (this.setReponse) this.setReponse(response.data);
        if (this.setBody) {
          this.clearBodyProperties();
          this.setBody(this.body);
        }       

        if(this.data?.imageUrl){
          const id = response.data?.data?.id;
          if (!id) {
            throw new Error("No se recibió un ID en la respuesta.");
          }

          await this.uploadFilesWithId(id);
        }

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
  private urlCrear?: string;

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

  UrlCrear(urlCrear: string): Put {
    this.urlCrear = urlCrear;
    return this;
  }

  private async createNewImages() {
    const files = Object.keys(this.body)
        .map((key) => this.body[key])
        .filter((value) => value instanceof File);

    if (!this.body.imagenes) {
        this.body.imagenes = [];
    }

    for (const file of files) {
        try {
            const newImage = await this.createImage(file, this.body.id);
            if (newImage) {
                this.body.imagenes.push(newImage);
            }
        } catch (error) {
            console.error("Error al crear nueva imagen:", error);
            Utils.showToast({ title: "Error al crear nueva imagen", icon: "error" });
        }
    }
}

  
  private async createImage(file: File, idServicio: string | number) {
    if (!this.urlCrear) {
      throw new Error("No se especificó una URL para crear nuevas imágenes.");
    }
  
    const formData = new FormData();
    let idEnviar = "";
    if(this.data.title == "Editar Compañia"){
      idEnviar = "idEmpresa";
    }else{
      idEnviar = "idServicio";
    }
    formData.append("Archivo", file);
    formData.append(idEnviar, idServicio.toString());
  
    try {
      const response = await niuxApi.post( this.urlCrear,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      return {
        url: response.data.url, 
        idServicio,
        id: response.data.id,
        isDeleted: false,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error al crear la imagen:", error);
      throw error;
    }
  }
  

  private parseBodyWithoutFiles() {
    const body: any = {};

    Object.keys(this.body).forEach((key) => {
      const value = this.body[key];
      if (!(value instanceof File)) {
        body[key] = value;
      }
    });

    return body;
  }

  async send() {
    if(this.url !== "ImagenServicio/ActualizarImagenServicio"){
      this.createNewImages();
    }    

    const body = this.body instanceof FormData ? this.body : this.parseBodyWithoutFiles();
    Utils.transformData(body);

    if (Utils.validateInputs(this.body, this.data, this.setErrors)) {
      try {
        const response = await niuxApi.put(this.url, body);
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