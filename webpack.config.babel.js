import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const dependencies = require(path.resolve(__dirname, 'package.json')).dependencies;

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: [
			'app.js',
		],
		vendor: Object.keys(dependencies).filter((dep) => dep !== 'twitter'), // Dont want nodejs module inside bundle
	},
	debug: true,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/',
	},
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
	resolve: {
		root: path.resolve(__dirname, 'src'),
		extensions: [ '', '.js' ],
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			},
			{
				test: /\.css/,
				loader: 'style!css',
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file',
			},
			{
				test: /\.json$/,
				loader: 'file?name=[name].[ext]',
			},
		],
	},
	devtool: 'source-map',
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery/src/jquery',
			jQuery: 'jquery/src/jquery',
		}),
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
		new HtmlWebpackPlugin({ template: 'index.template.html', inject: 'body' }),
	],
};
