import express, { Express, Request, Response, NextFunction } from 'express';
import { IndexHOF, NoMatchHOF } from '@server/utils/auth';
import { ServerSection } from '@server/typings';
import { menuData } from '@server/utils/consts';

export default function useRouter(app: Express) {
    const router = express.Router();

    const Index = IndexHOF(app);
    const NoMatch = NoMatchHOF(app);

    router.get('/', Index);
    router.get('*', NoMatch);

    // error handle
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        let status = err.status || err.code;
        status = status < 0 ? 500 : status;

        const { appSubUrl: AppSubUrl }: ServerSection = app.get('serverSection');

        const message = err.result || err.name || err.message;
        // 后缀格式指定
        const suffix = /(\.jpg|\.gif|\.jpeg|\.png|\.js|\.css|\.ico|\.html)$/g;

        if (!suffix.test(req.path)) {
            res.status(status).render('index', {
                error: { status, message },
                AppSubUrl,
                DocTitle: app.get('docTitle'),
                dataLayer: { menu: menuData },
            });
        } else {
            next();
        }
    });

    app.use(router);
}
