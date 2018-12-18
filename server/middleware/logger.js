/**
* @file: log4js
* @Author: liyunjiao
* @Date:   2018-01-17 13:31:54
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-03-01 17:35:39
*/

/*eslint-disable*/
import log4js from 'log4js';
log4js.configure({
    "appenders": {
      "console": {
        "type": "console"
      },
      "trace": {
        "type": "file",
        "filename": "log/access.log",
        "maxLogSize ": 31457280
      },
      "http": {
        "type": "logLevelFilter",
        "appender": "trace",
        "level": "trace",
        "maxLevel": "trace"
      },
      "info": {
        "type": "dateFile",
        "filename": "log/app-info.log",
        "pattern": ".yyyy-MM-dd",
        "daysToKeep":7,
        "layout": {
          "type": "pattern",
          "pattern": "[%d{ISO8601}][%5p  %z  %c] %m"
        },
        "compress": true
      },
      "maxInfo": {
        "type": "logLevelFilter",
        "appender": "info",
        "level": "debug",
        "maxLevel": "info"
      },
      "error": {
        "type": "dateFile",
        "filename": "log/app-error.log",
        "daysToKeep":7,
        "pattern": ".yyyy-MM-dd",
        "layout": {
          "type": "pattern",
          "pattern": "[%d{ISO8601}][%5p  %z  %c] %m"
        },
        "compress": true
      },
      "minError": {
        "type": "logLevelFilter",
        "appender": "error",
        "level": "error"
      }
    },
    "categories": {
      "default": {
        "appenders": [
          "console",
          "http",
          "maxInfo",
          "minError"
        ],
        "level": "all"
      }
    }
  });
var logger = log4js.getLogger();
logger.replaceConsole = true;
export default logger;