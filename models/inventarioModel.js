import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/inventario.json');

async function obtenerInventario() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function guardarInventario(inventario) {
  await writeFile(filePath, JSON.stringify(inventario, null, 2));
}

async function agregarInventario(material, stock) {
  const inventario = await obtenerInventario();
	let bandera = false
	//Comprobamos si el material ya existe en el inventario y le sumamos el stock
	inventario.forEach(material => {
		if(material.material == material){
			material.stock = material.stock + stock;
			bandera = true
		}
	});
	// Si el material no se encontraba en el inventario se agrega como un nuevo item
	if(!bandera){
		const nuevoInventario = {
			id: inventario.length ? inventario[inventario.length - 1].id + 1 : 1,
			material,
			stock
		};
		inventario.push(nuevoInventario);
	}
  await guardarInventario(inventario);
}

async function eliminarInventarioPorId(id) {
  const inventario = await obtenerInventario();
  const actualizados = inventario.filter(e => e.id !== id);
  await guardarInventario(actualizados);
}

// Exportar todas las funciones como un objeto
const inventarioModelo = { obtenerInventario, agregarInventario, eliminarInventarioPorId };
export default inventarioModelo;
