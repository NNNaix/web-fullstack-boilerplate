import { static as serverStatic, Express } from 'express';
import { ServerSection } from '@server/typings';
import { resolve } from 'path';

// static
export default function useStatic(app: Express) {
    const { staticRootPath }: ServerSection = app.get('serverSection');
    const rootPath = app.get('rootPath');
    app.use(
        serverStatic(resolve(rootPath, staticRootPath), {
            index: false,
        }),
    );
}
