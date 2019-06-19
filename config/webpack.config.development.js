const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/ui/react-ui',
            name:'[name].[ext]',
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx', '.json' ]
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist')
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new CopyPlugin([{ from: 'assets', to: 'assets' }])
  ]
};