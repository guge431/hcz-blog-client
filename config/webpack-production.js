
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerplugin= require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const { plugin } = require('postcss');
const  path = require('path');
module.exports={

    performance: {
        maxAssetSize: 250000,
        maxEntrypointSize: 250000,
        hints: 'warning',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerplugin({
                parallel: true
            }),
            new TerserPlugin({
                parallel: true
            }),
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'guge',
            filename:'index.html',
            template:path.resolve(__dirname,'../src/index-prod.html')
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.REACT_APP_API_URL': JSON.stringify('https://rsyfaexhi7.execute-api.us-east-1.amazonaws.com/dev')
        })
    ]
}