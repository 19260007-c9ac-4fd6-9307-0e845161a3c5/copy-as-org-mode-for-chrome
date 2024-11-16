const path = require('path');

const DotenvPlugin = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: {
		// serviceWorker: './src/serviceWorker.ts',
		contentScript: './src/contentScript.ts',
		popup: './src/popup.ts',
		// options: './src/options.ts',
		background: './src/background.ts',
		copy: './src/copy.ts',
		'copy-link': './src/copy-link.ts',
		options_ui: './src/options_ui/options_ui.ts',
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)x?$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.pug$/,
				// use: [
				//     // 'html-loader',
				//     'pug-html-loader'
				// ],
				use: [
					//{
					//    loader: 'html-loader',
					//    options: { minimize: false }
					//},
					{
						loader: 'raw-loader',
					},
					{
						loader: 'pug-html-loader',
						options: { pretty: true },
					},
				],
			},
			{ test: /\.(gif|svg|jpg|png)$/, loader: 'file-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [
		new DotenvPlugin(),
		new ESLintPlugin({
			extensions: ['js', 'ts'],
			overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
		}),
		new MiniCssExtractPlugin({
			filename: 'styles/[name].css',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'static' },
				// { from: 'src/options_ui/options_ui.css', to: 'options_ui.css', force: true, toType: 'file' },
				{
					from: 'src/options_ui/style/',
					to: 'options_ui_style/',
					force: true,
					toType: 'dir',
				},
				{
					from: 'src/syntaxhl/syntaxhl.css',
					to: 'options_ui_style/syntaxhl.css',
					force: true,
					toType: 'file',
				},
				// { from: 'img/', to: 'img/', force: true, toType: 'dir' },
				// { from: 'manifest.json', to: 'manifest.json', force: true, toType: 'file' },
			],
		}),

		new HtmlWebpackPlugin({
			template: './src/options_ui/options_ui.pug',
			filename: 'options_ui.html',
			chunks: [], // 'options_ui'  // IMPORTANT: If you don't add this manually, this shitty HtmlWebpackPlugin will add ALL entries into options_ui.html...
		}),
	],
};
