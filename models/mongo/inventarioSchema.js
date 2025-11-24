import mongoose from 'mongoose';

const inventarioSchema = new mongoose.Schema({
    material: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
});

// Virtual para mantener compatibilidad con 'id' si es necesario, 
// aunque lo ideal es migrar a _id
inventarioSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

inventarioSchema.set('toJSON', {
    virtuals: true
});

const Inventario = mongoose.model('Inventario', inventarioSchema);

export default Inventario;
