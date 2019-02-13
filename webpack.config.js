//entry --> output
//https://webpack.js.org/concepts/
const path = require('path');

module.exports = {
    entry: './src/app.js', //file to run
    output:{
        path: path.join(__dirname,'public'),
        filename: 'bundle.js'
    },
    module: {
        rules:[{
            loader: 'babel-loader',
            test: /\.js$/, //run loader on every JS file
            exclude: /node_modules/ //exclude node_modules folder
        }, {
            test: /\.s?css$/,
            use: [ //array of loaders needed
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname,'public'),
        historyApiFallback: true //handle routing through client side code
    }
};

//loader