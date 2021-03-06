"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bibliography;

var _engines = _interopRequireDefault(require("./engines"));

var _attr = require("./attr.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getAffix = function getAffix(source, affix) {
  return typeof affix === 'function' ? affix(source) : affix || '';
};

function bibliography(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$template = options.template,
      template = _options$template === void 0 ? 'apa' : _options$template,
      _options$lang = options.lang,
      lang = _options$lang === void 0 ? 'en-US' : _options$lang,
      _options$format = options.format,
      format = _options$format === void 0 ? 'text' : _options$format,
      _options$nosort = options.nosort,
      nosort = _options$nosort === void 0 ? false : _options$nosort;
  var citeproc = (0, _engines.default)(data, template, lang, format);
  var sortedIds = citeproc.updateItems(data.map(function (entry) {
    return entry.id;
  }), nosort);

  if (options.append || options.prepend) {
    var append = options.append,
        prepend = options.prepend;
    var items = data.reduce(function (items, entry) {
      items[entry.id] = entry;
      return items;
    }, {});

    citeproc.sys.wrapBibliographyEntry = function (id) {
      var entry = items[id];
      return [getAffix(entry, prepend), getAffix(entry, append)];
    };
  } else {
    citeproc.sys.wrapBibliographyEntry = function () {
      return ['', ''];
    };
  }

  var bibliography = citeproc.makeBibliography();

  var _bibliography = _slicedToArray(bibliography, 2),
      _bibliography$ = _bibliography[0],
      bibstart = _bibliography$.bibstart,
      bibend = _bibliography$.bibend,
      bibBody = _bibliography[1];

  var entries = bibBody.map(function (element, index) {
    return (0, _attr.getPrefixedEntry)(element, sortedIds[index]);
  });
  return bibstart + entries.join('') + bibend;
}