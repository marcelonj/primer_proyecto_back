import pedidosModelo from '../models/pedidosModel.js';
import platosModelo from '../models/platosModel.js';
import inventarioModelo from '../models/inventarioModel.js';

async function mostrarPedidos(req, res) {
  const pedidos = await pedidosModelo.obtenerPedidos();
  res.render('pedidos', { titulo: 'Lista de Pedidos', pedidos });
}

async function formularioNuevoPedido(req, res) {
  const platos = await platosModelo.obtenerPlatos();
  res.render('nuevo_pedido', { titulo: 'Nuevo Pedido', platos });
}

async function guardarPedido(req, res) {
  const { cliente, pedido, cantidad } = req.body;
  const cantidadNum = parseInt(cantidad);

  if (!cliente || !pedido || !cantidad) return res.status(400).send('Cliente, pedido y cantidad son requeridos');

  // Verificar stock
  const plato = await platosModelo.obtenerPlatoPorNombre(pedido);
  if (plato) {
    const ingredientesNecesarios = plato.ingredientes.map(i => ({
      material: i.material,
      cantidad: i.cantidad * cantidadNum
    }));

    const disponible = await inventarioModelo.verificarDisponibilidad(ingredientesNecesarios);
    if (!disponible) {
      return res.status(400).send('No hay stock suficiente para realizar este pedido.');
    }

    // Consumir stock
    for (const ingrediente of ingredientesNecesarios) {
      await inventarioModelo.consumirStock(ingrediente.material, ingrediente.cantidad);
    }
  }

  await pedidosModelo.agregarPedido(cliente, pedido, cantidadNum);
  res.redirect('/pedidos/');
}

async function eliminarPedidos(req, res) {
  const id = parseInt(req.params.id);
  await pedidosModelo.eliminarPedidoPorId(id);
  res.redirect('/pedidos/');
}

async function modificarPedidos(req, res) {
  const { id, cliente, pedido, cantidad } = req.body;
  if (id === undefined) {
    return res.status(400).send('El ID es un campo requerido.');
  }
  try {
    await pedidosModelo.modificarPedidoPorId(parseInt(id), cliente, pedido, parseInt(cantidad));
    res.status(200).send("Solicitud de cambio recibida")
  } catch (error) {
    if (error.message === 'El pedido con el ID especificado no fue encontrado.') {
      return res.status(404).send(error.message);
    }
    res.status(500).send('Ocurrió un error inesperado al modificar el pedido.');
  }
}

const pedidosController = { mostrarPedidos, formularioNuevoPedido, guardarPedido, eliminarPedidos, modificarPedidos };
export default pedidosController;