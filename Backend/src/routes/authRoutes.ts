import express from 'express';
import * as authController from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authMiddleware, authController.getProfile);

router.get('/admin-only', 
    authMiddleware, 
    roleMiddleware(['ADMIN', 'MASTER']), 
    (req, res) => {
        res.json({ message: "Welcome! You have access to the administrative dashboard." });
    }
);

export default router;