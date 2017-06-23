#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var spawnSync = require('cross-spawn').sync;
var hasYarn = require('has-yarn');

var envSetterRegex = /(\w+)=('(.+)'|"(.+)"|(.+))/;
var envUseUnixRegex = /\$(\w+)/g; // $my_var
var envUseWinRegex = /\%(.*?)\%/g; // %my_var%
var isWin = process.platform === 'win32';
var envExtract = isWin ? envUseUnixRegex : envUseWinRegex;

function commandConvert(command) {
  var match = envExtract.exec(command);
  if (match) {
    command = isWin ? `%${match[1]}%` : `$${match[1]}`;
  }
  return command;
}

function getCommandArgsAndEnvVars(args) {
  var command;
  var envVars = Object.assign({}, process.env);
  var commandArgs = args.map(commandConvert);
  while (commandArgs.length) {
    var shifted = commandArgs.shift();
    var match = envSetterRegex.exec(shifted);
    if (match) {
      envVars[match[1]] = match[3] || match[4] || match[5];
    } else {
      command = shifted;
      break;
    }
    if (process.env.APPDATA) {
      envVars.APPDATA = process.env.APPDATA;
    }
  }
  commandArgs.unshift(command);
  return {
    commandArgs: commandArgs,
    envVars: envVars
  };
}

var c = getCommandArgsAndEnvVars(process.argv.slice(2));
if (c.commandArgs.length) {

  var pkgJson = require(path.join(process.cwd(), 'package.json'));

  var subPackages = pkgJson.subPackages;
  if (!subPackages) {
      throw new Error('No "subPackages" entry found in package.json.');
  }

  console.log('Running\x1b[36m', process.argv.slice(2).join(' '), '\x1b[0mfor', subPackages.length, 'packages...');

  for (var i=0; i<subPackages.length; i++) {
    var subPkgPath = path.join(process.cwd(), subPackages[i])
    var subPkgJson = require(path.join(subPkgPath, 'package.json'));
    var subPkgCmd = hasYarn(subPkgPath) ? 'yarn' : 'npm';

    console.log('Package \x1b[34m' + subPkgJson.name + '\x1b[0m ...');

    var result = spawnSync(subPkgCmd, c.commandArgs, {
      stdio: 'inherit',
      env: c.envVars,
      cwd: path.resolve(subPkgPath)
    });
    if (result.status != 0) {
      process.exit(result.status);
    }
  }
}