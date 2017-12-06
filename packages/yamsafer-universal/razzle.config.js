// razzle.config.js

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    config.output.library = '';
    config.output.libraryTarget = 'commonjs';
    config.node = Object.assign({}, config.node, {
      fs: 'empty',
      tls: 'empty',
      net: 'empty',
      yamlparser: 'empty',
    });
    console.log(config);
    return config;
  },
};
