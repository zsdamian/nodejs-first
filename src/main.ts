import express, {Application, Express, NextFunction, Request, Response} from "express";
import {BooksRepository} from "./types/bookRepository";
import {HTTP} from "./consts";
import {logger} from "./middleware/logger";
import {
    BookNotFoundError,
    InvalidBookException,
    notFoundHandler,
    serverErrorHandler
} from "./errors/StatusError";
import 'express-async-errors';
import Joi from 'joi';

const bookSchema = Joi.object({
    authors: Joi.array().min(1).required(),
    title: Joi.string().required(),
    id: Joi.number().required(),
});

export const createApp = (booksRepository: BooksRepository): Application => {
    const app: Express = express();

    app.use(express.json());
    app.use(logger);

    app.get('/', (req: Request, res: Response) => res.send(`
    Whats up? <img src="https://i.pinimg.com/originals/52/fc/a7/52fca7f412c3628e890eb3afe8d5812e.gif"/>
`));

    app.get('/healthcheck', (req: Request, res: Response) => res.send('Alive'));

    app.get('/books/:id', async (req: Request, res: Response, next: NextFunction) => {
        const id: number = Number(req.params.id);
        const book = await booksRepository.getById(id);
        if(!book){
            throw new BookNotFoundError(id);
        }
        res.json(book);
    });
    app.get('/books', async (req: Request, res: Response) => {
        const books = await booksRepository.getAll();
        res.json(books);
    });
    app.post('/books', async (req: Request, res: Response) => {
        const requestData = req.body;

        try{
            await bookSchema.validateAsync(requestData);
        }catch (error){
            throw new InvalidBookException();
        }

        const book = await booksRepository.add(requestData);

        res.status(HTTP.CREATED).json(book);
    });
    app.put('/books/:id',async (req: Request, res: Response) => {
        const requestData = req.body;

        try{
            await bookSchema.validateAsync(requestData);
        }catch (error){
            throw new InvalidBookException();
        }

        const id: number = Number(req.params.id);
        const edited: boolean = await booksRepository.updateById(id, requestData);
        if(!edited){
            throw new BookNotFoundError(id);
        }
        res.sendStatus(HTTP.ACCEPTED);
    });
    app.delete('/books/:id', async(req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        const deleted: boolean = await booksRepository.deleteById(id);
        if(!deleted){
            throw new BookNotFoundError(id);
        }
        res.sendStatus(HTTP.ACCEPTED);
    });

    app.use(notFoundHandler);
    app.use(serverErrorHandler);

    return app;
};
