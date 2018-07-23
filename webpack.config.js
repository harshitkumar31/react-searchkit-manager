const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line

const env = process.env.NODE_ENV;

const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
});

const reactExternal = {
	root: 'React',
	commonjs2: 'react',
	commonjs: 'react',
	amd: 'react',
};

const plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(env),
	}),
	new webpack.optimize.OccurrenceOrderPlugin(),
	extractSass,
];

if (env === 'production') {
	plugins.push(
    new webpack.optimize.UglifyJsPlugin({
	compressor: {
		screw_ie8: true,
		warnings: false,
	},
})
    );
}

module.exports = {
	externals: {
		react: reactExternal,
	},
	module: {
		loaders: [
			{test: /\.scss$/,loaders: [
				'isomorphic-style-loader',
				'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
				'postcss-loader'
			]},
			{ test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
			{ test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
			{ test: /\.gif$/, loader: 'url-loader' },
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
		],

		/* rules: [{ test: /\.scss$/,
			use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader','sass-loader']}) 
      // [{loader: 'raw-loader'},{loader: 'css-loader'},{loader: 'sass-loader'}],
		}, { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
    { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
    { test: /\.gif$/, loader: 'url-loader' },
    { test: /\.less$/, loader: 'style!css!less' }], */
   /*  loaders: [


    ], */
	},
	output: {
		library: 'ReactSearchKit',
		libraryTarget: 'umd',
	},
	plugins,
	resolve: {
		extensions: ['.js'],
	},
};
