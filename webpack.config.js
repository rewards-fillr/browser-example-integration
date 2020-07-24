const path = require('path');

module.exports = {
  /* defines the application 'entry points', i.e. the part where the app will 'boot' from, in our extension we have standalone
     bits that are the background, the content script (which rolls up frames, intelligence, satisfactino, anything that must run
     in a frame) */
  entry: {
    index: './index.ts',
  },
  /* the special [name] placeholder is replaced by the keys in the entry, i.e. index.ts will be turned into sample-index-bundled.js
     with all it's associcated dependencies */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sample-[name]-bundled.js'
  },
  /* this is required, otherwise import statements in ts/tsx files will not pick up other ts/tsx files and report them
     as unresolvable, the default is js, so with webpack we can actually mix/match js/tsx/ts/coffee/whatever as all
     part of a single assembly */
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  /* this tells webpack to run all ts/tsx files through the ts-loader, which transforms typescript files
     note that it requires a tsconfig.json, which is created with tsc --init at the command line */
  module: {
    rules: [
      { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  devtool: "sourcemap"
}
