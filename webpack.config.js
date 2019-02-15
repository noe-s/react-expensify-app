//entry --> output
//https://webpack.js.org/concepts/
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');//for separate css

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
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
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader:'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        //if production: use source-map (slower external file), else use cheap source-map (big bundle tho quick)
        devtool: isProduction ? 'source-map' : 'inline-source-map', 
        devServer: {
            contentBase: path.join(__dirname,'public'),
            historyApiFallback: true //handle routing through client side code
        }
    };
};


//loader