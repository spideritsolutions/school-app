import { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

interface IUser extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'MASTER' | 'ADMIN' | 'TEACHER' | 'STUDENT';
}

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;

    console.log("Registration Payload Received:", req.body);

    if (!name || !email || !password || !role) {
        res.status(400).json({ 
            success: false, 
            message: `Missing fields: ${!name ? 'name ' : ''}${!email ? 'email ' : ''}${!password ? 'password ' : ''}${!role ? 'role' : ''}` 
        });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
        `;

        await db.execute<ResultSetHeader>(query, [
            name, 
            email, 
            hashedPassword, 
            role.toUpperCase() 
        ]);

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';

    try {
        const [rows] = await db.execute<IUser[]>(query, [email]);

        if (rows.length === 0) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ success: false, message: "Wrong password" });
            return;
        }

        const userRole = user.role.toUpperCase();

        const token = jwt.sign(
            { id: user.id, role: userRole },
            process.env.JWT_SECRET || 'secretkey',
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                role: userRole,
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProfile = (req: any, res: Response): void => {
    if (!req.user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        success: true,
        user: req.user
    });
};