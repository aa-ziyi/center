const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

function resolve(dir) {
  return path.join(__dirname, dir);
}
const plugins = [];
if (process.env.NODE_ENV !== "development") {
  plugins.push(
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8,
    })
  );
}
const port = process.env.port || process.env.npm_config_port || 9527; // dev port
const config = {
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  publicPath: "/",
  outputDir: "dist",
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "http://117.169.64.37",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: plugins,
  },
  chainWebpack(config) {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch-index");
    // 移除 preload 插件
    config.plugins.delete("preload-index");
    // set preserveWhitespace
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
  },
};
module.exports = config;
