module.exports = {
  entry: {
    index: './js/index.ts'
  },
  output: {
    filename: '[name].js'
  },
  mode: 'development', // 设置mode
  devtool: 'source-map',
  resolve: {
    extensions: [".ts"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'ts-loader'
        ]
      }
    ]
  }
}
