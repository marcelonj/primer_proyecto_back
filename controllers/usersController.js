import bcrypt from 'bcrypt';
import userModel from "../models/userModel.js";

async function registrarUsuario(req, res) {
    const body = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new userModel.User({
        username: body.usuario,
        name: body.nombre,
        passwordHash,
        rol: body.rol,
        area: body.area
    });
    
    await user.save();
    res.status(201).send("Usuario registrado correctamente");
}

async function mostrarFormularioNuevoUsuario(req, res) {
    res.render('nuevo_usuario', { titulo: 'Nuevo Usuario' });
}

const usersController = {registrarUsuario, mostrarFormularioNuevoUsuario}
export default usersController;