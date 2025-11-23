import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';

import pedidosRouter from './routes/pedidosRouter.js';
import inventarioRouter from './routes/inventarioRouter.js';
import menuRouter from './routes/menuRouter.js';
import usersRouter from './routes/usersRouter.js';
import loginRouter from './routes/loginRouter.js';
import signoutRouter from './routes/signoutRouter.js'

import authChecker from './middleware/authChecker.js';
import rolChecker from './middleware/rolChecker.js';

import initPassport from './passport/init.js';

dotenv.config();

const app = express();
const url_mongo = process.env.URL_MONGO;
const secret = process.env.SECRET;

// Conexion a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(url_mongo);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); 
    }
};

connectDB();

// Configuración de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({ 
    secret: secret,
    resave: false,               
    saveUninitialized: false     
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

initPassport(passport);

app.use(methodOverride('_method')); // <-- permite DELETE desde formularios
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de vistas (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/login/', loginRouter);
app.use('/', authChecker, menuRouter);
app.use('/pedidos/', pedidosRouter);
app.use('/inventario/', inventarioRouter);
app.use('/users/', rolChecker, usersRouter);
app.use('/signout/', signoutRouter);

// Servidor
app.listen(3000, () => console.log('Servidor en http://localhost:3000/'));


