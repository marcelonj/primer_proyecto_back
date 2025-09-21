import pedidosModelo from '../models/pedidosModel.js';

async function mostrarPedidos(req, res) {
  const pedidos = await pedidosModelo.obtenerPedidos();
  res.render('pedidos', { titulo: 'Lista de Pedidos', pedidos });
}

function formularioNuevoPedido(req, res) {
  res.render('nuevo_pedido', { titulo: 'Nuevo Pedido' });
}

async function guardarPedido(req, res) {
  const { cliente, pedido, cantidad } = req.body;
  if (!cliente || !pedido || !cantidad) return res.status(400).send('Cliente, pedido y cantidad son requeridos');
  await pedidosModelo.agregarPedido(cliente, pedido, cantidad);
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