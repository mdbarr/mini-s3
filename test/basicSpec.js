'use strict';

const AWS = require('aws-sdk');
const MiniS3 = require('../lib/mini-s3');

AWS.config.update({
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  region: 'us-east-1'
});

const s3 = new AWS.S3({
  endpoint: 'http://localhost:9090'
});

const minis3 = new MiniS3();

describe('Basic S3 Spec', function() {
  before(function() {
    return minis3.boot();
  });

  it('should connect and list buckets', function() {
    return s3.listBuckets().promise().
      then(function(data) {
        console.log('Bucket List', data.Buckets);
      });
  });

  after(function() {
    return minis3.shutdown();
  });
});
