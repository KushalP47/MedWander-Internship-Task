import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: process.env.POSTGRES_PORT,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE_NAME,
    ssl: {
        rejectUnauthorized: false // Note: Setting this to false can create security vulnerabilities in production
    }
});

client.connect()
.then(() => console.log('Connected to the database'))
.catch((err) => console.error('Connection error', err.stack));

export default client;