const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const paths = {
  appBuild: path.resolve(__dirname, "build"),
  appIndexHtml: path.resolve(__dirname, "public/index.html"),
  appIndexJs: path.resolve(__dirname, "src/index.js"),
  appSrc: path.resolve(__dirname, "src"),
  nodePaths: path.join(__dirname, "node_modules"),
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const appEnv = process.env.NODE_ENV || "development";
const config = {
  mode: appEnv,
  entry: {
    main: ["whatwg-fetch", "babel-polyfill", paths.appIndexJs],
  },
  output: {
    publicPath: "/",
    path: paths.appBuild,
    filename: "[name].[hash].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      envConfig$: path.join(paths.appSrc, "config", "env", appEnv + ".js"),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: paths.nodePaths,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: paths.nodePaths,
        query: {
          plugins: ["transform-class-properties", "transform-object-assign"],
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: "file-loader",
        query: {
          name: "[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(appEnv),
      },
    }),

    new CleanPlugin(["build"]),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: paths.appIndexHtml,
      inject: "body",
      minify: true,
      chunks: ["main"],
      inlineSource: ".(js|css)$",
      env: {
        name: appEnv,
      },
    }),
    new HtmlWebpackInlineSourcePlugin(),

    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),

    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
  ],
};

if (appEnv === "production") {
  config.optimization = {
    minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin({})],
  };

  config.plugins.push(
    new StatsPlugin("stats.json", {
      chunkModules: true,
      exclude: [/node_modules[\\\/]react/],
    })
  );
} else {
  config.devtool = "#inline-source-map";
}

module.exports = config;
