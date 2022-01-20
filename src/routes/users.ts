import { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../errors/appError';

const prisma = new PrismaClient;

const usersRoutes = Router();

usersRoutes.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
});

usersRoutes.post('/', async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    const user = await prisma.user.create({
        data: { email, username, password }
    });
    return res.status(201).json(user);
});

usersRoutes.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
        where: { id: parseInt(id) }
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return res.status(200).json(user);
});

usersRoutes.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, username, password } = req.body;

    const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { email, username, password }
    });
    return res.status(200).json(user);
});

usersRoutes.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.user.delete({
        where: { id: parseInt(id) }
    });
    return res.status(204).send();
});

export { usersRoutes }