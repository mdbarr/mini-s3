'use strict';

function Model(minis3) {
  const self = this;

  self.user = function({
    accessKey, secretKey, defaultRegion
  }) {
    const model = {
      accessKey: accessKey,
      secretKey: secretKey,
      defaultRegion: defaultRegion || minis3.config.defaultRegion,
      buckets: [ ]
    };

    return model;
  };

  self.bucket = function(name, region) {
    const model = {
      name: name,
      region: region,
      object: []
    };
    return model;
  };

  self.object = function({
    key, version, data, metadata
  }) {
    const model = {
      key: key,
      version: version || null,
      metatdata: metadata || {},
      data: data || null
    };
    return model;
  };

  return self;
}

module.exports = function(minis3) {
  return new Model(minis3);
};
