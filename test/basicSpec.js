'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  region: 'us-east-1'
});

const s3 = new AWS.S3({
  endpoint: 'http://localhost:9090'
});

describe('Basic S3 Spec', function() {
  it('should connect and list buckets', function() {
    return s3.listBuckets().promise().
      then(function(data) {
        console.log('Bucket List', data.Buckets);
      });
  });
});
