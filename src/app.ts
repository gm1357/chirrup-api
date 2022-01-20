import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Hello World!'
    });
})

app.listen(3333);