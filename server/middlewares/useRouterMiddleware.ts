import express, { Express, Request, Response, NextFunction } from 'express';
import { reqSignedInHOF, IndexHOF, NoMatchHOF } from '@server/utils/auth';
import { ServerSection } from '@server/typings';

export default function useRouter(app: Express) {
    const router = express.Router();

    const reqSignedIn = reqSignedInHOF(app);
    const Index = IndexHOF(app);
    const NoMatch = NoMatchHOF(app);

    router.get('/', reqSignedIn, Index);
    router.get('/doc/project', reqSignedIn, Index);
    router.get('/doc/contract', reqSignedIn, Index);
    router.get('/doc/tool', reqSignedIn, Index);
    router.get('/doc/resource', reqSignedIn, Index);
    router.get('/doc/other', reqSignedIn, Index);
    router.get('/recycle-bin', reqSignedIn, Index);
    router.get('/audit', reqSignedIn, Index);
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
            });
        } else {
            next();
        }
    });

    app.use(router);
}
