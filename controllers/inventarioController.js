import inventarioModelo from '../models/inventarioModel.js';

async function mostrarInventario(req, res) {
  const inventario = await inventarioModelo.obtenerInventario();
  res.render('inventario', { titulo: 'Inventario', inventario });
}

function formularioNuevoInventario(req, res) {
  res.render('nuevo_inventario', { titulo: 'Nuevo Inventario' });
}

async function guardarInventario(req, res) {
  const { material, stock } = req.body;
  if (!material || !stock) return res.status(400).send('Material y stock son requeridos');
  await inventarioModelo.agregarInventario(material, stock);
  res.redirect('/inventario/');
}

async function eliminarInventario(req, res) {
  const id = parseInt(req.params.id);
  await inventarioModelo.eliminarInventarioPorId(id);
  res.redirect('/inventario/');
}

const inventarioController = { mostrarInventario, formularioNuevoInventario, guardarInventario, eliminarInventario };
export default inventarioController;