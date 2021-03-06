"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchEngine = exports.default = void 0;

var _citeproc = _interopRequireDefault(require("citeproc"));

var _styles = require("./styles");

var _locales = require("./locales");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getWrapperProxy = function getWrapperProxy(original) {
  return function (state, entry) {
    if (state.sys.wrapBibliographyEntry) {
      var _state$sys$wrapBiblio = state.sys.wrapBibliographyEntry(this.system_id),
          _state$sys$wrapBiblio2 = _slicedToArray(_state$sys$wrapBiblio, 2),
          prefix = _state$sys$wrapBiblio2[0],
          postfix = _state$sys$wrapBiblio2[1];

      entry = [prefix, entry, postfix].join('');
    }

    return original(state, entry);
  };
};

for (var format in _citeproc.default.Output.Formats) {
  var original = _citeproc.default.Output.Formats[format]['@bibliography/entry'];
  _citeproc.default.Output.Formats[format]['@bibliography/entry'] = getWrapperProxy(original);
}

var engines = {};

var fetchEngine = function fetchEngine(style, lang, template, retrieveItem, retrieveLocale) {
  var engineHash = "".concat(style, "|").concat(lang);
  var engine;

  if (engines.hasOwnProperty(engineHash)) {
    engine = engines[engineHash];
    engine.sys.retrieveItem = retrieveItem;
  } else {
    engine = engines[engineHash] = new _citeproc.default.Engine({
      retrieveLocale: retrieveLocale,
      retrieveItem: retrieveItem
    }, template, lang, true);
  }

  return engine;
};

exports.fetchEngine = fetchEngine;

var prepareEngine = function prepareEngine(data, templateName, language, format) {
  var items = data.reduce(function (store, entry) {
    store[entry.id] = entry;
    return store;
  }, {});

  var template = _styles.templates.get(_styles.templates.has(templateName) ? templateName : 'apa');

  language = _locales.locales.has(language) ? language : 'en-US';
  var engine = fetchEngine(templateName, language, template, function (key) {
    return items[key];
  }, _locales.locales.get.bind(_locales.locales));
  engine.setOutputFormat(format);
  return engine;
};

var _default = prepareEngine;
exports.default = _default;