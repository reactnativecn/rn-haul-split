const Template = require('webpack/lib/Template');

// Hook __webpack_require__.e in webworker template
// add 'return' before 'importScripts' to pass the import promise out.
class AsyncImportScriptFixPlugin {
  apply(mainTemplate) {
    mainTemplate.hooks.requireEnsure.tap(
      {
        name: 'AsyncImportScriptFixPlugin',
        stage: 10,
      },
      (_, chunk, hash) => {
        const chunkFilename = mainTemplate.outputOptions.chunkFilename;
        const chunkMaps = chunk.getChunkMaps();
        return Template.asString([
          'promises.push(Promise.resolve().then(function() {',
          Template.indent([
            '// "1" is the signal for "already loaded"',
            'if(!installedChunks[chunkId]) {',
            Template.indent([
              'return importScripts(' +
                mainTemplate.getAssetPath(JSON.stringify(chunkFilename), {
                  hash: `" + ${mainTemplate.renderCurrentHashCode(hash)} + "`,
                  hashWithLength: length =>
                    `" + ${mainTemplate.renderCurrentHashCode(
                      hash,
                      length,
                    )} + "`,
                  chunk: {
                    id: '" + chunkId + "',
                    hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
                    hashWithLength(length) {
                      const shortChunkHashMap = Object.create(null);
                      for (const chunkId of Object.keys(chunkMaps.hash)) {
                        if (typeof chunkMaps.hash[chunkId] === 'string') {
                          shortChunkHashMap[chunkId] = chunkMaps.hash[
                            chunkId
                          ].substr(0, length);
                        }
                      }
                      return `" + ${JSON.stringify(
                        shortChunkHashMap,
                      )}[chunkId] + "`;
                    },
                    contentHash: {
                      javascript: `" + ${JSON.stringify(
                        chunkMaps.contentHash.javascript,
                      )}[chunkId] + "`,
                    },
                    contentHashWithLength: {
                      javascript: length => {
                        const shortContentHashMap = {};
                        const contentHash = chunkMaps.contentHash.javascript;
                        for (const chunkId of Object.keys(contentHash)) {
                          if (typeof contentHash[chunkId] === 'string') {
                            shortContentHashMap[chunkId] = contentHash[
                              chunkId
                            ].substr(0, length);
                          }
                        }
                        return `" + ${JSON.stringify(
                          shortContentHashMap,
                        )}[chunkId] + "`;
                      },
                    },
                    name: `" + (${JSON.stringify(
                      chunkMaps.name,
                    )}[chunkId]||chunkId) + "`,
                  },
                  contentHashType: 'javascript',
                }) +
                ');',
            ]),
            '}',
          ]),
          '}));',
        ]);
      },
    );
  }
}

module.exports = AsyncImportScriptFixPlugin;
