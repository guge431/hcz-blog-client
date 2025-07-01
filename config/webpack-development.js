const  path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const { plugin } = require('postcss');
const port=3001;


module.exports={
    devServer:{
        port:port,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true,
        static:path.join(__dirname,'../dist'),
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }

    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'guge',
            filename:'index.html',
            template:path.resolve(__dirname,'../src/index-dev.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.REACT_APP_API_URL': JSON.stringify('http://localhost:3000')
        })
    ]

}