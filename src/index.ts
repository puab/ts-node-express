import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import authRoutes from './modules/routes/auth';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => res.send('Hello world!'));

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
