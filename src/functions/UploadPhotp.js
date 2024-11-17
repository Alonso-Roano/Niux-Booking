import { google } from 'googleapis';
import fs from "fs";
import path from "path";

// Configuración del cliente de Google Drive
const authenticate = () => {
    const credentials = JSON.parse(
        fs.readFileSync('C:/Users/Alonso/Downloads/secreto.json', 'utf-8')
    );
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    return auth;
};

const uploadImageToDrive = async (filePath) => {
    try {
        const auth = authenticate();
        const drive = google.drive({ version: 'v3', auth });

        const fileMetadata = {
            name: path.basename(filePath), // Nombre del archivo en Drive
        };

        const media = {
            mimeType: 'image/jpeg', // Cambia esto según el tipo de archivo
            body: fs.createReadStream(filePath), // Flujo de datos del archivo
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media,
            fields: 'id', // Solo devuelve el ID del archivo
        });

        console.log('File uploaded to Drive with ID:', response.data.id);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

// Ejecución
uploadImageToDrive('C:/Users/Alonso/Downloads/menu.jpg');
