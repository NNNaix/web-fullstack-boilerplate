import { Express } from 'express';
import ejs from 'ejs';
import { resolve } from 'path';
import { ServerSection } from '@server/typings';

export default function useViewEngine(app: Express) {
    const rootPath = app.get('rootPath');
    const { staticRootPath }: ServerSection = app.get('serverSection');

    app.set('view engine', 'html');
    app.set('views', resolve(rootPath, staticRootPath));
    ejs.delimiter = '$';
    app.engine('html', ejs.renderFile);
}
