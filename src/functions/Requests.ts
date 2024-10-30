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

const read = async (setData: React.Dispatch<React.SetStateAction<any[]>>, data:string) => {
  const jsonData = await readJson(data);
  setData(jsonData);
  console.log(jsonData);
};

export default {read};