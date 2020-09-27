import { Request, Response, Express } from 'express';
import { AuthSection, ServerSection } from '@server/typings';
import { menuData } from '@server/utils/consts';
// import { nLogger } from './logs';

export function IndexHOF(app: Express) {
    const { loginCookieName }: AuthSection = app.get('authSection');
    const { appSubUrl: AppSubUrl }: ServerSection = app.get('serverSection');
    const DocTitle = app.get('docTitle');
    return (req: Request, res: Response) => {
        if (!loginCookieName || req.cookies[loginCookieName]) {
            res.render('index', { AppSubUrl, DocTitle, dataLayer: { menu: menuData } });
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
            res.render('index', { AppSubUrl, DocTitle, dataLayer: { menu: menuData } });
        }
    };
}
