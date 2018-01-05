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

    next();
  });

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

  return minis3;
};

module.exports = MiniS3;
