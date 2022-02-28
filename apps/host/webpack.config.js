// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const packageJson = require('../../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')

module.exports = (config) => {
  nrwlConfig(config);
  return {
    ...config,
    devServer: {
      ...config.devServer,
      allowedHosts: "all",
    },
    // output: {
    //   publicPath: 'auto',
    // },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'remoteModule',
        filename: 'remoteEntry.js',
        exposes: {
          './RemoteModule': './src/app/remote/RemoteModule',
        },
        shared: {
          ...Object.keys(packageJson.dependencies).reduce((previousValue, currentValue) => {
            return {
              ...previousValue,
              [currentValue]: {
                singleton: true,
              }
            }
          }, {}),
          react: {
            import: 'react', // the "react" package will be used a provided and fallback module
            shareKey: 'react', // under this name the shared module will be placed in the share scope
            shareScope: 'default', // share scope with this name will be used
            singleton: true, // only a single version of the shared module is allowed
          },
          'react-dom': {
            singleton: true, // only a single version of the shared module is allowed
          },
        },
      }),
      new ExternalTemplateRemotesPlugin(),
    ],
  };
};
