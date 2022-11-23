const path = require("path");
const nodeExternals = require("webpack-node-externals");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

const webpackConfig = {
  mode: "development",
  entry: {
    main: "./src/client/index.tsx",
    // client: path.resolve(__dirname, "src/client/index.tsx"),
    // server: path.resolve(__dirname, "src/server/server.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  target: "node",
  externals: [nodeExternals()],
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = webpackConfig;
