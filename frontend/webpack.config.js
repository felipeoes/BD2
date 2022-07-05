const path = require('path');

module.exports = {
  entry: {
    'Controller': './src/Controller.js',
    },
  output: {
    filename: '[name]-bundle.js',  // output bundle file name    
    path: path.resolve('src', './bundle'),  // path to our Django static directory
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