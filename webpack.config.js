var webpack = require('webpack')
  , env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public/bundle",
    filename: "[name].js",
    publicPath: "/bundle/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "jsx-loader?harmony"
      }, {
        test: /\.jsx$/,
        loader: "jsx-loader?harmony&insertPragma=React.DOM"
      }, {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }, {
        test: /\.css/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.svg/,
        loader: "url-loader?limit=10000&minetype=image/svg+xml"
      }, {
        test: /\.eot/,
        loader: "url-loader?limit=10000&minetype=application/vnd.ms-fontobject"
      }, {
        test: /\.ttf|otf/,
        loader: "url-loader?limit=10000&minetype=application/font-sfnt"
      }, {
        test: /\.woff/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      }, {
        test: /\.gif/,
        loader: "url-loader?limit=10000&minetype=image/gif"
      }, {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&minetype=image/jpg"
      }, {
        test: /\.png/,
        loader: "url-loader?limit=10000&minetype=image/png"
      }, {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ],
  resolve: {
    alias: {
      moment: 'moment/moment.js',
      dropmail: 'dropmail.js/browser'
    },
    modulesDirectories: ['node_modules', 'vendor']
  },
  externals: {
    jquery: "jQuery"
  }
}
