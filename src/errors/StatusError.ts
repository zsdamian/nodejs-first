import { Request, Response, NextFunction } from 'express';
import {HTTP} from "../consts";

export class StatusError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    }
}

export class BookNotFoundError extends Error {
    status: number;
    constructor(id: number ) {
        super();
        this.name = 'BOOK_NOT_FOUND';
        this.message = `There is no book with id: ${id}`;
        this.status = HTTP.NOT_FOUND;
    }
}

export class InvalidBookException extends Error {
    status: number;
    constructor() {
        super();
        this.name = 'INVALID_BOOK';
        this.message = `Invalid book object!`;
        this.status = HTTP.BAD_REQUEST;
    }
}

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const err = new StatusError('Not Found', 404);
    next(err);
};

export const serverErrorHandler = (
    err: StatusError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //do not show stack traces for errors in CI environment
    !process.env.IN_CI && console.error(err.stack);
    res.status(err.status || 500);
    res.json({ message: err.message, error: err.stack });
};
