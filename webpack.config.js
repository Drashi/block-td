const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json' ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  plugins: [
    new CopyPlugin([{ from: 'src/index.html', to: 'index.html' }, { from: 'assets', to: 'assets' }])
  ]
};