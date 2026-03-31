import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import db from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/test', (req: Request, res: Response) => {
    res.status(200).send('School Management API is working perfectly!');
});

const startServer = async () => {
    try {
        const connection = await db.getConnection();
        console.log('Database connection verified.');
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error: any) {
        console.error('Failed to start server due to DB error:', error.message);
        process.exit(1);
    }
};

startServer();