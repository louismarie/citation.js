"use strict";

var _plugins = require("../../../plugins/");

var _locales = require("./locales");

var _styles = require("./styles");

var _engines = _interopRequireDefault(require("./engines"));

var _bibliography = _interopRequireDefault(require("./bibliography"));

var _citation = _interopRequireDefault(require("./citation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _plugins.add)('csl', {
  output: {
    bibliography: _bibliography.default,
    citation: _citation.default
  },
  config: {
    engine: _engines.default,
    locales: _locales.locales,
    templates: _styles.templates
  }
});