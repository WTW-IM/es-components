import babel from 'rollup-plugin-babel';

process.env.NODE_ENV = 'test';

export default {
  input: 'src/index.js',
  output: {
    file: 'cjs/index.js',
    format: 'cjs'
  },
  plugins: [
    babel({ runtimeHelpers: true }),
  ]
};
