import {Book} from "./book";

export type BooksRepository = {
    getAll: () => Promise<Book[]>;
    add: (book: Book) => Promise<Book | undefined>;
    getById: (id: number) => Promise<Book | undefined>;
    updateById: (id: number, data: Book) => Promise<boolean>;
    deleteById: (id: number) => Promise<boolean>;
};
