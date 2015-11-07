var webpack = require('webpack');
var path = require('path');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    entry: {
        todo_app: './src/app_todo.js',
        //test_app: './src/app2_todo.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: "http://localhost:8080/",
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            //loader: 'babel-loader!react-hot!jsx-loader'
            exclude: /node_modules/,
            query: {
                // https://github.com/babel/babel-loader#options
                cacheDirectory: true,
                presets: ['react', 'es2015']
            }
        }]
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules") //草，当前目录自己都找不到。。
    },
    //devtool: "#source-map",
    devtool: "#eval",
    plugins: [
        //commonsPlugin,
        //new webpack.optimize.UglifyJsPlugin(),
        //new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("development")
        }),
    ]
};

