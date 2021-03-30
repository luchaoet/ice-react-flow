const { eslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(eslint, {
  indent: ['error', 'tab'],
});
