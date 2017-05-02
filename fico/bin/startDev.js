const path = require('path');
const indentString = require('indent-string')
const chalk = require('chalk')
const {spawn} = require('child_process');

const webpack = require('webpack')

function invoke() {
  const serverConfig = require('../../webpack/webpack.server'); //TODO: configurable

  const outputPath = serverConfig.output.path;

  const compiler = webpack(serverConfig);

  let firstTime = true;

  const watcher = compiler.watch(undefined, () => {
    firstTime && (function() {
      startServer()
      firstTime = false;
    })();
  });



  let serverProcess;
  let wasServerMessage;

  function startServer () {
    serverProcess = spawn('node', [outputPath])
    serverProcess.stdout.on('data', data => {
      console.log((wasServerMessage ? '' : '\n') + indentString(chalk.white(data), 4))
      wasServerMessage = true
    })
    serverProcess.stderr.on('data', data => {
      console.error((wasServerMessage ? '' : '\n') + indentString(chalk.red(data), 4))
      wasServerMessage = true
    })
  }

  function stopServer () {
    if (serverProcess) serverProcess.kill();
  }

  function exit () {
    watcher.close()
    stopServer()
  }

  [
    'SIGINT',
    'SIGTERM',
    'SIGHUP',
    'SIGQUIT',
    'exit',
    'uncaughtException'
  ].forEach(event => process.on(event, exit));
}

invoke();

module.exports = invoke;
