// models/mongo/platoSchema.js
import mongoose from 'mongoose';

const ingredienteSchema = new mongoose.Schema(
    {
        material: { type: String, required: true }, // nombre del material en inventario
        cantidad: { type: Number, required: true }  // cuánto descuenta del stock
    },
    { _id: false }
);

const platoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true, unique: true },
        descripcion: { type: String },
        ingredientes: [ingredienteSchema]
    },
    {
        timestamps: true
    }
);

// colección "platos"
const Plato = mongoose.model('Plato', platoSchema, 'platos');

export default Plato;
