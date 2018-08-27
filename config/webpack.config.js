var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.IONIC_ENV;

useDefaultConfig.prod.resolve.alias = {
  "@environment": path.resolve(environmentPath('prod'))
};

useDefaultConfig.dev.resolve.alias = {
  "@environment": path.resolve(environmentPath('dev'))
};

if (env !== 'prod' && env !== 'dev') {
  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@environment": path.resolve(environmentPath(env))
  };
}

function environmentPath(env) {
  var filePath = './src/environments/' + env +'.ts';
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};