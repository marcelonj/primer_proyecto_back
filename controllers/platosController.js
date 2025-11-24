// controllers/platosController.js
import platosModelo from '../models/platosModel.js';

async function listarPlatos(req, res) {
    const platos = await platosModelo.obtenerPlatos();
    res.render('platos', {
        titulo: 'Platos',
        platos
    });
}

function formularioNuevoPlato(req, res) {
    res.render('nuevo_plato', {
        titulo: 'Nuevo Plato'
    });
}

async function guardarNuevoPlato(req, res) {
    try {
        const { nombre, precio, material1, cantidad1, material2, cantidad2 } = req.body;

        if (!nombre || !precio) {
            return res.status(400).send('Nombre y precio son requeridos');
        }

        // Por ahora soportamos hasta 2 ingredientes simples (se puede mejorar luego)
        const ingredientes = [];

        if (material1 && cantidad1) {
            ingredientes.push({
                material: material1,
                cantidad: Number(cantidad1)
            });
        }

        if (material2 && cantidad2) {
            ingredientes.push({
                material: material2,
                cantidad: Number(cantidad2)
            });
        }

        await platosModelo.crearPlato({
            nombre,
            precio: Number(precio),
            ingredientes
        });

        res.redirect('/platos/');
    } catch (error) {
        console.error('Error al crear plato:', error);
        res.status(500).send('Error al crear plato');
    }
}

const platosController = {
    listarPlatos,
    formularioNuevoPlato,
    guardarNuevoPlato
};

export default platosController;
