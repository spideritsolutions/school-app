import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthenticated" });
        }

        const userRole = req.user.role.toUpperCase();
        const upperAllowedRoles = allowedRoles.map(role => role.toUpperCase());

        if (upperAllowedRoles.includes(userRole)) {
            return next();
        }

        return res.status(403).json({ 
            message: `Access denied. Requires one of: ${allowedRoles.join(', ')}` 
        });
    };
};