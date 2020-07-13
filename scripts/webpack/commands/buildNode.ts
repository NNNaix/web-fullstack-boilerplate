import webpack from 'webpack';
import prodConfig from '../configs/node/webpack.prod';

const compiler = webpack(prodConfig);

compiler.run((error) => {
    if (error) {
        console.error(error);
    }
});
