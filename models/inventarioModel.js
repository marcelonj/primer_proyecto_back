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
	const stockNum = parseInt(stock);

	const itemExistente = inventario.find(item => item.material === material);

	if (itemExistente) {
		itemExistente.stock = parseInt(itemExistente.stock) + stockNum;
	} else {
		const nuevoInventario = {
			id: inventario.length ? Math.max(...inventario.map(i => i.id)) + 1 : 1,
			material,
			stock: stockNum
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

async function consumirStock(material, cantidad) {
	const inventario = await obtenerInventario();
	const item = inventario.find(i => i.material === material);

	if (!item) {
		throw new Error(`Material ${material} no encontrado en inventario.`);
	}

	if (parseInt(item.stock) < cantidad) {
		throw new Error(`Stock insuficiente de ${material}.`);
	}

	item.stock = parseInt(item.stock) - cantidad;
	await guardarInventario(inventario);
}

async function verificarDisponibilidad(ingredientes) {
	// ingredientes: [{ material: "Panes", cantidad: 1 }, ...]
	const inventario = await obtenerInventario();

	for (const ingrediente of ingredientes) {
		const item = inventario.find(i => i.material === ingrediente.material);
		if (!item || parseInt(item.stock) < ingrediente.cantidad) {
			return false;
		}
	}
	return true;
}

// Exportar todas las funciones como un objeto
const inventarioModelo = {
	obtenerInventario,
	agregarInventario,
	eliminarInventarioPorId,
	consumirStock,
	verificarDisponibilidad
};
export default inventarioModelo;
