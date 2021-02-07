import express, {Application, Express, NextFunction, Request, Response} from "express";
import {BooksRepository} from "./types/bookRepository";
import {HTTP} from "./consts";
import {logger} from "./middleware/logger";

export const createApp = (booksRepository: BooksRepository): Application => {
    const app: Express = express();

    app.use(express.json());
    app.use(logger);

    app.get('/', (req: Request, res: Response) => res.send(`
    Whats up? <img src="https://i.pinimg.com/originals/52/fc/a7/52fca7f412c3628e890eb3afe8d5812e.gif"/>
`));

    app.get('/healthcheck', (req: Request, res: Response) => res.send('Alive'));

    app.get('/books/:id', async (req: Request, res: Response) => {
        const book = await booksRepository.getById(Number(req.params.id));
        if(!book){
            res.sendStatus(HTTP.NOT_FOUND);
            return;
        }
        res.json(book);
    });
    app.get('/books', async (req: Request, res: Response) => {
        const books = await booksRepository.getAll();
        res.json(books);
    });
    app.post('/books', async (req: Request, res: Response) => {
        const book = await booksRepository.add(req.body);
        res.status(HTTP.CREATED);
        res.json(book);
    });
    app.put('/books/:id',async (req: Request, res: Response) => {
        await booksRepository.updateById(Number(req.params.id), req.body);
        res.sendStatus(HTTP.ACCEPTED);
    });
    app.delete('/books/:id', async(req: Request, res: Response) => {
        await booksRepository.deleteById(Number(req.params.id));
        res.sendStatus(HTTP.ACCEPTED);
    });

    return app;
};
