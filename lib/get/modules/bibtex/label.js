"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getBibTeXLabel = function getBibTeXLabel() {
  var entry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (entry['citation-label']) {
    return entry['citation-label'];
  }

  var res = '';

  if (entry.author) {
    res += entry.author[0].family || entry.author[0].literal;
  }

  if (entry.issued && entry.issued['date-parts'] && entry.issued['date-parts'][0]) {
    res += entry.issued['date-parts'][0][0];
  }

  if (entry['year-suffix']) {
    res += entry['year-suffix'];
  } else if (entry.title) {
    res += entry.title.replace(/<\/?.*?>/g, '').match(/^(?:(?:the|a|an)\s+)?(\S+)/i)[1];
  }

  return res;
};

var _default = getBibTeXLabel;
exports.default = _default;