
const path=require('path')
const {resolve}=path
const merge=require('webpack-merge').default
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2))
// const argv=require('yargs-parser')(process.argv.slice(2))
const _mode=argv.mode || 'development'
const _modeflag=_mode==='production'?true:false
const _webpackConfig=require(`./config/webpack-${_mode}.js`)


const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const { CleanWebpackPlugin  } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackplugin = require('@soda/friendly-errors-webpack-plugin');

const BundleAnalyzerpiugin=require('webpack-bundle-analyzer').BundleAnalyzerplugin;
const { plugins } = require('./tailwind.config')

const {ThemedProgressPlugin}=require("themed-progress-plugin");

const webpackConfig={
    entry: "./src/index.tsx",
    output:{
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'scripts/[name].[contenthash:5].bundule.js',
        assetModuleFilename: 'assets/[name].[contenthash:5][ext]',
    },
    // output:{
    //    path:path.resolve(__dirname,"dist"),
    //    filename:"main.js",
    // },
    module:{
        rules:[
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
                type: 'asset/resource',
              },
            {
                test:/\.([jt]s|[jt]sx)$/,
                exclude:/(node_modules)/,
                use:['swc-loader']
            },
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {  
                     loader:"css-loader",
                     options:{importLoaders:1}
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag ? "styles/[name].[contenthash:5].css" : 'styles/[name].css',
            chunkFilename: _modeflag
                ? "styles/[name].[contenthash:5].css"
                : 'styles/[name].css',
            ignoreOrder: false,
        }),
        new FriendlyErrorsWebpackplugin({
            compilationSuccessInfo:{
                messages:['You application is running here http//localhost:'+ 3001],
                notes:["构建信息请及时关注窗口右上角"],
                onErrors: function(severity,errors){
                  if(severity!==error){
                    return;
                   }
                  const error = errors[0];
                  console.log(error);
                }
            },
            clearConsole: true,
        }),
        // new BundleAnalyzerpiugin({
        //     analyzerMode: 'static',
        //     openAnalyzer: false,
        // }),
        new ThemedProgressPlugin()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@components': resolve(__dirname, 'src/components'),
            '@layouts': resolve(__dirname, 'src/layouts'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@router': resolve(__dirname, 'src/router'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@utils': resolve(__dirname, 'src/utils'),
            '@types': resolve(__dirname, 'src/types'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.css', '.json'],
        fallback: {
            // stream: require.resolve('stream-browserify'),
        },
    }
}


module.exports=merge(_webpackConfig,webpackConfig)