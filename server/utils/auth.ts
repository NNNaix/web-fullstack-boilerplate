import { Request, Response, NextFunction, Express } from 'express';
import { AuthSection, ServerSection } from '@server/typings';
// import { nLogger } from './logs';

export function reqSignedInHOF(app: Express) {
    const { loginCookieName, loginUrl }: AuthSection = app.get('authSection');
    const { rootUrl }: ServerSection = app.get('serverSection');

    return (req: Request, res: Response, next: NextFunction) => {
        if (req.cookies[loginCookieName]) {
            next();
        } else if (req.query.ticket) {
            res.cookie(loginCookieName, req.query.ticket, { httpOnly: true, sameSite: 'lax' });
            res.redirect(rootUrl);
            next();
        } else {
            res.redirect(`${loginUrl}?service=${rootUrl}`);
        }
    };
}

export function IndexHOF(app: Express) {
    const { loginCookieName }: AuthSection = app.get('authSection');
    const { appSubUrl: AppSubUrl }: ServerSection = app.get('serverSection');
    const DocTitle = app.get('docTitle');
    return (req: Request, res: Response) => {
        if (req.cookies[loginCookieName]) {
            res.render('index', { AppSubUrl, DocTitle });
        }
    };
}

// TODO
export function NoMatchHOF(app: Express) {
    const { loginCookieName }: AuthSection = app.get('authSection');
    const { appSubUrl: AppSubUrl }: ServerSection = app.get('serverSection');
    const DocTitle = app.get('docTitle');
    return (req: Request, res: Response) => {
        if (req.cookies[loginCookieName]) {
            res.render('index', { AppSubUrl, DocTitle });
        }
    };
}
