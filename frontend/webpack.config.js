const path = require('path');

module.exports = {
  entry: {
    'assets/js/Controller': './assets/containers/Controller.js',
    'assets/js/Base': './assets/containers/Base.js',
    },
  output: {
    filename: '[name]-bundle.js',  // output bundle file name
    path: path.resolve(__dirname, './static'),  // path to our Django static directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
    ]
  }
};