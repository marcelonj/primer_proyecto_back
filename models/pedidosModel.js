
import mongoose from "mongoose";

const pedidosSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  pedido: { type: String, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, required: true },
  estado: { type: String, default: "En preparación" },
  asignacion: { type: String, default: "Ninguno" },
}, { timestamps: true });

const Pedido = mongoose.model("Pedido", pedidosSchema);


// Obtener todos los pedidos
async function obtenerPedidos() {
  return await Pedido.find().sort({ createdAt: -1 });
}

// Agregar pedido nuevo
async function agregarPedido(cliente, pedido, cantidad, tipo, estado, asignacion) {
  await Pedido.create({ cliente, pedido, cantidad, tipo, estado, asignacion });
}

// Eliminar por ID
async function eliminarPedidoPorId(id) {
  await Pedido.findByIdAndDelete(id);
}

// Cambiar estado
async function ModificarEstado(id, estado) {
  const result = await Pedido.findByIdAndUpdate(id, { estado });
  if (!result) throw new Error("Pedido no encontrado");
  return true;
}

// Cambiar asignación
async function cambiarAsignaciónDePedido(id, asignacion) {
  const result = await Pedido.findByIdAndUpdate(id, { asignacion });
  if (!result) throw new Error("Pedido no encontrado");
  return true;
}


async function modificarPedidoPorId(id, cliente, pedido, cantidad, tipo) {
  const result = await Pedido.findByIdAndUpdate(
    id,
    { cliente, pedido, cantidad, tipo },
    { new: true }
  );

  if (!result) throw new Error("El pedido con el ID especificado no fue encontrado.");
  return true;
}


export default {
  obtenerPedidos,
  agregarPedido,
  eliminarPedidoPorId,
  modificarPedidoPorId,
  ModificarEstado,
  cambiarAsignaciónDePedido,
};