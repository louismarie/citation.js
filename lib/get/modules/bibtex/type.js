"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var bibtexTypes = {
  article: 'article',
  'article-journal': 'article',
  'article-magazine': 'article',
  'article-newspaper': 'article',
  book: 'book',
  chapter: 'incollection',
  graphic: 'misc',
  interview: 'misc',
  manuscript: 'unpublished',
  motion_picture: 'misc',
  'paper-conference': 'inproceedings',
  patent: 'patent',
  personal_communication: 'misc',
  report: 'techreport',
  thesis: 'phdthesis',
  webpage: 'misc'
};

var fetchBibTeXType = function fetchBibTeXType(pubType) {
  if (pubType in bibtexTypes) {
    return bibtexTypes[pubType];
  } else {
    logger.warn("CSL publication type not recognized: ".concat(pubType, ". Interpreting as \"misc\"."));
    return 'misc';
  }
};

var _default = fetchBibTeXType;
exports.default = _default;