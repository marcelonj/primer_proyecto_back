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
    }
});

async function recuperarUsuario(usuario) {
    try {
        const user = await User.findOne({ username: usuario });
        return user;
    } catch (error) {
        throw new Error("Usuario no encontrado");
    }
}

const User = mongoose.model('User', userSchema);
const userModel = {User, recuperarUsuario}
export default userModel;