require('babel-core/register');

const environment = process.env.NODE_ENV || 'development';
const config = require(`./configs/webpack/environments/${environment}`).default;

module.exports = config(environment);
