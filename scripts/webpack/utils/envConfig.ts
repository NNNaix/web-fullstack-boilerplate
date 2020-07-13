import { resolve } from 'path';
import { ServerSection } from '@server/typings';

const { NODE_ENV } = process.env;

export const inDev = NODE_ENV !== 'production';

export const rootPath = resolve(__dirname, '../../../');

export const hmrPath = '/__webpack_hmr';

export const copyright = '/** Copyright©2020 React Pro Boilerplate. All rights reserved. */';

const protocol = 'http';
const httpPort = 3000;
const domain = 'localhost';
const appSubUrl = '';

export const devServerSection: ServerSection = {
    protocol,
    httpAddr: '',
    httpPort,
    domain,
    rootUrl: `${protocol}://${domain}:${httpPort}/${appSubUrl}`,
    appSubUrl: '',
    staticRootPath: 'dist',
    enableGzip: false,
    certFile: '',
    certKey: '',
    ca: '',
};
