import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Inventario from '../models/mongo/inventarioSchema.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '../data/inventario.json');

const migrate = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO);
        console.log('Connected to MongoDB');

        const data = await readFile(jsonPath, 'utf-8');
        const items = JSON.parse(data);

        console.log(`Found ${items.length} items to migrate.`);

        for (const item of items) {
            const exists = await Inventario.findOne({ material: item.material });
            if (!exists) {
                await Inventario.create({
                    material: item.material,
                    stock: parseInt(item.stock)
                });
                console.log(`Migrated: ${item.material}`);
            } else {
                console.log(`Skipped (already exists): ${item.material}`);
            }
        }

        console.log('Migration completed.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrate();
