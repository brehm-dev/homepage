const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
module.exports = {
    mode: "development",
    entry: "./app/js/entry.js",
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.js",
        // publicPath: "/build/"
    },
    target: "web",
    node: {
        global: true
    },
    // watch: true,
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        filename: "./app/js/entry.js",
        hotOnly: true,
        compress: true,
        port: 9999
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader'
                }
            },
            {
                test: /\.twig$/,
                use: [
                    {
                        loader: "twig-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].css"
                        }
                    },
                    {
                        loader: "extract-loader",
                        options: {
                            publicPath: "../"
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outFile: "build/[name].css"
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                ],
            },

        ]
    },
    resolve: {
        alias: {
            images: path.resolve(__dirname, "assets/images"),
            fonts: path.resolve(__dirname, "assets/font"),
            app: path.resolve(__dirname, "app"),
        }
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'andreas.brehm.local',
            port: 8888,
            proxy: 'http://andreas.brehm.local/',
            codeSync: true,
            files: ['./*'],
            injectChanges: true,
            open: false,
            notify: false
        })
    ]
};

