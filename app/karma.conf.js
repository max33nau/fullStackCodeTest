const webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    basePath:'',
    frameworks: ['mocha', 'chai'],
    port: 9876,
    preprocessors: {
      './src/app.js' : ['webpack'],
      './tests/unit/**/*.js': ['babel']
    },
    files: [
      './src/app.js',
      'node_modules/angular-mocks/angular-mocks.js',
      './tests/unit/**/*.js'
    ],
    exclude: [],
    reporters: ['progress'],

    webpack: webpackConfig,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome', 'Safari'],
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity

  })
}
