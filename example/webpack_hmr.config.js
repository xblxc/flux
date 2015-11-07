var webpack = require('webpack');
var path = require('path');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    entry: {
        todo_app: [
            './src/app_todo.js',
            //'webpack-dev-server/client?http://localhost:3000',
            //'webpack/hot/only-dev-server',
        ]
    },
    output: {
        publicPath: "http://localhost:3000/dist/",
        path: path.join(__dirname, 'dist'),
        filename: '[name].entry.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        //alias: {
        //'flux': '',
        //}
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'jsx-loader'
            //loader: 'react-hot!jsx-loader'
        }]
                 //loaders: [{
                 //test: /\.js$/,
                 //loader: 'babel-loader'
                 //}, {
                 //test: /\.jsx$/,
                 //loader: 'babel-loader!jsx-loader?harmony'
                 //}]
    },
        //plugins: [commonsPlugin]
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        //new webpack.HotModuleReplacementPlugin()
    ]
};

