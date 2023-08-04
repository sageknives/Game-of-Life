const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    open: true,
    hot: true,
    port: 3000,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
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
};
