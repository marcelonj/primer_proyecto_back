// scripts/migratePlatos.js
import mongoose from 'mongoose';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import Plato from '../models/mongo/platoSchema.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';

async function run() {
    try {
        console.log('Conectando a MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado ✅');

        console.log('Leyendo data/platos.json...');
        const raw = await fs.readFile('./data/platos.json', 'utf-8');
        const platos = JSON.parse(raw);

        console.log(`Platos leídos: ${platos.length}`);

        // Opcional: limpiar colección antes de migrar
        await Plato.deleteMany({});
        console.log('Colección platos limpiada');

        await Plato.insertMany(platos);
        console.log('Platos migrados a Mongo ✅');

        await mongoose.disconnect();
        console.log('Desconectado');
    } catch (err) {
        console.error('Error en la migración:', err);
        process.exit(1);
    }
}

run();
