import Inventario from './mongo/inventarioSchema.js';

async function obtenerInventario() {
	try {
		const inventario = await Inventario.find().lean();
		return inventario;
	} catch (error) {
		console.error('Error al obtener inventario:', error);
		return [];
	}
}


async function agregarInventario(material, stock) {
	const stockNum = parseInt(stock);

	const itemExistente = await Inventario.findOne({ material });

	if (itemExistente) {
		itemExistente.stock += stockNum;
		await itemExistente.save();
	} else {
		await Inventario.create({ material, stock: stockNum });
	}
}

async function eliminarInventarioPorId(id) {
	await Inventario.findByIdAndDelete(id);
}

async function consumirStock(material, cantidad) {
	const item = await Inventario.findOne({ material });

	if (!item) {
		throw new Error(`Material ${material} no encontrado en inventario.`);
	}

	if (item.stock < cantidad) {
		throw new Error(`Stock insuficiente de ${material}.`);
	}

	item.stock -= cantidad;
	await item.save();
}

async function verificarDisponibilidad(ingredientes) {
	for (const ingrediente of ingredientes) {
		const item = await Inventario.findOne({ material: ingrediente.material });
		if (!item || item.stock < ingrediente.cantidad) {
			return false;
		}
	}
	return true;
}

const inventarioModelo = {
	obtenerInventario,
	agregarInventario,
	eliminarInventarioPorId,
	consumirStock,
	verificarDisponibilidad
};
export default inventarioModelo;
