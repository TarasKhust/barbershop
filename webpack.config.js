let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let glob = require('glob-all');
let PurifyCSSPlugin = require('purifycss-webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

let SRC_DIR = path.resolve(__dirname,'src');
let DIST_DIR = path.resolve(__dirname, 'dist');
let ASSET_PATH = process.env.ASSET_PATH || '';

let conf = {
    entry: {
        app: SRC_DIR + '/app.js',
        // contact: './src/contact.js',
    },
    output: {
        path: DIST_DIR,
        filename: '[name].bundle.js',
        publicPath: ASSET_PATH
    },
    resolve: {
        modules: [SRC_DIR, "node_modules"],
        extensions: ['.js', '.css', '.scss']
    },
    devServer: {
        overlay: true,
        // contentBase: 'dist'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jade$/,
                use: 'jade-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: '/node_modules/'
            },
            {   test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    // publicPath: '../'
                })
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    // publicPath: '../'
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader','stylus-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    // 'file-loader?name=[name].[ext]&outputPath=../images/&publicPath=.images/',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(svg)$/,
                use: 'file-loader?name=images/icons/[name].[ext]'
            },
            {
                test: /\.(woff2?|ttf|eot|otf)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
        ]
    },
    node: {
        console: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Index',
            template: './src/pug/pages/index.pug',
            hash: true,
            // excludeChunks: ['contact'],
            // minify: {
            //     collapseWhitespace: true
            // },
        }),

        new HtmlWebpackPlugin({
            title: 'Catalog',
            template: './src/pug/pages/catalog.pug',
            hash: true,
            filename: 'catalog.html',
            // chunks: ['contact'],
            // minify: {
            //     collapseWhitespace: true },
        }),
        new HtmlWebpackPlugin({
            title: 'Catalog',
            template: './src/pug/pages/catalog-item.pug',
            hash: true,
            filename: 'catalog-item.html',
            // chunks: ['contact'],
            // minify: {
            //     collapseWhitespace: true },
        }),
        new HtmlWebpackPlugin({
            title: 'Catalog',
            template: './src/pug/pages/price.pug',
            hash: true,
            filename: 'price.html',
            // chunks: ['contact'],
            // minify: {
            //     collapseWhitespace: true },
        }),
        //
        // new HtmlWebpackPlugin({
        //     title: 'Form',
        //     template: './src/pug/pages/form.pug',
        //     hash: true,
        //     // chunks: ['contact'],
        //     filename: 'form.html',
        // }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new ExtractTextPlugin({
            filename: 'css/styles.css',
            disable: false,
            allChunks: true
        }),

        new PurifyCSSPlugin({
            // paths: glob.sync(path.join(__dirname, 'src/*.pug')),
            paths: glob.sync([
                path.join(__dirname, 'src/pug/**/*.pug'),
                // path.join(__dirname, 'src/assets/pug/modules/*.pug'),
                // path.join(__dirname, 'src/assets/pug/pages/*.pug'),
                path.join(__dirname, 'src/assets/js/*.js')
            ]),
            purifyOptions: { info: true, minify: false }
        }),
        ],
};

    module.exports = (env, options) => {
        let production = options.mode === 'production';

        conf.devtool = production
                        ? 'source-map'
                        : 'evel-sourcemap';

        return conf;
    };