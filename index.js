import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import academyRoutes from './routes/academyRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

dotenv.config();
try {
    await db.authenticate();
    db.sync()
    console.log(`Conexión a la base de datos exitosa 🍕🍕🍕🍕🍕`);
} catch (error) {
    console.log(error)
}

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

//Routing
app.use('/api', academyRoutes);
app.use('/api', imageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
    }
);
