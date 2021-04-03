const path = require('path')
module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  }
}