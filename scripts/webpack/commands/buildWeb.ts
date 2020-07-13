import webpack from 'webpack';
import { argv } from 'yargs';
import prodConfig from '../configs/web/webpack.prod';

const compiler = webpack(prodConfig);
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
