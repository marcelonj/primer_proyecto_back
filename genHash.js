import bcrypt from 'bcrypt';

const plainPassword = 'lifty123';

const run = async () => {
    const hash = await bcrypt.hash(plainPassword, 10);
    console.log('Contraseña en texto plano:', plainPassword);
    console.log('Hash generado:', hash);
};

run().catch(console.error);
