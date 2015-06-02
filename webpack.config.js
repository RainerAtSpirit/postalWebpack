var path = require("path");
var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        cc: './src/app/main'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "assets"),
        publicPath: "/assets/",
        filename: "[name].js",
        chunkFilename: "[name].js",
        libraryTarget: 'var',
        library: 'cc'
    },
    module: {
        loaders: [
//            { test: /node_modules/, loader: "imports?define=>undefined" }
        ]
    },
    resolve: {
        root: [path.join(__dirname, 'src')],
        modulesDirectories: ['bower_components', 'node_modules']
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
};
