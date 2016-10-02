import Autoprefixer from 'autoprefixer';
import EslintFormatter from 'eslint-friendly-formatter';
import HtmlPlugin from 'html-webpack-plugin';
import TextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { paths } from '../paths';

export function generateCommonConfig (environment) {
    return {
        debug: Object.is(environment, 'development'),
        devServer: {
            hot: true,
            inline: true,
            colors: true,
            watchPoll: true,
            contentBase: paths.build,
            displayErrorDetails: true,
            displayReasons: true,
            watchOptions: {
                ignored: /node_modules/,
                aggregateTimeout: 500,
                poll: 1000
            },
            noInfo: true,
            stats: 'errors-only'
        },
        entry: [
            paths.appJS
        ],
        output: {
            path: paths.build,
            filename: 'assets/js/[name].bundle.js'
        },
        resolve: {
            extensions: [ '', '.js', '.scss', '.pug' ],
            alias: {
                assets: paths.assets
            }
        },
        module: {
            loaders: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                },
                {
                    test: /\.css$/,
                    loader: TextPlugin.extract('style', 'css!postcss-loader!resolve-url')
                },
                {
                    test: /\.s(a|c)ss$/,
                    loader: TextPlugin.extract('style', 'css!postcss-loader!resolve-url!sass?sourceMap')
                },
                {
                    test: /\.pug/,
                    loader: 'pug-html-loader'
                },
                {
                    test: /\.(otf|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                    loader: `file?name=assets/static/[ext]/[name].[ext]`
                },
                {
                    test: /\.json/,
                    loader: 'json'
                }
            ]
        },
        'eslint': {
            formatter: EslintFormatter,
            quiet: false
        },
        'postcss': [
            Autoprefixer({
                browsers: [
                    'last 3 versions',
                    'iOS >= 7',
                    'Android >= 4',
                    'Explorer >= 10',
                    'ExplorerMobile >= 11'
                ],
                cascade: false
            })
        ],
        sassLoader: {
            includePaths: [ paths.appCSS ]
        },
        plugins: [
            new ProgressBarPlugin(),
            new HtmlPlugin({
                title: 'Evolution Gaming',
                filename: 'index.html',
                template: paths.indexHTML
            }),
            new TextPlugin('assets/css/[name].bundle.css', { allChunks: true, disable: Object.is(environment, 'development') })
        ]
    };
}
