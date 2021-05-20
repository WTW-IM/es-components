const Q = require('q');
const conventionalChangelog = require('conventional-changelog-eslint/conventional-changelog');
const parserOpts = require('conventional-changelog-eslint/parser-opts');
const recommendedBumpOpts = require('conventional-changelog-eslint/recommended-bump');
const writerOpts = require('conventional-changelog-eslint/writer-opts');

module.exports = Q.all([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts])
  .spread((conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts) => (
    { conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts }
  ));
