const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    open: true,
    hot: true,
    port: 3000,
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: [`swc-loader`],
      },
    ],
  },
  resolve: {
    extensions: [`.js`, `.ts`],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "public/*.css",
          to: "[name][ext]",
        },
        {
          from: "public/*.html",
          to: "[name][ext]",
        },
      ],
    }),
  ],
};
