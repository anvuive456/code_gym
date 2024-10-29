const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
    entry: "./web/entry-client.ts", // Client entry point
    resolve: {
        extensions: [".js", ".ts", ".vue"],
        alias: {
            "@config": path.resolve(__dirname, "./src/config"),
            "@db": path.resolve(__dirname, "./src/db"),
            "@dto": path.resolve(__dirname, "./src/dto"),
            "@entities": path.resolve(__dirname, "./src/entities"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@middlewares": path.resolve(__dirname, "./src/middlewares"),
            "@": path.resolve(__dirname, "web"),
        },
    },
    watch: false,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: { appendTsSuffixTo: [/\.vue$/] },
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    // optimization: {
    //     splitChunks: false,  // Disable code splitting
    //     minimize: false,     // Disable minification
    // },
};
