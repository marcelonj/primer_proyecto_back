// controllers/pedidosController.js
import pedidosModelo from "../models/pedidosModel.js";
import platosModelo from '../models/platosModel.js';
import inventarioModelo from '../models/inventarioModel.js';

async function mostrarPedidos(req, res) {
  const pedidos = await pedidosModelo.obtenerPedidos();
  res.render("pedidos", { titulo: "Lista de Pedidos", pedidos });
}

async function mostrarEstadoPedido(req, res) {
  const id = req.params.id;
  const pedidos = await pedidosModelo.obtenerPedidos();
  const pedido = pedidos.find(p => p._id.toString() === id);
  if (!pedido) return res.status(404).send("Pedido no encontrado");
  res.render("estado_pedido", { titulo: "Estado del Pedido", pedido });
}

async function mostrarAsignacionPedidos(req, res) {
  const id = req.params.id;
  const pedidos = await pedidosModelo.obtenerPedidos();
  const pedido = pedidos.find(p => p._id.toString() === id);
  if (!pedido) return res.status(404).send("Pedido no encontrado");
  res.render("asignar_pedido", { titulo: "Asignar Pedido", pedido });
}

function formularioNuevoPedido(req, res) {
  res.render('nuevo_pedido', { titulo: 'Nuevo Pedido' });
}

async function guardarPedido(req, res) {
  const { cliente, pedido, cantidad, tipo } = req.body;
  const cantidadNum = parseInt(cantidad);

  const estado = "En preparación";
  const asignacion = "Ninguno";

  if (!cliente || !pedido || !cantidad || !tipo)
    return res.status(400).send("Cliente, pedido, cantidad y tipo son requeridos");


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

  await pedidosModelo.agregarPedido(cliente, pedido, cantidadNum, tipo, estado, asignacion);
  res.redirect("/pedidos/");
}

async function eliminarPedidos(req, res) {
  const id = req.params.id;
  await pedidosModelo.eliminarPedidoPorId(id);
  res.redirect("/pedidos/");
}

async function cambiarEstadoPedido(req, res) {
  const id = req.params.id;
  const { estado } = req.body;
  if (!estado) return res.status(400).send("El estado es requerido");
  await pedidosModelo.ModificarEstado(id, estado);
  res.redirect("/pedidos/");
}

async function AsignarPedido(req, res) {
  const id = req.params.id;
  const { asignacion } = req.body;
  if (!asignacion) return res.status(400).send("La asignación es requerida");
  await pedidosModelo.cambiarAsignaciónDePedido(id, asignacion);
  res.redirect("/pedidos/");
}


async function modificarPedidos(req, res) {
  const id = req.params.id;
  const { cliente, pedido, cantidad, tipo } = req.body;

  if (!id) return res.status(400).send("El ID es un campo requerido.");

  try {
    await pedidosModelo.modificarPedidoPorId(id, cliente, pedido, parseInt(cantidad), tipo);
    res.redirect("/pedidos/");
  } catch (error) {
    if (error.message.includes("no fue encontrado"))
      return res.status(404).send(error.message);

    res.status(500).send("Ocurrió un error inesperado al modificar el pedido.");
  }
}


async function formularioModificarPedido(req, res) {
  const id = req.params.id;

  const pedidos = await pedidosModelo.obtenerPedidos();
  const pedido = pedidos.find(p => p._id.toString() === id);

  if (!pedido) return res.status(404).send("Pedido no encontrado");

  res.render("modificar_pedido", { titulo: "Modificar Pedido", pedido });
}


export default {
  mostrarPedidos,
  formularioNuevoPedido,
  guardarPedido,
  eliminarPedidos,
  modificarPedidos,
  mostrarEstadoPedido,
  cambiarEstadoPedido,
  AsignarPedido,
  mostrarAsignacionPedidos,
  formularioModificarPedido
};
