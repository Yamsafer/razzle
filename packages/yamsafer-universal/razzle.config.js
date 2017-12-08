var path = require('path');

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target === 'node') {
      config.output.library = '';
      config.output.libraryTarget = 'commonjs';
      config.node = Object.assign({}, config.node, {
        fs: 'empty',
        tls: 'empty',
        net: 'empty',
        yamlparser: 'empty',
      });
    }

    if (target === 'web') {
      config.output.path = path.resolve('./build');
      config.output.filename = 'client.js';
      config.output.library = '';
      config.output.libraryTarget = 'umd';
      config.output.umdNamedDefine = true;
      delete config.output.chunkFilename;
    }

    return config;
  },
};
