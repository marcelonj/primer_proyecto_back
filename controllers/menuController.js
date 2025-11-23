import platosModelo from '../models/platosModel.js';
import inventarioModelo from '../models/inventarioModel.js';

async function mostrarMenu(req, res) {
  const platos = await platosModelo.obtenerPlatos();
  const platosConDisponibilidad = await Promise.all(platos.map(async (plato) => {
    const disponible = await inventarioModelo.verificarDisponibilidad(plato.ingredientes);
    return { ...plato, disponible };
  }));

  res.render('index', { titulo: 'Menu', platos: platosConDisponibilidad });
}

const menuController = { mostrarMenu };
export default menuController;