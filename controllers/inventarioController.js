import inventarioModelo from '../models/inventarioModel.js';

async function mostrarInventario(req, res) {
  const inventario = await inventarioModelo.obtenerInventario();

  const inventarioConAlertas = inventario.map(item => ({
    _id: item._id,
    material: item.material,
    stock: item.stock,
    bajoStock: Number(item.stock) < 10
  }));

  res.render('inventario', {
    titulo: 'Inventario',
    inventario: inventarioConAlertas
  });
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
  const { id } = req.params;
  console.log('ID a eliminar:', id);   // 👈 debug, deberías ver el ObjectId en consola
  await inventarioModelo.eliminarInventarioPorId(id);
  res.redirect('/inventario/');
}

const inventarioController = {
  mostrarInventario,
  formularioNuevoInventario,
  guardarInventario,
  eliminarInventario
};

export default inventarioController;
