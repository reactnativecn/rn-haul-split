/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
'use strict';

const AsyncImportScriptFixPlugin = require('./AsyncImportScriptFixPlugin');

class HaulSplitChunkPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('HaulSplitChunkPlugin', compilation => {
      new AsyncImportScriptFixPlugin().apply(compilation.mainTemplate);
    });
  }
}

module.exports = HaulSplitChunkPlugin;
