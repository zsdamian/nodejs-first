import {Book} from "../types/book";
import {BooksRepository} from "../types/bookRepository";


export const createInMemoryBookRepository = (): BooksRepository => {
    const books: Book[] = [
        {
            id: 1,
            authors: ['Jonathan Haidt'],
            title: 'Coddling of the American Mind',
        },
        {
            id: 2,
            authors: ['Dan Heath', 'Chip Heath'],
            title: 'Switch: How to change when change is hard',
        },
        {
            id: 3,
            authors: ['Kathy Sierra'],
            title: 'Badass: Making users awesome'
        },
        {
            id: 4,
            authors: ['Daniel Kahneman'],
            title: 'Thinking fast, thinking slow',
        },
        {
            id: 5,
            authors: ['Caroline Dweck'],
            title: 'Mindset'
        },
        {
            id: 6,
            authors: ['Michael Walker'],
            title: 'Why we sleep?'
        }
    ];

    return {
        getAll(): Promise<Book[]> {
            return Promise.resolve(books);
        }, add(book: Book): Promise<Book | undefined> {
            books.push(book);
            return Promise.resolve(book);
        }, deleteById(id: number): Promise<boolean> {
            const idx = books.findIndex(element => element.id === id);
            books.splice(idx, 1);
            return Promise.resolve(true);
        }, getById(id: number): Promise<Book | undefined> {
            const book = books.find(element => element.id === id);
            return Promise.resolve(book);
        }, updateById(id: number, data: Book): Promise<boolean> {
            const idx = books.findIndex(element => element.id === id);
            books.splice(idx, 1, data);
            return Promise.resolve(true);
        }
    }
};
