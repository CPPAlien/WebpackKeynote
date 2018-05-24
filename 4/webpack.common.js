const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'rev-list HEAD --count --no-merges',
});

module.exports = {
  entry: {
    index: './src/index.js',
    'vue/index': './src/vue/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src'), to: path.resolve(__dirname, './dist'), ignore: ['*.js', '*.vue']
    }]),
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      rules: [{
        search: '@version',
        replace: gitRevisionPlugin.version(),
      }],
    }]),
  ]
}