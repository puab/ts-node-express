import { Request, Response, NextFunction } from 'express';
import { appDataSource } from '../../data/data-source';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Generate a random token
export const generateToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare password with hash
export const comparePassword = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

// Authentication middleware
export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: No token provided',
            });
            return;
        }

        const token = authHeader.split(' ')[1];

        // Find user with this token
        const user = await appDataSource.user.findFirst({
            where: {
                token: token,
            },
        });

        if (!user) {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: Invalid token',
            });
            return;
        }

        // Add user info to request object
        req.user = {
            id: +user.id,
            email: user.email,
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};

// Declare module augmentation for Express Request
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
            };
        }
    }
}
