require('babel-register');

const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.babel.js');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const PORT = 8081;

const app = express();
const compiler = webpack(config);

const webpackMiddleware = webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	contentBase: 'http://localhost:8081/',
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false,
	},
});

app.use(webpackMiddleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', (req, res) => {
	res.write(webpackMiddleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
	res.end();
});

app.listen(PORT, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log(`Listening at http://localhost:${PORT}/`);
});
