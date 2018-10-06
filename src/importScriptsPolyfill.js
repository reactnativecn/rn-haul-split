const { NativeModules } = require('react-native');
const { RNChunkSplit } = NativeModules;

let _scriptURL;

let _sourceCodeScriptURL;
function getSourceCodeScriptURL() {
  if (_sourceCodeScriptURL) {
    return _sourceCodeScriptURL;
  }

  let sourceCode =
    global.nativeExtensions && global.nativeExtensions.SourceCode;
  if (!sourceCode) {
    const NativeModules = require('NativeModules');
    sourceCode = NativeModules && NativeModules.SourceCode;
  }
  _sourceCodeScriptURL = sourceCode.scriptURL;
  return _sourceCodeScriptURL;
}

function _coerceLocalScriptURL(scriptURL) {
  if (scriptURL) {
    const splitIndex = scriptURL.lastIndexOf('/') + 1;
    scriptURL = [
      scriptURL.substring(0, splitIndex),
      scriptURL.substring(splitIndex),
    ];
    if (!scriptURL[0].includes('://')) {
      // Add file protocol in case we have an absolute file path and not a URL.
      // This shouldn't really be necessary. scriptURL should be a URL.
      scriptURL[0] = 'file://' + scriptURL[0];
    }
  }
  return scriptURL;
}

function getScriptURL() {
  if (_scriptURL === undefined) {
    _scriptURL = _coerceLocalScriptURL(getSourceCodeScriptURL());
  }
  return _scriptURL;
}

function transformUrl(url) {
  const chunkId = /(\w+)\./.exec(url)[1];

  const scriptUrl = getScriptURL();
  return scriptUrl[0] + chunkId + '.' + scriptUrl[1];
}

function loadScript(url) {
  url = transformUrl(url);

  if (/^https?:/.test(url)) {
    // Debugger mode.
    return fetch(url)
      .then(response => response.text())
      .then(body => {
        // eslint-disable-next-line no-eval
        eval(body);
      });
  }
  return RNChunkSplit.loadScript(url).then(v => {
    return v;
  });
}

self.importScripts = loadScript;
