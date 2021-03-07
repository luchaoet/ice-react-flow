const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
// module.exports = async function (args, subprocess) {
//   webpackConfig.plugins.push(
//     new MonacoWebpackPlugin({
//       languages: ['json', 'javascript', 'typescript', 'python'],
//     })
//   );
// };

module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    console.log(config);
    // config.module.tap((options) => {
    //   options.plugins.push(MonacoWebpackPlugin);
    //   return options;
    // });
  });
};
