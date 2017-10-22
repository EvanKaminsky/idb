var webpack = require('webpack');

module.exports = {
    entry: ["./frontend/js/app.js"],
    output: {
        path: __dirname + '/frontend/static',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            query: {presets: ['es2015', 'react']},
            exclude: /node_modules/
        }]
    },
    plugins: []
};