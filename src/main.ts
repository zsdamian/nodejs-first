import express, {Express, NextFunction, Request, Response} from "express";
import {BOOKS} from "./storage/books";

export const app: Express = express();

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    console.log(`${datetime} - ${req.path}`);
    next();
});

app.get('/', (req: Request, res: Response) => res.send(`
    Whats up? <img src="https://i.pinimg.com/originals/52/fc/a7/52fca7f412c3628e890eb3afe8d5812e.gif"/>
`));

app.get('/healthcheck', (req: Request, res: Response) => res.send('Alive'));

app.get('/books/:id', (req: Request, res: Response) => {
    res.json(BOOKS.find(element => element.id === Number(req.params.id)));
});
app.get('/books', (req: Request, res: Response) => {
    res.json(BOOKS);
});
app.post('/books', (req: Request, res: Response) => {
    BOOKS.push(req.body);
    res.sendStatus(201);
});
app.put('/books/:id', (req: Request, res: Response) => {
    const idx = BOOKS.findIndex(element => element.id === Number(req.params.id));
    BOOKS.splice(idx, 1, req.body);
    res.sendStatus(202);
});
app.delete('/books/:id', (req: Request, res: Response) => {
    const idx = BOOKS.findIndex(element => element.id === Number(req.params.id));
    BOOKS.splice(idx, 1);
    res.sendStatus(202);
});