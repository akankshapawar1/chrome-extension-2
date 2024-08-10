const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    popup: './src/popup.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development', // Change to 'production' for production build
  devtool: 'inline-source-map', // Update this line to avoid 'eval'
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify")
    }
  }
};
