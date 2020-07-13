import { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export default function useRequestParser(app: Express) {
    // cookie & session
    app.use(cookieParser());
    app.use(bodyParser.json());
}
