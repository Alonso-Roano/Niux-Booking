import axios from "axios";
import Utils from "./Utils";
interface PostParams {
  setBody?: React.Dispatch<React.SetStateAction<any>>;
  setErrors?: React.Dispatch<React.SetStateAction<any>>;
  data?: any;
  mensaje?: string;
  setReponse?: React.Dispatch<React.SetStateAction<any[]>>;
}

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

const read = async (setData: React.Dispatch<React.SetStateAction<any[]>>, data: string) => {
  const jsonData = await readJson(data);
  setData(jsonData);
};

const get = async (url: string, setData: React.Dispatch<React.SetStateAction<any[]>>, token?: any) => {
  const headers = setToken(token);
  try {
    const response = await axios.get(url, headers);
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

const post = async (url: string, body: any, token?: any, params: PostParams = {}) => {
  const { setBody, mensaje = "Datos enviados correctamente", setReponse, setErrors, data } = params;
  const headers = setToken(token);
  if(Utils.validateInputs(body, data, setErrors)){
    try {
      const response = await axios.post(url, body, headers);
      if (!response.data) {
        throw new Error('Error al enviar los datos');
      }
      if (setReponse) setReponse(response.data)
      if (setBody) setBody({});
      Utils.showToast({ title: mensaje, icon: "success" })
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  }
  
}


export default { read, get, post };