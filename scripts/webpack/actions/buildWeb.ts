import webpack from 'webpack';
import { argv } from 'yargs';
import { generateProdConfig } from '../configs/web/webpack.prod';

declare const module: any;

async function buildWeb() {
    const compiler = webpack(await generateProdConfig());
    const ENABLE_ANALYZE = !!argv.analyze;

    compiler.run((error, stats) => {
        if (error) {
            console.error(error);
            return;
        }

        const analyzeStatsOpts = {
            preset: 'normal',
            modules: ENABLE_ANALYZE,
            colors: true,
        };

        console.log(stats.toString(ENABLE_ANALYZE ? analyzeStatsOpts : 'minimal'));
    });
}

buildWeb();
