const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},

	devtool: 'source-map',
	devServer: {
		contentBase: './dist',
		historyApiFallback: {
			index: 'index.html',
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, 
				loader: "file-loader" ,
				options: {
					outputPath: "/images",
					publicPath: '/images',
				}
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	]
}