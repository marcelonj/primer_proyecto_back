import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import userModel from "../models/userModel.js";

async function login(req, res) {
    const body = req.body;
    const user = body.usuario;
    try{
        const usuario = await userModel.recuperarUsuario(user);
        const passwordCorrect =
            usuario === null
            ? false
            : await bcrypt.compare(body.password, usuario.passwordHash);
    
        if (!(usuario && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid username or password'
            });
        }
        
        const userForToken = {
            username: usuario.username,
            id: usuario.id,
            rol: usuario.rol
        };

        const token = jsonwebtoken.sign(userForToken, process.env.SECRET, { expiresIn: "30m" });
        res.status(200).send(token);
    }
    catch{
        res.status(500).send('Ocurrio un error');
    }
}

const loginController = {login};

export default loginController;