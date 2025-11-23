import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/platos.json');

async function obtenerPlatos() {
    try {
        const data = await readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function obtenerPlatoPorNombre(nombre) {
    const platos = await obtenerPlatos();
    return platos.find(p => p.nombre === nombre);
}

// Exportar todas las funciones como un objeto
const platosModelo = { obtenerPlatos, obtenerPlatoPorNombre };
export default platosModelo;
