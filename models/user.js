import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    rol: {
        type: String,
        enum: [
            'administrador',
            'cocinero',
            'repartidor',
            'mozo',
            'encargado de stock'
            ]
    },
    area: {
        type: String,
        enum: [
            'Cocina',
            'Reparto',
            'Salón / Atención al cliente',
            'Control de Inventario',
            'Administración'
            ]
    }
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);
export default User;