import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { AppError } from './errors/appError';
import { routes } from './routes';
import { Prisma } from '@prisma/client'

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).send({ message: err.message });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res
            .status(400)
            .send({ message: `Prisma error: ${err.code}` });
    }

    return res
        .status(500)
        .send({ message: `Internal server error - ${err.message}` });
});

app.listen(3333);