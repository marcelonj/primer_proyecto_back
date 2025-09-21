import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/pedidos.json');

async function obtenerPedidos() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function guardarPedidos(pedidos) {
	await writeFile(filePath, JSON.stringify(pedidos, null, 2));
}

async function agregarPedido(cliente, pedido, cantidad) {
  const pedidos = await obtenerPedidos();
  const nuevoPedido = {
    id: pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1,
    cliente,
    pedido,
    cantidad
  };
  pedidos.push(nuevoPedido);
  await guardarPedidos(pedidos);
}

async function eliminarPedidoPorId(id) {
  const pedidos = await obtenerPedidos();
  const actualizados = pedidos.filter(e => e.id !== id);
  await guardarPedidos(actualizados);
}

async function modificarPedidoPorId(id, cliente, pedido, cantidad) {
  const pedidos = await obtenerPedidos();
  const pedidoEncontrado = pedidos.find(p => p.id === id);
  if (!pedidoEncontrado) {
    throw new Error('El pedido con el ID especificado no fue encontrado.');
  }
  pedidoEncontrado.cliente = cliente;
  pedidoEncontrado.pedido = pedido;
  pedidoEncontrado.cantidad = cantidad;
  guardarPedidos(pedidos)
  return true
}

// Exportar todas las funciones como un objeto
const pedidosModelo = { obtenerPedidos, agregarPedido, eliminarPedidoPorId, modificarPedidoPorId };
export default pedidosModelo;