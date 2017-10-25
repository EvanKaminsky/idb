const webpack = require('webpack');

module.exports = {
    entry: ["./frontend/js/app.js"],

    output: {
        path: __dirname + '/frontend/static',
        filename: "bundle.js"
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {presets: ['es2015', 'react']},
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'image-webpack-loader',
                'file-loader?name=/public/[name].[ext]'
            ]
        }]
    }
};


