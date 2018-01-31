'use strict';

const restify = require('restify');

function MiniS3() {
  const minis3 = this;

  minis3.version = require('../package.json').version;

  minis3.options = {
    name: 'mini-s3',
    host: '0.0.0.0',
    port: 9090,
    silent: false
  };

  minis3.config = {
    apiVersion: '2006-03-01',
    defaultRegion: 'us-east-1'
  };

  minis3.util = require('./util');

  minis3.server = restify.createServer({
    name: minis3.options.name
  });

  minis3.server.use(restify.pre.sanitizePath());
  minis3.server.use(restify.plugins.dateParser());
  minis3.server.use(restify.plugins.queryParser());
  minis3.server.use(restify.plugins.bodyParser());
  minis3.server.use(restify.plugins.authorizationParser());

  minis3.server.use(function (req, res, next) {
    //const requestId = 'req_' + minis3.store.generateId(24);
    //req.requestId = requestId;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');

    if (!minis3.options.silent) {
      minis3.util.logger(req);
    }
    next();
  });

  //////////////////////////////////////////////////

  minis3.placeHolder = function(req, res, next) {
    console.log('%s: %s %s', 'UNIMPLEMENTED ENDPOINT',
      req.method, req.url);

    res.json(200, {
      message: 'placeholder'
    });
    next();
  };

  minis3.server.opts(/.*/, function(req, res, next) {
    res.send(200);
    next();
  });

  //////////////////////////////////////////////////

  minis3.model = require('./model')(minis3);

  //////////////////////////////////////////////////

  minis3.server.get(/.*/, minis3.placeHolder);
  minis3.server.post(/.*/, minis3.placeHolder);
  minis3.server.put(/.*/, minis3.placeHolder);
  minis3.server.head(/.*/, minis3.placeHolder);
  minis3.server.del(/.*/, minis3.placeHolder);

  //////////////////////////////////////////////////

  minis3.boot = function() {
    return new Promise(function(resolve, reject) {
      process.title = minis3.options.name;
      minis3.server.listen(minis3.options.port, minis3.options.host, function(error) {
        if (error) {
          reject(error);
        } else {
          console.info('Mini S3 API Server v%s listening at %s',
            minis3.version, minis3.server.url);
          resolve();
        }
      });
    });
  };

  minis3.shutdown = function() {
    minis3.server.close();
  };

  return minis3;
};

module.exports = MiniS3;
