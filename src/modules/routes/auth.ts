import { Router } from 'express';
import { z } from 'zod';
import { routeBody } from '../utilities/route-util';
import { comparePassword, generateToken } from '../utilities/auth-util';
import { appDataSource } from '../../data/data-source';

const router = Router();

const loginSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().optional(),
    token: z.string().optional(),
});

// POST /auth/login
router.post('/login', async (req, res) => {
    await routeBody(res, async () => {
        const { email, password, token } = loginSchema.parse(req.body);

        if (token) {
            // Find user by token
            const user = await appDataSource.user.findFirst({
                where: {
                    token: token,
                },
            });

            if (user) {
                return {
                    success: true,
                    data: {
                        token: user.token,
                        user: {
                            id: user.id,
                            email: user.email,
                        },
                    },
                };
            }
        }

        // Find user by email
        const user = await appDataSource.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user || !password) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await comparePassword(
            password,
            user.passwordHash
        );

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate token and update user
        const generatedToken = generateToken();

        await appDataSource.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: generatedToken,
            },
        });

        return {
            success: true,
            data: {
                token: generatedToken,
                user: {
                    id: user.id,
                    email: user.email,
                },
            },
        };
    });
});

// POST /auth/logout
router.post('/logout', async (req, res) => {
    await routeBody(res, async () => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return { success: true };
        }

        const token = authHeader.split(' ')[1];

        // Find user with this token and clear it
        await appDataSource.user.updateMany({
            where: {
                token: token,
            },
            data: {
                token: null,
            },
        });

        return { success: true };
    });
});

export default router;
