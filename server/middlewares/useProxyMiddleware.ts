import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ProxySection } from '@server/typings';

export default function useProxy(app: Express) {
    const proxySection = app.get('proxySection') as ProxySection;

    if (proxySection.enable) {
        app.use(
            proxySection.context,
            createProxyMiddleware({
                target: proxySection.target,
                changeOrigin: proxySection.changeOrigin,
                // https://github.com/chimurai/http-proxy-middleware/issues/320
                onProxyReq: function onProxyReq(proxyReq, req) {
                    if (!req.body || !Object.keys(req.body).length) {
                        return;
                    }

                    const contentType = proxyReq.getHeader('Content-Type') as string;
                    const writeBody = (stringifiedBody: string) => {
                        proxyReq.setHeader('Content-Length', Buffer.byteLength(stringifiedBody));
                        proxyReq.write(stringifiedBody);
                    };

                    const reg = new RegExp('application/json');
                    if (reg.test(contentType)) {
                        writeBody(JSON.stringify(req.body));
                    }
                },
            }),
        );
    }
}
