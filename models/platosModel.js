// models/platosModel.js
import Plato from './mongo/platoSchema.js';

async function obtenerPlatos() {
    return Plato.find().lean(); // objetos planos para Pug
}

async function obtenerPlatoPorNombre(nombre) {
    return Plato.findOne({ nombre }).lean();
}

async function crearPlato(data) {
    return Plato.create(data);
}

async function eliminarPlatoPorId(id) {
    return Plato.findByIdAndDelete(id);
}

const platosModelo = {
    obtenerPlatos,
    obtenerPlatoPorNombre,
    crearPlato,
    eliminarPlatoPorId
};

export default platosModelo;
