const path = require("path");
const { aliases } = require("./node_modules/browserslist/index");


module.exports = {
	entry: "./src/Master.tsx",
	devtool: "inline-source-map",
    plugins: [
        new webpack.SourceMapDevToolPlugin ({})
    ],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							configFile: "tsconfig.json"
						}
					},
					{
						loader: "babel-loader",
						options: {
							presets: ["solid"],
						}
					}
				],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "build"),
	},
	watch: true
};