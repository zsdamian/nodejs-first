import express, {Express, Request, Response} from "express";
import {BOOKS} from "./storage/books";

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());

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
    res.sendStatus(201);
});

app.listen(PORT, () => {
    console.log(`STARTED ON PORT ${PORT}`);
});