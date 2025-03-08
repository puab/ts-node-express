import { Request, Response } from 'express';
import { z } from 'zod';

// Helper function to handle route execution and error handling
export const routeBody = async (res: Response, handler: () => Promise<any>) => {
    try {
        const result = await handler();
        res.json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            });
            return;
        }
        if (error instanceof Error) {
            res.status(404).json({ success: false, error: error.message });
            return;
        }
        console.error('Error in route handler:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
};
