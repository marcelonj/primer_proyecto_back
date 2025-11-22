import pedidosModelo from '../models/pedidosModel.js';

async function mostrarPedidos(req, res) {
  const pedidos = await pedidosModelo.obtenerPedidos();
  res.render('pedidos', { titulo: 'Lista de Pedidos', pedidos });
}

async function mostrarEstadoPedido(req, res) {
  const id = parseInt(req.params.id); // obtener el id de la URL
  const pedidos = await pedidosModelo.obtenerPedidos();
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return res.status(404).send('Pedido no encontrado');
  }

  res.render('estado_pedido', { titulo: 'Estado del Pedido', pedido });
}

async function mostrarAsignacionPedidos(req, res){
  const id = parseInt(req.params.id); // obtener el id de la URL
  const pedidos = await pedidosModelo.obtenerPedidos();
  const pedido = pedidos.find(p => p.id === id);

  if (!pedido) {
    return res.status(404).send('Pedido no encontrado');
  }

  res.render('asignar_pedido', { titulo: 'Asignar Pedido', pedido });
}

function formularioNuevoPedido(req, res) {
  res.render('nuevo_pedido', { titulo: 'Nuevo Pedido' });
}

async function guardarPedido(req, res) {
  
  const { cliente, pedido, cantidad, tipo, } = req.body;
  const estado = "En preparación"
  const asignacion = "Ninguno"
  if (!cliente || !pedido || !cantidad || !tipo ) return res.status(400).send('Cliente, pedido, cantidad y tipo son requeridos');
  await pedidosModelo.agregarPedido(cliente, pedido, cantidad, tipo, estado, asignacion);
  res.redirect('/pedidos/');
}

async function eliminarPedidos(req, res) {
  const id = parseInt(req.params.id);
  await pedidosModelo.eliminarPedidoPorId(id);
  res.redirect('/pedidos/');
}

async function cambiarEstadoPedido(req, res) {
  const id = parseInt(req.params.id);
  const { estado } = req.body;

  if (!estado) return res.status(400).send('El estado es requerido');
  await pedidosModelo.ModificarEstado(id, estado);
  res.redirect('/pedidos/')
}

async function AsignarPedido(req, res){
  const id = parseInt(req.params.id);
  const { asignacion } = req.body;

  if (!asignacion) return res.status(400).send('La asignación es requerido');
  await pedidosModelo.cambiarAsignaciónDePedido(id, asignacion);
  res.redirect('/pedidos/')
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

const pedidosController = { mostrarPedidos, formularioNuevoPedido, guardarPedido, eliminarPedidos, modificarPedidos, mostrarEstadoPedido, cambiarEstadoPedido, AsignarPedido, mostrarAsignacionPedidos };
export default pedidosController;