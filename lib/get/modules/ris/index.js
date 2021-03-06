"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _name = _interopRequireDefault(require("../../name"));

var _date = _interopRequireDefault(require("../../date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var typeMap = {
  graphic: 'ART',
  bill: 'BILL',
  'post-webblog': 'BLOG',
  book: 'BOOK',
  'review-book': 'BOOK',
  legal_case: 'CASE',
  chapter: 'CHAP',
  'paper-conference': 'CONF',
  dataset: 'DATA',
  'entry-dictionary': 'DICT',
  'entry-encyclopedia': 'ENCYC',
  figure: 'FIGURE',
  interview: 'GEN',
  treaty: 'GEN',
  post: 'ICOMM',
  article: 'JOUR',
  'article-journal': 'JOUR',
  review: 'JOUR',
  legislation: 'LEGAL',
  manuscript: 'MANSCPT',
  map: 'MAP',
  'article-magazine': 'MGZN',
  broadcast: 'MPCT',
  motion_picture: 'MPCT',
  musical_score: 'MUSIC',
  'article-newspaper': 'NEWS',
  pamphlet: 'PAMP',
  patent: 'PAT',
  personal_communication: 'PCOMM',
  report: 'RPRT',
  song: 'SOUND',
  speech: 'SOUND',
  thesis: 'THES'
};

var name = function name(names) {
  return names.map(function (name) {
    return (0, _name.default)(name, true);
  });
};

var fieldMap = {
  TY: {
    fieldName: 'type',
    convert: function convert(type) {
      return typeMap[type] || 'GEN';
    }
  },
  AU: [{
    type: ['review', 'review-book'],
    fieldName: 'reviewed-author',
    convert: name
  }, {
    type: '__default',
    fieldName: 'author',
    convert: name
  }],
  DA: {
    fieldName: 'issued',
    convert: function convert(date) {
      return (0, _date.default)(date, '/');
    }
  },
  PY: {
    fieldName: 'issued',
    convert: function convert(date) {
      return date['date-parts'][0][0];
    }
  },
  Y2: {
    fieldName: 'accessed',
    convert: function convert(date) {
      return (0, _date.default)(date, '/');
    }
  },
  AB: 'abstract',
  CN: 'call-number',
  CY: ['event-place', 'publisher-place'],
  DO: 'DOI',
  ET: [{
    type: 'book',
    fieldName: ['version', 'edition']
  }],
  IS: [{
    type: '__default',
    fieldName: 'issue'
  }],
  J2: ['journalAbbreviation'],
  LA: 'language',
  LB: 'citation-label',
  M1: 'number',
  M3: ['genre', 'medium'],
  N1: 'note',
  RI: 'reviewed-title',
  SE: 'section',
  SN: [{
    type: '__default',
    fieldName: ['ISBN', 'ISSN']
  }, {
    type: ['patent', 'report'],
    fieldName: 'number'
  }],
  SP: {
    fieldName: ['first-page', 'page']
  },
  T2: ['container-title', 'collection-title'],
  T3: {
    fieldName: ['container-title', 'collection-title'],
    keepAll: true,
    convert: function convert(con, col) {
      return con ? col : undefined;
    }
  },
  TI: ['original-title', 'title'],
  TT: {
    fieldName: ['original-title', 'title'],
    keepAll: true,
    convert: function convert(origTitle, title) {
      return origTitle ? title : undefined;
    }
  },
  UR: 'URL',
  VL: 'volume',
  A2: {
    fieldName: 'editor',
    convert: name
  },
  C1: [{
    type: 'chapter',
    fieldName: 'section'
  }, {
    type: 'paper-conference',
    fieldName: 'publisher-place'
  }, {
    type: 'map',
    fieldName: 'scale'
  }, {
    type: 'musical_score',
    fieldName: 'medium'
  }],
  C2: [{
    type: ['article-journal', 'article'],
    fieldName: 'PMCID'
  }, {
    type: 'paper-conference',
    fieldName: 'issued',
    convert: function convert(date) {
      return date['date-parts'][0][0];
    }
  }, {
    type: 'article-newspaper',
    fieldName: 'issue'
  }],
  C3: [{
    type: ['graphic', 'speech', 'sound', 'map'],
    fieldName: 'dimensions'
  }, {
    type: 'paper-conference',
    fieldName: 'container-title'
  }],
  C4: [{
    type: ['review', 'review-book'],
    fieldName: 'author',
    convert: name
  }, {
    type: ['motion_picture', 'broadcast'],
    fieldName: 'genre'
  }],
  C5: [{
    type: ['graphic', 'speech', 'sound', 'motion_picture', 'broadcast'],
    fieldName: 'medium'
  }],
  C6: [{
    type: 'report',
    fieldName: 'issue'
  }, {
    type: 'patent',
    fieldName: 'status'
  }],
  C7: [{
    type: ['article-journal', 'article'],
    fieldName: 'number'
  }],
  BT: [{
    type: 'chapter',
    fieldName: 'container-title'
  }],
  DB: 'archive',
  DP: 'source',
  ED: {
    fieldName: 'editor',
    convert: name
  },
  ID: 'id',
  NV: 'number-of-volumes',
  OP: 'references',
  PP: 'publiser-place',
  ST: ['short-title', 'titleShort']
};

var parseFieldInfo = function parseFieldInfo(fieldInfo, field, entry) {
  if (typeof fieldInfo === 'string') {
    return {
      sourceFields: [fieldInfo]
    };
  } else if (Array.isArray(fieldInfo) && typeof fieldInfo[0] === 'string') {
    return {
      sourceFields: fieldInfo
    };
  } else if (Array.isArray(fieldInfo) && _typeof(fieldInfo[0]) === 'object') {
    var specificInfo;
    var genericInfo;
    fieldInfo.forEach(function (infoPart) {
      if (typeof infoPart.type === 'string' && infoPart.type === entry.type || Array.isArray(infoPart.type) && infoPart.type.includes(entry.type)) {
        specificInfo = infoPart;
      } else if (infoPart.type === '__default') {
        genericInfo = infoPart;
      }
    });
    var combinedInfo = specificInfo || genericInfo;

    if (!combinedInfo) {
      return {};
    }

    return parseFieldInfo(combinedInfo.convert ? combinedInfo : combinedInfo.fieldName, field, entry);
  } else if (_typeof(fieldInfo) === 'object' && fieldInfo !== null) {
    return {
      sourceFields: [].concat(fieldInfo.fieldName),
      workOnEmptyInput: fieldInfo.fieldName === undefined,
      convert: fieldInfo.convert,
      keepAll: fieldInfo.keepAll === true
    };
  }
};

var json = function json(entry) {
  var target = {};

  for (var field in fieldMap) {
    var _parseFieldInfo = parseFieldInfo(fieldMap[field], field, entry),
        _parseFieldInfo$sourc = _parseFieldInfo.sourceFields,
        sourceFields = _parseFieldInfo$sourc === void 0 ? [] : _parseFieldInfo$sourc,
        _parseFieldInfo$workO = _parseFieldInfo.workOnEmptyInput,
        workOnEmptyInput = _parseFieldInfo$workO === void 0 ? false : _parseFieldInfo$workO,
        _parseFieldInfo$conve = _parseFieldInfo.convert,
        convert = _parseFieldInfo$conve === void 0 ? false : _parseFieldInfo$conve,
        _parseFieldInfo$keepA = _parseFieldInfo.keepAll,
        keepAll = _parseFieldInfo$keepA === void 0 ? false : _parseFieldInfo$keepA;

    if (!keepAll) {
      sourceFields = sourceFields.filter(entry.hasOwnProperty.bind(entry));
    }

    if (!workOnEmptyInput && sourceFields.length === 0) {
      continue;
    }

    var value = sourceFields.map(function (sourceField) {
      return entry[sourceField];
    });

    if (typeof convert === 'function') {
      value = convert.call.apply(convert, [entry].concat(_toConsumableArray(value)));

      if (value !== undefined) {
        target[field] = value;
      }
    } else {
      target[field] = value[0];
    }
  }

  return target;
};

var getRisLine = function getRisLine(prop) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return "".concat(prop, "  - ").concat(value, "\n");
};

var getRisField = function getRisField(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      prop = _ref2[0],
      value = _ref2[1];

  if (Array.isArray(value)) {
    return value.map(function (valuePart) {
      return getRisLine(prop, valuePart);
    }).join('');
  } else {
    return getRisLine(prop, value);
  }
};

var getRisPropList = function getRisPropList(entry) {
  var props = Object.entries(entry);

  if (props[0][0] !== 'TY') {
    var typeTagIndex = props.findIndex(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          prop = _ref4[0];

      return prop === 'TY';
    });

    var _props$splice = props.splice(typeTagIndex, 1),
        _props$splice2 = _slicedToArray(_props$splice, 1),
        typeTag = _props$splice2[0];

    props.unshift(typeTag);
  }

  props.push(['ER']);
  return props.map(getRisField).join('');
};

var getRis = function getRis(entries) {
  return entries.map(json).map(getRisPropList).join('');
};

var _default = {
  ris: function ris(data) {
    var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        type = _ref5.type,
        _ref5$format = _ref5.format,
        format = _ref5$format === void 0 ? type || 'text' : _ref5$format;

    if (format === 'object') {
      return data.map(json);
    } else {
      return getRis(data);
    }
  }
};
exports.default = _default;