// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const packageJson = require('../../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const ModuleFedSingleRuntimePlugin = require("@module-federation/concat-runtime");

module.exports = (config) => {
  nrwlConfig(config);
  return {
    ...config,
    devServer: {
      ...config.devServer,
      allowedHosts: "all",
    },
    optimization: {
      ...config.optimization,
      runtimeChunk: false,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'remoteModule',
        filename: 'remoteEntry.js',
        exposes: {
          './RemoteWidgetModule': './src/app/remotes/RemoteWidgetModule',
          './RemoteSidepanelModule': './src/app/remotes/RemoteSidepanelModule',
        },
        shared: {
          ...Object.entries(packageJson.dependencies).reduce((previousValue, [key, version]) => {
            return {
              ...previousValue,
              [key]: {
                requiredVersion: version,
              }
            }
          }, {}),
          react: {
            import: 'react', // the "react" package will be used a provided and fallback module
            shareKey: 'react', // under this name the shared module will be placed in the share scope
            shareScope: 'default', // share scope with this name will be used
            singleton: true, // only a single version of the shared module is allowed
            requiredVersion: packageJson.dependencies.react,
          },
          'react-dom': {
            singleton: true, // only a single version of the shared module is allowed
            requiredVersion: packageJson.dependencies['react-dom'],
          },
        },
      }),
      // new ModuleFedSingleRuntimePlugin(),
    ],
  };
};
