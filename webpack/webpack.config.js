var webpack = require("webpack");
var path = require("path");
var shell = require("shelljs");
var os = require("os");

// plugins
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var CompleteTimeWebpackPlugin = require("complete-time-webpack-plugin");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");
var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var HappyPack = require("happypack");
var happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
var tsImportPluginFactory = require("ts-import-plugin");

var copyFiles = require("./webpack.config.copyfiles.js");

var env = process.env.NODE_ENV;
console.log("Webpack run in " + env);

// var resourcePath = '';
var resourcePath = "http://localhost:9085";

var isProduction = env === "production";
var isDev = env === "dev";

resourcePath = isProduction ? "" : resourcePath;

var relativePath = "./dist"
var buildpath = path.resolve(__dirname, relativePath);
console.log(buildpath);

if (!isDev) {
  shell.rm("-rf", buildpath);
}

var entrySet = {
  'bundle': ["./src/index.tsx"],
  'main-style': ["./src/styles/antd.less"],
  'language': ["./src/language/en_us.ts", "./src/language/zh_cn.ts"],
  'ha_f': isProduction ? "./lib/3rdlib/ha_f.js" : "./lib/3rdlib/ha_f.dev.js"
};

var output = {
  path: buildpath,
  filename: isProduction ? "[name].min.js" : "[name].js"
};

if (isDev) {
  copyFiles.push({
    from: "./index.html",
    to: "./index.html"
  });
} else {
  copyFiles.push({
    from: "./index.production.html",
    to: "./index.html"
  });
}

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),

  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env),
    "process.env.RESOURCE_PATH": JSON.stringify(resourcePath)
  }),

  new webpack.EnvironmentPlugin(["NODE_ENV", "RESOURCE_PATH"]),

  new CopyWebpackPlugin(copyFiles),

  new HtmlWebpackPlugin({
    title: "hello word",
    template: "./index.html",
    filename: "./index.html",
    hash: true,
    inject: true,
    chunksSortMode: "none"
  }),

  new ScriptExtHtmlWebpackPlugin({
    defer: [/main-style*/, /language*/, /bundle*/, /ha_f*/]
  }),

  new CompleteTimeWebpackPlugin(),

  new FriendlyErrorsWebpackPlugin(),

  new HappyPack({
    id: "ts",
    threadPool: happyThreadPool,
    loaders: [{
      path: "ts-loader",
      query: {
        happyPackMode: true
      },
      options: {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: "antd",
              style: true,
              libraryDirectory: "es"
            })
          ]
        })
      }
    }]
  }),

  // new ForkTsCheckerWebpackPlugin({
  //   checkSyntacticErrors: true
  // }),

  new HappyPack({
    id: "less",
    threadPool: happyThreadPool,
    loaders: ["css-loader", "less-loader"]
  }),

  new HappyPack({
    id: "css",
    threadPool: happyThreadPool,
    loaders: ["css-loader"]
  })
];

if (isDev) {
  plugins.push(
    new OpenBrowserPlugin({
      url: "http://localhost:8080/",
      delay: 1000
    }),
    //单独提取css文件
    new ExtractTextPlugin("[name].css")
  );
}

if (isProduction) {
  plugins.push(
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("postcss-csso"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: false
    }),

    //单独提取css文件
    new ExtractTextPlugin("[name].min.css")
  );
}

var rules = [{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "happypack/loader?id=css"
  })
},
{
  test: /\.less$/i,
  loader: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "happypack/loader?id=less"
  })
},
// 图片，小于10k的内联成base64编码 //基于打包大小的考虑，先不将图片打入js，limit设成10b
{
  test: /\.(png|jpg|gif|PNG)$/,
  loader: "url-loader",
  options: {
    limit: 1024,
    name: "./img/[hash].[ext]"
  }
},
// 图标字体glyphicon
{
  test: /\.(otf|eot|svg|ttf|woff)$/,
  loader: "url-loader"
},
{
  test: /\.tsx?$/,
  loader: "happypack/loader?id=ts"
}
];

module.exports = {

  mode: isProduction ? "production" : "development",

  entry: entrySet,

  output: output,

  plugins: plugins,

  module: {
    rules: rules
  },

  resolve: {
    extensions: [".webpack.js", ".ts", ".tsx", ".js", ".json", ".less", ".css"],
    modules: [__dirname, path.resolve("src"), "node_modules"]
  },

  devtool: isProduction ? "hidden-source-map" : "source-map",

  stats: {
    children: false,
    errors: true,
    assets: false
  },

  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-intl": "ReactIntl",
    "react-router": "ReactRouter",
    "react-router-dom": "ReactRouterDOM",
    "jquery": "$",
    "jquery": "jQuery",
    "jquery-ui": "$.ui",
    "jquery-ui": "jQuery.ui",
    "lodash": "_",
    "antd": "antd",
    "mobx": "mobx",
    "mobx-react": "mobxReact"
  },

  devServer: {
    contentBase: buildpath,
    hot: true,
    host: "localhost.com",
    port: 8080,
    stats: {
      children: false
    }
  }
};