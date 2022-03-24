const CopyWebpackPlugin = require('copy-webpack-plugin');

function babelLoaderOptions() {
    return {
        babelrc: false,
        configFile: false,
        cacheDirectory: true,
        presets:[
            '@babel/preset-react', '@babel/preset-env'
        ]
    };
}

module.exports = {
    devServer: {
        compress: true,
        port: 9042,
        historyApiFallback: {
            index: 'index.html'
        },
    },
    module: {
        rules: [
            {
                test: /\.(jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'file-loader'
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelLoaderOptions()
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            poolRespawn: false,
                            name: 'js-pool'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'css', to: 'css' },
                { from: 'fonts', to: 'fonts' },
                { from: 'img', to: 'img' },
                { from: 'index.html', to: 'index.html' },
                { from: 'game.html', to: 'game.html' },
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
};