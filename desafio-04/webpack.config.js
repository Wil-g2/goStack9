const path = require('path'); 

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'), 
    filename: 'bundle.js'
  }, 
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      //criar uma regra para toda vez que o babel encontrar um arquivo js ele deve transpilar
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'},
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i, 
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
};