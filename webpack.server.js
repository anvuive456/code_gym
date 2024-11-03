const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const common = require("./webpack.common.js");
const webpack = require("webpack");


module.exports = merge(common, {
    entry: {
        // app: "./web/entry-server.ts",
        index: "./src/index.ts",
    },
    target: "node",
    externals: [nodeExternals({
        allowlist: /\.(css|vue)$/,
    })],
    output: {
        path: path.resolve(__dirname, "dist/server"),
        filename: "bundle.server.js",
        publicPath: "/dist/server/",
        libraryTarget: "commonjs2",
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.SSR": "true",  // Define SSR as true for server-side
        }),
    ],
    mode: "development",
});
