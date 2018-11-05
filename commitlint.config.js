module.exports = {
  extends: [ '@commitlint/config-conventional' ],
  rules: {
    'type-enum': [2, 'always', [
      'Fix',
      'Update',
      'Breaking',
      'Docs',
      'Build',
      'New',
      'Upgrade'
    ],],
    'type-case': [2, 'always', 'pascal-case']
  }
};
