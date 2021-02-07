import {NextFunction, Request, Response} from "express";

export const logger = (req: Request, res: Response, next: NextFunction): void => {
    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    console.log(`${datetime} - ${req.path} [${req.method}] - ${req.ip}`);
    next();
};