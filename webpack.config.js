const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const port = process.env.port || 2000;

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    performance: {
        assetFilter(assetFilename) {
            return assetFilename.endsWith('.js');
        },
        maxAssetSize: 1024 * 1024,
        maxEntrypointSize: 1024 * 1024,
    },

    mode: 'development',
    devtool: false,
    devServer: {
        port,
        hot: true,
        open: {
            app: {
                name: 'google-chrome',
            },
        },
        historyApiFallback: true,
        compress: true,
        static: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', path.resolve(__dirname, 'public')],
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules | bower_components )/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [],
                    },
                },
            },

            {
                test: /\.(s(a|c)ss|css)?$/,
                use: [CssPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(html|htm)?$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                },
            },

            {
                test: /\.(jpg|png|gif|eot|woff|ttf|woff2|jpeg|svg|mp4|pdf)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlPlugin({
            template: './public/index.html',
        }),

        new CssPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new EslintPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
