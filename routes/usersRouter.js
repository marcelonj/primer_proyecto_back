import bcrypt from 'bcrypt';
import express from 'express';
const usersRouter = express.Router();
import User from '../models/user.js';

usersRouter.post('/', async (request, response) => {
    const body = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
        rol: body.rol,
        area: body.area
    });

    const savedUser = await user.save();
    response.json(savedUser);
});

export default usersRouter;