const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");


module.exports = merge(common, {
    entry: "./web/entry-client.ts",
    output: {
        path: path.resolve(__dirname, "dist/client"),
        filename: "bundle.client.js",
        publicPath: "/dist/client/",
    },
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            "process.env.SSR": "false",  // Define SSR as false for client-side
        }),
    ],
});
