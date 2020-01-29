'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

/*
//prod
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://m.bjslck.com"', //测试
})


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost"', //testing for localhost
})

*/

module.exports = merge(prodEnv, {
  ENV_PATH: "dev.env.js",
  NODE_ENV: '"mingDev"',
  BASE_API: '"https://t.bjslck.com"', //testing for test env
})

