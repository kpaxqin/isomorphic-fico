/*
 * Setup NODE_CONFIG_DIR to read configs from ./envs folder.
 * We should do it before the first load of node-config, this is why we need this file.
 * And you SHOULD NOT call require('config') directly, call this one instead.
 */
process.env.NODE_CONFIG_DIR = 'envs';

module.exports = require('config');