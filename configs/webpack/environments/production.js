import webpack from 'webpack';
import { generateCommonConfig } from '../webpack.utils';

export default function prodConfig (environment) {
    const commonConfig = generateCommonConfig(environment);

    return {
        ...commonConfig,
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(true),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(environment)
                }
            }),
            ...commonConfig.plugins,
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ]
    };
};
