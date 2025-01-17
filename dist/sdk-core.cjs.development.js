'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _Big = _interopDefault(require('big.js'));
var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var bignumber = require('@ethersproject/bignumber');
var address = require('@ethersproject/address');
var abi$8 = require('@ethersproject/abi');
var solidity = require('@ethersproject/solidity');

var WRAPPED_NATIVE_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000006";
var USDC_TOKEN_ADDRESS = "0xb62F35B9546A908d11c5803ecBBA735AbC3E3eaE";
var FACTORY_ADDRESS = "0x07B01eD8B5637e2b3437181662853a856D30Dad5";
var ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
var NONFUNGIBLE_POSITION_MANAGER_ADDRESS = "0xbBF8F12D478c08Da5A9De1AbBa5bD2c2766297dC";
var TICK_LENS_ADDRESS = "0xDaa9c0b411BA45BE2D19794dE40604fCeD71eedD";
var QUOTER_V2_ADDRESS = "0x86038EAbf8448c4a11e7987c84FdDd1b9E7AC491";
var MULTICALL_ADDRESS = "0xCEE7B0EF15A6A0Cf51ebf6944E523047fEfD3126";
var SWAP_ROUTER_02_ADDRESS = "0xbD18b076DE6810dfc5Eb8B59fCa86d2308eDf023";
var ADDRESS_MAP = {
  v3CoreFactoryAddress: FACTORY_ADDRESS,
  multicallAddress: MULTICALL_ADDRESS,
  quoterV2Address: QUOTER_V2_ADDRESS,
  nonfungiblePositionManagerAddress: NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
  tickLensAddress: TICK_LENS_ADDRESS,
  swapRouter02Address: SWAP_ROUTER_02_ADDRESS
};

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var _TICK_SPACINGS;
var MaxUint256 = /*#__PURE__*/JSBI.BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));
(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));
(function (FeeAmount) {
  FeeAmount[FeeAmount["LOWEST"] = 100] = "LOWEST";
  FeeAmount[FeeAmount["LOW"] = 500] = "LOW";
  FeeAmount[FeeAmount["MEDIUM"] = 3000] = "MEDIUM";
  FeeAmount[FeeAmount["HIGH"] = 10000] = "HIGH";
})(exports.FeeAmount || (exports.FeeAmount = {}));
/**
 * The default factory tick spacings by fee amount.
 */
var TICK_SPACINGS = (_TICK_SPACINGS = {}, _TICK_SPACINGS[exports.FeeAmount.LOWEST] = 1, _TICK_SPACINGS[exports.FeeAmount.LOW] = 10, _TICK_SPACINGS[exports.FeeAmount.MEDIUM] = 60, _TICK_SPACINGS[exports.FeeAmount.HIGH] = 200, _TICK_SPACINGS);
// constants used internally but not expected to be used externally
var NEGATIVE_ONE = /*#__PURE__*/JSBI.BigInt(-1);
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
// used in liquidity amount math
var Q96 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(96));
var Q192 = /*#__PURE__*/JSBI.exponentiate(Q96, /*#__PURE__*/JSBI.BigInt(2));
var POOL_INIT_CODE_HASH = "0x851d77a45b8b9a205fb9f44cb829cceba85282714d2603d601840640628a3da7";
var MSG_SENDER = "0x0000000000000000000000000000000000000001";
var ADDRESS_THIS = "0x0000000000000000000000000000000000000002";
var OVM_GASPRICE_ADDRESS = "0xb528D11cC114E026F138fE568744c6D45ce6Da7A";
var NETWORK_NAME = "Votopia";
var SUBGRAPH_URL = "https://graphnode.optopia.ai/subgraphs/name/votopia-subgraph";
var JSON_RPC_PROVIER = "https://rpc-mainnet.optopia.ai";

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = JSBI.BigInt(1);
    }
    this.numerator = JSBI.BigInt(numerator);
    this.denominator = JSBI.BigInt(denominator);
  }
  Fraction.tryParseFraction = function tryParseFraction(fractionish) {
    if (fractionish instanceof JSBI || typeof fractionish === "number" || typeof fractionish === "string") return new Fraction(fractionish);
    if ("numerator" in fractionish && "denominator" in fractionish) return fractionish;
    throw new Error("Could not parse fraction");
  }
  // performs floor division
  ;
  var _proto = Fraction.prototype;
  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };
  _proto.add = function add(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.subtract = function subtract(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }
    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.lessThan = function lessThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.equalTo = function equalTo(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };
  _proto.multiply = function multiply(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };
  _proto.divide = function divide(other) {
    var otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ""
      };
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }
    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ""
      };
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }
    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  }
  /**
   * Helper method for converting any super class back to a fraction
   */;
  return _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    }
    // remainder after floor division
  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }, {
    key: "asFraction",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }]);
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  function CurrencyAmount(currency, numerator, denominator) {
    var _this;
    _this = _Fraction.call(this, numerator, denominator) || this;
    !JSBI.lessThanOrEqual(_this.quotient, MaxUint256) ?  invariant(false, "AMOUNT")  : void 0;
    _this.currency = currency;
    _this.decimalScale = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(currency.decimals));
    return _this;
  }
  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  _inheritsLoose(CurrencyAmount, _Fraction);
  CurrencyAmount.fromRawAmount = function fromRawAmount(currency, rawAmount) {
    return new CurrencyAmount(currency, rawAmount);
  }
  /**
   * Construct a currency amount with a denominator that is not equal to 1
   * @param currency the currency
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */;
  CurrencyAmount.fromFractionalAmount = function fromFractionalAmount(currency, numerator, denominator) {
    return new CurrencyAmount(currency, numerator, denominator);
  };
  var _proto = CurrencyAmount.prototype;
  _proto.add = function add(other) {
    !this.currency.equals(other.currency) ?  invariant(false, "CURRENCY")  : void 0;
    var added = _Fraction.prototype.add.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, added.numerator, added.denominator);
  };
  _proto.subtract = function subtract(other) {
    !this.currency.equals(other.currency) ?  invariant(false, "CURRENCY")  : void 0;
    var subtracted = _Fraction.prototype.subtract.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, subtracted.numerator, subtracted.denominator);
  };
  _proto.multiply = function multiply(other) {
    var multiplied = _Fraction.prototype.multiply.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, multiplied.numerator, multiplied.denominator);
  };
  _proto.divide = function divide(other) {
    var divided = _Fraction.prototype.divide.call(this, other);
    return CurrencyAmount.fromFractionalAmount(this.currency, divided.numerator, divided.denominator);
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }
    return _Fraction.prototype.divide.call(this, this.decimalScale).toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }
    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }
    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, "DECIMALS")  : void 0;
    return _Fraction.prototype.divide.call(this, this.decimalScale).toFixed(decimalPlaces, format, rounding);
  };
  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ""
      };
    }
    Big$1.DP = this.currency.decimals;
    return new Big$1(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format);
  };
  return _createClass(CurrencyAmount, [{
    key: "wrapped",
    get: function get() {
      if (this.currency.isToken) return this;
      return CurrencyAmount.fromFractionalAmount(this.currency.wrapped, this.numerator, this.denominator);
    }
  }]);
}(Fraction);

var Price = /*#__PURE__*/function (_Fraction) {
  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  function Price() {
    var _this;
    var baseCurrency, quoteCurrency, denominator, numerator;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 4) {
      baseCurrency = args[0];
      quoteCurrency = args[1];
      denominator = args[2];
      numerator = args[3];
    } else {
      var result = args[0].quoteAmount.divide(args[0].baseAmount);
      var _ref = [args[0].baseAmount.currency, args[0].quoteAmount.currency, result.denominator, result.numerator];
      baseCurrency = _ref[0];
      quoteCurrency = _ref[1];
      denominator = _ref[2];
      numerator = _ref[3];
    }
    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }
  /**
   * Flip the price, switching the base and quote currency
   */
  _inheritsLoose(Price, _Fraction);
  var _proto = Price.prototype;
  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  }
  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */;
  _proto.multiply = function multiply(other) {
    !this.quoteCurrency.equals(other.baseCurrency) ?  invariant(false, "TOKEN")  : void 0;
    var fraction = _Fraction.prototype.multiply.call(this, other);
    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  }
  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */;
  _proto.quote = function quote(currencyAmount) {
    !currencyAmount.currency.equals(this.baseCurrency) ?  invariant(false, "TOKEN")  : void 0;
    var result = _Fraction.prototype.multiply.call(this, currencyAmount);
    return CurrencyAmount.fromFractionalAmount(this.quoteCurrency, result.numerator, result.denominator);
  }
  /**
   * Get the value scaled by decimals for formatting
   * @private
   */;
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }
    return this.adjustedForDecimals.toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }
    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding);
  };
  return _createClass(Price, [{
    key: "adjustedForDecimals",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);
}(Fraction);

var ONE_HUNDRED = /*#__PURE__*/new Fraction(/*#__PURE__*/JSBI.BigInt(100));
/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */
function toPercent(fraction) {
  return new Percent(fraction.numerator, fraction.denominator);
}
var Percent = /*#__PURE__*/function (_Fraction) {
  function Percent() {
    var _this;
    _this = _Fraction.apply(this, arguments) || this;
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */
    _this.isPercent = true;
    return _this;
  }
  _inheritsLoose(Percent, _Fraction);
  var _proto = Percent.prototype;
  _proto.add = function add(other) {
    return toPercent(_Fraction.prototype.add.call(this, other));
  };
  _proto.subtract = function subtract(other) {
    return toPercent(_Fraction.prototype.subtract.call(this, other));
  };
  _proto.multiply = function multiply(other) {
    return toPercent(_Fraction.prototype.multiply.call(this, other));
  };
  _proto.divide = function divide(other) {
    return toPercent(_Fraction.prototype.divide.call(this, other));
  };
  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }
    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
  };
  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }
    return _Fraction.prototype.multiply.call(this, ONE_HUNDRED).toFixed(decimalPlaces, format, rounding);
  };
  return Percent;
}(Fraction);

var BaseCurrency = function BaseCurrency(decimals, symbol, name, icon, coingeckoId) {
  !(decimals >= 0 && decimals < 255 && Number.isInteger(decimals)) ?  invariant(false, "DECIMALS")  : void 0;
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
  this.icon = icon;
  this.coingeckoId = coingeckoId;
};

var NativeCurrency = /*#__PURE__*/function (_BaseCurrency) {
  function NativeCurrency() {
    var _this;
    _this = _BaseCurrency.apply(this, arguments) || this;
    _this.isNative = true;
    _this.isToken = false;
    return _this;
  }
  _inheritsLoose(NativeCurrency, _BaseCurrency);
  return NativeCurrency;
}(BaseCurrency);

var Token = /*#__PURE__*/function (_BaseCurrency) {
  function Token(address, decimals, symbol, name, icon, coingeckoId, buyFeeBps, sellFeeBps) {
    var _this;
    _this = _BaseCurrency.call(this, decimals, symbol, name, icon, coingeckoId) || this;
    _this.isNative = false;
    _this.isToken = true;
    _this.address = address;
    if (buyFeeBps) {
      !buyFeeBps.gte(bignumber.BigNumber.from(0)) ?  invariant(false, "NON-NEGATIVE FOT FEES")  : void 0;
    }
    if (sellFeeBps) {
      !sellFeeBps.gte(bignumber.BigNumber.from(0)) ?  invariant(false, "NON-NEGATIVE FOT FEES")  : void 0;
    }
    _this.buyFeeBps = buyFeeBps;
    _this.sellFeeBps = sellFeeBps;
    return _this;
  }
  _inheritsLoose(Token, _BaseCurrency);
  var _proto = Token.prototype;
  _proto.equals = function equals(other) {
    return other.isToken && this.address.toLowerCase() === other.address.toLowerCase();
  };
  _proto.sortsBefore = function sortsBefore(other) {
    !(this.address.toLowerCase() !== other.address.toLowerCase()) ?  invariant(false, "ADDRESSES")  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };
  return _createClass(Token, [{
    key: "wrapped",
    get: function get() {
      return this;
    }
  }]);
}(BaseCurrency);

/**
 * This tick data provider does not know how to fetch any tick data. It throws whenever it is required. Useful if you
 * do not need to load tick data for your use case.
 */
var NoTickDataProvider = /*#__PURE__*/function () {
  function NoTickDataProvider() {}
  var _proto = NoTickDataProvider.prototype;
  _proto.getTick = /*#__PURE__*/function () {
    var _getTick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(_tick) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            throw new Error(NoTickDataProvider.ERROR_MESSAGE);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function getTick(_x) {
      return _getTick.apply(this, arguments);
    }
    return getTick;
  }();
  _proto.nextInitializedTickWithinOneWord = /*#__PURE__*/function () {
    var _nextInitializedTickWithinOneWord = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_tick, _lte, _tickSpacing) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            throw new Error(NoTickDataProvider.ERROR_MESSAGE);
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function nextInitializedTickWithinOneWord(_x2, _x3, _x4) {
      return _nextInitializedTickWithinOneWord.apply(this, arguments);
    }
    return nextInitializedTickWithinOneWord;
  }();
  return NoTickDataProvider;
}();
NoTickDataProvider.ERROR_MESSAGE = "No tick data provider was given";

var Tick = function Tick(_ref) {
  var index = _ref.index,
    liquidityGross = _ref.liquidityGross,
    liquidityNet = _ref.liquidityNet;
  !(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK) ?  invariant(false, "TICK")  : void 0;
  this.index = index;
  this.liquidityGross = JSBI.BigInt(liquidityGross);
  this.liquidityNet = JSBI.BigInt(liquidityNet);
};

/**
 * A data provider for ticks that is backed by an in-memory array of ticks.
 */
var TickListDataProvider = /*#__PURE__*/function () {
  function TickListDataProvider(ticks, tickSpacing) {
    var ticksMapped = ticks.map(function (t) {
      return t instanceof Tick ? t : new Tick(t);
    });
    TickList.validateList(ticksMapped, tickSpacing);
    this.ticks = ticksMapped;
  }
  var _proto = TickListDataProvider.prototype;
  _proto.getTick = /*#__PURE__*/function () {
    var _getTick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(tick) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", TickList.getTick(this.ticks, tick));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function getTick(_x) {
      return _getTick.apply(this, arguments);
    }
    return getTick;
  }();
  _proto.nextInitializedTickWithinOneWord = /*#__PURE__*/function () {
    var _nextInitializedTickWithinOneWord = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(tick, lte, tickSpacing) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", TickList.nextInitializedTickWithinOneWord(this.ticks, tick, lte, tickSpacing));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function nextInitializedTickWithinOneWord(_x2, _x3, _x4) {
      return _nextInitializedTickWithinOneWord.apply(this, arguments);
    }
    return nextInitializedTickWithinOneWord;
  }();
  return TickListDataProvider;
}();

/**
 * By default, pools will not allow operations that require ticks.
 */
var NO_TICK_DATA_PROVIDER_DEFAULT = /*#__PURE__*/new NoTickDataProvider();
/**
 * Represents a V3 pool
 */
var Pool = /*#__PURE__*/function () {
  /**
   * Construct a pool
   * @param tokenA One of the tokens in the pool
   * @param tokenB The other token in the pool
   * @param fee The fee in hundredths of a bips of the input amount of every swap that is collected by the pool
   * @param sqrtRatioX96 The sqrt of the current ratio of amounts of token1 to token0
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   * @param ticks The current state of the pool ticks or a data provider that can return tick data
   */
  function Pool(tokenA, tokenB, fee, sqrtRatioX96, liquidity, tickCurrent, ticks) {
    if (ticks === void 0) {
      ticks = NO_TICK_DATA_PROVIDER_DEFAULT;
    }
    !(Number.isInteger(fee) && fee < 1000000) ?  invariant(false, "FEE")  : void 0;
    var tickCurrentSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent);
    var nextTickSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent + 1);
    !(JSBI.greaterThanOrEqual(JSBI.BigInt(sqrtRatioX96), tickCurrentSqrtRatioX96) && JSBI.lessThanOrEqual(JSBI.BigInt(sqrtRatioX96), nextTickSqrtRatioX96)) ?  invariant(false, "PRICE_BOUNDS")  : void 0;
    // always create a copy of the list since we want the pool's tick list to be immutable
    var _ref = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
    this.token0 = _ref[0];
    this.token1 = _ref[1];
    this.fee = fee;
    this.sqrtRatioX96 = JSBI.BigInt(sqrtRatioX96);
    this.liquidity = JSBI.BigInt(liquidity);
    this.tickCurrent = tickCurrent;
    this.tickDataProvider = Array.isArray(ticks) ? new TickListDataProvider(ticks, TICK_SPACINGS[fee]) : ticks;
  }
  Pool.getAddress = function getAddress(tokenA, tokenB, fee, initCodeHashManualOverride, factoryAddressOverride) {
    return computePoolAddress({
      factoryAddress: factoryAddressOverride != null ? factoryAddressOverride : FACTORY_ADDRESS,
      fee: fee,
      tokenA: tokenA,
      tokenB: tokenB,
      initCodeHashManualOverride: initCodeHashManualOverride
    });
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token The token to check
   * @returns True if token is either token0 or token
   */;
  var _proto = Pool.prototype;
  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pool in terms of token0, i.e. the ratio of token1 over token0
   */;
  /**
   * Return the price of the given token in terms of the other token in the pool.
   * @param token The token to return price of
   * @returns The price of the given token, in terms of the other.
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, "TOKEN")  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Given an input amount of a token, return the computed output amount, and a pool with state updated after the trade
   * @param inputAmount The input amount for which to quote the output amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit
   * @returns The output amount and the pool with updated state
   */;
  _proto.getOutputAmount =
  /*#__PURE__*/
  function () {
    var _getOutputAmount = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(inputAmount, sqrtPriceLimitX96) {
      var zeroForOne, _yield$this$swap, outputAmount, sqrtRatioX96, liquidity, tickCurrent, outputToken;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            !this.involvesToken(inputAmount.currency) ?  invariant(false, "TOKEN")  : void 0;
            zeroForOne = inputAmount.currency.equals(this.token0);
            _context.next = 4;
            return this.swap(zeroForOne, inputAmount.quotient, sqrtPriceLimitX96);
          case 4:
            _yield$this$swap = _context.sent;
            outputAmount = _yield$this$swap.amountCalculated;
            sqrtRatioX96 = _yield$this$swap.sqrtRatioX96;
            liquidity = _yield$this$swap.liquidity;
            tickCurrent = _yield$this$swap.tickCurrent;
            outputToken = zeroForOne ? this.token1 : this.token0;
            return _context.abrupt("return", [CurrencyAmount.fromRawAmount(outputToken, JSBI.multiply(outputAmount, NEGATIVE_ONE)), new Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)]);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function getOutputAmount(_x, _x2) {
      return _getOutputAmount.apply(this, arguments);
    }
    return getOutputAmount;
  }()
  /**
   * Given a desired output amount of a token, return the computed input amount and a pool with state updated after the trade
   * @param outputAmount the output amount for which to quote the input amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns The input amount and the pool with updated state
   */
  ;
  _proto.getInputAmount =
  /*#__PURE__*/
  function () {
    var _getInputAmount = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(outputAmount, sqrtPriceLimitX96) {
      var zeroForOne, _yield$this$swap2, inputAmount, sqrtRatioX96, liquidity, tickCurrent, inputToken;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            !(outputAmount.currency.isToken && this.involvesToken(outputAmount.currency)) ?  invariant(false, "TOKEN")  : void 0;
            zeroForOne = outputAmount.currency.equals(this.token1);
            _context2.next = 4;
            return this.swap(zeroForOne, JSBI.multiply(outputAmount.quotient, NEGATIVE_ONE), sqrtPriceLimitX96);
          case 4:
            _yield$this$swap2 = _context2.sent;
            inputAmount = _yield$this$swap2.amountCalculated;
            sqrtRatioX96 = _yield$this$swap2.sqrtRatioX96;
            liquidity = _yield$this$swap2.liquidity;
            tickCurrent = _yield$this$swap2.tickCurrent;
            inputToken = zeroForOne ? this.token0 : this.token1;
            return _context2.abrupt("return", [CurrencyAmount.fromRawAmount(inputToken, inputAmount), new Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)]);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function getInputAmount(_x3, _x4) {
      return _getInputAmount.apply(this, arguments);
    }
    return getInputAmount;
  }()
  /**
   * Executes a swap
   * @param zeroForOne Whether the amount in is token0 or token1
   * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns amountCalculated
   * @returns sqrtRatioX96
   * @returns liquidity
   * @returns tickCurrent
   */
  ;
  _proto.swap =
  /*#__PURE__*/
  function () {
    var _swap = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(zeroForOne, amountSpecified, sqrtPriceLimitX96) {
      var exactInput, state, step, _yield$this$tickDataP, _SwapMath$computeSwap, liquidityNet;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            if (!sqrtPriceLimitX96) sqrtPriceLimitX96 = zeroForOne ? JSBI.add(TickMath.MIN_SQRT_RATIO, ONE) : JSBI.subtract(TickMath.MAX_SQRT_RATIO, ONE);
            if (zeroForOne) {
              !JSBI.greaterThan(sqrtPriceLimitX96, TickMath.MIN_SQRT_RATIO) ?  invariant(false, "RATIO_MIN")  : void 0;
              !JSBI.lessThan(sqrtPriceLimitX96, this.sqrtRatioX96) ?  invariant(false, "RATIO_CURRENT")  : void 0;
            } else {
              !JSBI.lessThan(sqrtPriceLimitX96, TickMath.MAX_SQRT_RATIO) ?  invariant(false, "RATIO_MAX")  : void 0;
              !JSBI.greaterThan(sqrtPriceLimitX96, this.sqrtRatioX96) ?  invariant(false, "RATIO_CURRENT")  : void 0;
            }
            exactInput = JSBI.greaterThanOrEqual(amountSpecified, ZERO); // keep track of swap state
            state = {
              amountSpecifiedRemaining: amountSpecified,
              amountCalculated: ZERO,
              sqrtPriceX96: this.sqrtRatioX96,
              tick: this.tickCurrent,
              liquidity: this.liquidity
            }; // start swap while loop
          case 4:
            if (!(JSBI.notEqual(state.amountSpecifiedRemaining, ZERO) && state.sqrtPriceX96 != sqrtPriceLimitX96)) {
              _context3.next = 35;
              break;
            }
            step = {};
            step.sqrtPriceStartX96 = state.sqrtPriceX96;
            // because each iteration of the while loop rounds, we can't optimize this code (relative to the smart contract)
            // by simply traversing to the next available tick, we instead need to exactly replicate
            // tickBitmap.nextInitializedTickWithinOneWord
            _context3.next = 9;
            return this.tickDataProvider.nextInitializedTickWithinOneWord(state.tick, zeroForOne, this.tickSpacing);
          case 9:
            _yield$this$tickDataP = _context3.sent;
            step.tickNext = _yield$this$tickDataP[0];
            step.initialized = _yield$this$tickDataP[1];
            if (step.tickNext < TickMath.MIN_TICK) {
              step.tickNext = TickMath.MIN_TICK;
            } else if (step.tickNext > TickMath.MAX_TICK) {
              step.tickNext = TickMath.MAX_TICK;
            }
            step.sqrtPriceNextX96 = TickMath.getSqrtRatioAtTick(step.tickNext);
            _SwapMath$computeSwap = SwapMath.computeSwapStep(state.sqrtPriceX96, (zeroForOne ? JSBI.lessThan(step.sqrtPriceNextX96, sqrtPriceLimitX96) : JSBI.greaterThan(step.sqrtPriceNextX96, sqrtPriceLimitX96)) ? sqrtPriceLimitX96 : step.sqrtPriceNextX96, state.liquidity, state.amountSpecifiedRemaining, this.fee);
            state.sqrtPriceX96 = _SwapMath$computeSwap[0];
            step.amountIn = _SwapMath$computeSwap[1];
            step.amountOut = _SwapMath$computeSwap[2];
            step.feeAmount = _SwapMath$computeSwap[3];
            if (exactInput) {
              state.amountSpecifiedRemaining = JSBI.subtract(state.amountSpecifiedRemaining, JSBI.add(step.amountIn, step.feeAmount));
              state.amountCalculated = JSBI.subtract(state.amountCalculated, step.amountOut);
            } else {
              state.amountSpecifiedRemaining = JSBI.add(state.amountSpecifiedRemaining, step.amountOut);
              state.amountCalculated = JSBI.add(state.amountCalculated, JSBI.add(step.amountIn, step.feeAmount));
            }
            // TODO
            if (!JSBI.equal(state.sqrtPriceX96, step.sqrtPriceNextX96)) {
              _context3.next = 32;
              break;
            }
            if (!step.initialized) {
              _context3.next = 29;
              break;
            }
            _context3.t0 = JSBI;
            _context3.next = 25;
            return this.tickDataProvider.getTick(step.tickNext);
          case 25:
            _context3.t1 = _context3.sent.liquidityNet;
            liquidityNet = _context3.t0.BigInt.call(_context3.t0, _context3.t1);
            // if we're moving leftward, we interpret liquidityNet as the opposite sign
            // safe because liquidityNet cannot be type(int128).min
            if (zeroForOne) liquidityNet = JSBI.multiply(liquidityNet, NEGATIVE_ONE);
            state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet);
          case 29:
            state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext;
            _context3.next = 33;
            break;
          case 32:
            if (JSBI.notEqual(state.sqrtPriceX96, step.sqrtPriceStartX96)) {
              // updated comparison function
              // recompute unless we're on a lower tick boundary (i.e. already transitioned ticks), and haven't moved
              state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX96);
            }
          case 33:
            _context3.next = 4;
            break;
          case 35:
            return _context3.abrupt("return", {
              amountCalculated: state.amountCalculated,
              sqrtRatioX96: state.sqrtPriceX96,
              liquidity: state.liquidity,
              tickCurrent: state.tick
            });
          case 36:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function swap(_x5, _x6, _x7) {
      return _swap.apply(this, arguments);
    }
    return swap;
  }();
  return _createClass(Pool, [{
    key: "token0Price",
    get: function get() {
      var _this$_token0Price;
      return (_this$_token0Price = this._token0Price) != null ? _this$_token0Price : this._token0Price = new Price(this.token0, this.token1, Q192, JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96));
    }
    /**
     * Returns the current mid price of the pool in terms of token1, i.e. the ratio of token0 over token1
     */
  }, {
    key: "token1Price",
    get: function get() {
      var _this$_token1Price;
      return (_this$_token1Price = this._token1Price) != null ? _this$_token1Price : this._token1Price = new Price(this.token1, this.token0, JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96), Q192);
    }
  }, {
    key: "tickSpacing",
    get: function get() {
      return TICK_SPACINGS[this.fee];
    }
  }]);
}();

var FullMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function FullMath() {}
  FullMath.mulDivRoundingUp = function mulDivRoundingUp(a, b, denominator) {
    var product = JSBI.multiply(a, b);
    var result = JSBI.divide(product, denominator);
    if (JSBI.notEqual(JSBI.remainder(product, denominator), ZERO)) result = JSBI.add(result, ONE);
    return result;
  };
  return FullMath;
}();

var MaxUint160 = /*#__PURE__*/JSBI.subtract(/*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(160)), ONE);
function multiplyIn256(x, y) {
  var product = JSBI.multiply(x, y);
  return JSBI.bitwiseAnd(product, MaxUint256);
}
function addIn256(x, y) {
  var sum = JSBI.add(x, y);
  return JSBI.bitwiseAnd(sum, MaxUint256);
}
var SqrtPriceMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SqrtPriceMath() {}
  SqrtPriceMath.getAmount0Delta = function getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
      var _ref = [sqrtRatioBX96, sqrtRatioAX96];
      sqrtRatioAX96 = _ref[0];
      sqrtRatioBX96 = _ref[1];
    }
    var numerator1 = JSBI.leftShift(liquidity, JSBI.BigInt(96));
    var numerator2 = JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96);
    return roundUp ? FullMath.mulDivRoundingUp(FullMath.mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96), ONE, sqrtRatioAX96) : JSBI.divide(JSBI.divide(JSBI.multiply(numerator1, numerator2), sqrtRatioBX96), sqrtRatioAX96);
  };
  SqrtPriceMath.getAmount1Delta = function getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
      var _ref2 = [sqrtRatioBX96, sqrtRatioAX96];
      sqrtRatioAX96 = _ref2[0];
      sqrtRatioBX96 = _ref2[1];
    }
    return roundUp ? FullMath.mulDivRoundingUp(liquidity, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96), Q96) : JSBI.divide(JSBI.multiply(liquidity, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96)), Q96);
  };
  SqrtPriceMath.getNextSqrtPriceFromInput = function getNextSqrtPriceFromInput(sqrtPX96, liquidity, amountIn, zeroForOne) {
    !JSBI.greaterThan(sqrtPX96, ZERO) ?  invariant(false)  : void 0;
    !JSBI.greaterThan(liquidity, ZERO) ?  invariant(false)  : void 0;
    return zeroForOne ? this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountIn, true) : this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountIn, true);
  };
  SqrtPriceMath.getNextSqrtPriceFromOutput = function getNextSqrtPriceFromOutput(sqrtPX96, liquidity, amountOut, zeroForOne) {
    !JSBI.greaterThan(sqrtPX96, ZERO) ?  invariant(false)  : void 0;
    !JSBI.greaterThan(liquidity, ZERO) ?  invariant(false)  : void 0;
    return zeroForOne ? this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountOut, false) : this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountOut, false);
  };
  SqrtPriceMath.getNextSqrtPriceFromAmount0RoundingUp = function getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amount, add) {
    if (JSBI.equal(amount, ZERO)) return sqrtPX96;
    var numerator1 = JSBI.leftShift(liquidity, JSBI.BigInt(96));
    if (add) {
      var product = multiplyIn256(amount, sqrtPX96);
      if (JSBI.equal(JSBI.divide(product, amount), sqrtPX96)) {
        var denominator = addIn256(numerator1, product);
        if (JSBI.greaterThanOrEqual(denominator, numerator1)) {
          return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator);
        }
      }
      return FullMath.mulDivRoundingUp(numerator1, ONE, JSBI.add(JSBI.divide(numerator1, sqrtPX96), amount));
    } else {
      var _product = multiplyIn256(amount, sqrtPX96);
      !JSBI.equal(JSBI.divide(_product, amount), sqrtPX96) ?  invariant(false)  : void 0;
      !JSBI.greaterThan(numerator1, _product) ?  invariant(false)  : void 0;
      var _denominator = JSBI.subtract(numerator1, _product);
      return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, _denominator);
    }
  };
  SqrtPriceMath.getNextSqrtPriceFromAmount1RoundingDown = function getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amount, add) {
    if (add) {
      var quotient = JSBI.lessThanOrEqual(amount, MaxUint160) ? JSBI.divide(JSBI.leftShift(amount, JSBI.BigInt(96)), liquidity) : JSBI.divide(JSBI.multiply(amount, Q96), liquidity);
      return JSBI.add(sqrtPX96, quotient);
    } else {
      var _quotient = FullMath.mulDivRoundingUp(amount, Q96, liquidity);
      !JSBI.greaterThan(sqrtPX96, _quotient) ?  invariant(false)  : void 0;
      return JSBI.subtract(sqrtPX96, _quotient);
    }
  };
  return SqrtPriceMath;
}();

var TWO = /*#__PURE__*/JSBI.BigInt(2);
var POWERS_OF_2 = /*#__PURE__*/[128, 64, 32, 16, 8, 4, 2, 1].map(function (pow) {
  return [pow, JSBI.exponentiate(TWO, JSBI.BigInt(pow))];
});
function mostSignificantBit(x) {
  !JSBI.greaterThan(x, ZERO) ?  invariant(false, "ZERO")  : void 0;
  !JSBI.lessThanOrEqual(x, MaxUint256) ?  invariant(false, "MAX")  : void 0;
  var msb = 0;
  for (var _iterator = _createForOfIteratorHelperLoose(POWERS_OF_2), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
      power = _step$value[0],
      min = _step$value[1];
    if (JSBI.greaterThanOrEqual(x, min)) {
      x = JSBI.signedRightShift(x, JSBI.BigInt(power));
      msb += power;
    }
  }
  return msb;
}

function mulShift(val, mulBy) {
  return JSBI.signedRightShift(JSBI.multiply(val, JSBI.BigInt(mulBy)), JSBI.BigInt(128));
}
var Q32 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(32));
var TickMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function TickMath() {}
  /**
   * Returns the sqrt ratio as a Q64.96 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick
   * @param tick the tick for which to compute the sqrt ratio
   */
  TickMath.getSqrtRatioAtTick = function getSqrtRatioAtTick(tick) {
    !(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK && Number.isInteger(tick)) ?  invariant(false, "TICK")  : void 0;
    var absTick = tick < 0 ? tick * -1 : tick;
    var ratio = (absTick & 0x1) != 0 ? JSBI.BigInt("0xfffcb933bd6fad37aa2d162d1a594001") : JSBI.BigInt("0x100000000000000000000000000000000");
    if ((absTick & 0x2) != 0) ratio = mulShift(ratio, "0xfff97272373d413259a46990580e213a");
    if ((absTick & 0x4) != 0) ratio = mulShift(ratio, "0xfff2e50f5f656932ef12357cf3c7fdcc");
    if ((absTick & 0x8) != 0) ratio = mulShift(ratio, "0xffe5caca7e10e4e61c3624eaa0941cd0");
    if ((absTick & 0x10) != 0) ratio = mulShift(ratio, "0xffcb9843d60f6159c9db58835c926644");
    if ((absTick & 0x20) != 0) ratio = mulShift(ratio, "0xff973b41fa98c081472e6896dfb254c0");
    if ((absTick & 0x40) != 0) ratio = mulShift(ratio, "0xff2ea16466c96a3843ec78b326b52861");
    if ((absTick & 0x80) != 0) ratio = mulShift(ratio, "0xfe5dee046a99a2a811c461f1969c3053");
    if ((absTick & 0x100) != 0) ratio = mulShift(ratio, "0xfcbe86c7900a88aedcffc83b479aa3a4");
    if ((absTick & 0x200) != 0) ratio = mulShift(ratio, "0xf987a7253ac413176f2b074cf7815e54");
    if ((absTick & 0x400) != 0) ratio = mulShift(ratio, "0xf3392b0822b70005940c7a398e4b70f3");
    if ((absTick & 0x800) != 0) ratio = mulShift(ratio, "0xe7159475a2c29b7443b29c7fa6e889d9");
    if ((absTick & 0x1000) != 0) ratio = mulShift(ratio, "0xd097f3bdfd2022b8845ad8f792aa5825");
    if ((absTick & 0x2000) != 0) ratio = mulShift(ratio, "0xa9f746462d870fdf8a65dc1f90e061e5");
    if ((absTick & 0x4000) != 0) ratio = mulShift(ratio, "0x70d869a156d2a1b890bb3df62baf32f7");
    if ((absTick & 0x8000) != 0) ratio = mulShift(ratio, "0x31be135f97d08fd981231505542fcfa6");
    if ((absTick & 0x10000) != 0) ratio = mulShift(ratio, "0x9aa508b5b7a84e1c677de54f3e99bc9");
    if ((absTick & 0x20000) != 0) ratio = mulShift(ratio, "0x5d6af8dedb81196699c329225ee604");
    if ((absTick & 0x40000) != 0) ratio = mulShift(ratio, "0x2216e584f5fa1ea926041bedfe98");
    if ((absTick & 0x80000) != 0) ratio = mulShift(ratio, "0x48a170391f7dc42444e8fa2");
    if (tick > 0) ratio = JSBI.divide(MaxUint256, ratio);
    // back to Q96
    return JSBI.greaterThan(JSBI.remainder(ratio, Q32), ZERO) ? JSBI.add(JSBI.divide(ratio, Q32), ONE) : JSBI.divide(ratio, Q32);
  }
  /**
   * Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) <= sqrtRatioX96
   * and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX96
   * @param sqrtRatioX96 the sqrt ratio as a Q64.96 for which to compute the tick
   */;
  TickMath.getTickAtSqrtRatio = function getTickAtSqrtRatio(sqrtRatioX96) {
    !(JSBI.greaterThanOrEqual(sqrtRatioX96, TickMath.MIN_SQRT_RATIO) && JSBI.lessThan(sqrtRatioX96, TickMath.MAX_SQRT_RATIO)) ?  invariant(false, "SQRT_RATIO")  : void 0;
    var sqrtRatioX128 = JSBI.leftShift(sqrtRatioX96, JSBI.BigInt(32));
    var msb = mostSignificantBit(sqrtRatioX128);
    var r;
    if (JSBI.greaterThanOrEqual(JSBI.BigInt(msb), JSBI.BigInt(128))) {
      r = JSBI.signedRightShift(sqrtRatioX128, JSBI.BigInt(msb - 127));
    } else {
      r = JSBI.leftShift(sqrtRatioX128, JSBI.BigInt(127 - msb));
    }
    var log_2 = JSBI.leftShift(JSBI.subtract(JSBI.BigInt(msb), JSBI.BigInt(128)), JSBI.BigInt(64));
    for (var i = 0; i < 14; i++) {
      r = JSBI.signedRightShift(JSBI.multiply(r, r), JSBI.BigInt(127));
      var f = JSBI.signedRightShift(r, JSBI.BigInt(128));
      log_2 = JSBI.bitwiseOr(log_2, JSBI.leftShift(f, JSBI.BigInt(63 - i)));
      r = JSBI.signedRightShift(r, f);
    }
    var log_sqrt10001 = JSBI.multiply(log_2, JSBI.BigInt("255738958999603826347141"));
    var tickLow = JSBI.toNumber(JSBI.signedRightShift(JSBI.subtract(log_sqrt10001, JSBI.BigInt("3402992956809132418596140100660247210")), JSBI.BigInt(128)));
    var tickHigh = JSBI.toNumber(JSBI.signedRightShift(JSBI.add(log_sqrt10001, JSBI.BigInt("291339464771989622907027621153398088495")), JSBI.BigInt(128)));
    return tickLow === tickHigh ? tickLow : JSBI.lessThanOrEqual(TickMath.getSqrtRatioAtTick(tickHigh), sqrtRatioX96) ? tickHigh : tickLow;
  };
  return TickMath;
}();
/**
 * The minimum tick that can be used on any pool.
 */
TickMath.MIN_TICK = -887272;
/**
 * The maximum tick that can be used on any pool.
 */
TickMath.MAX_TICK = -TickMath.MIN_TICK;
/**
 * The sqrt ratio corresponding to the minimum tick that could be used on any pool.
 */
TickMath.MIN_SQRT_RATIO = /*#__PURE__*/JSBI.BigInt("4295128739");
/**
 * The sqrt ratio corresponding to the maximum tick that could be used on any pool.
 */
TickMath.MAX_SQRT_RATIO = /*#__PURE__*/JSBI.BigInt("1461446703485210103287273052203988822378723970342");

/**
 * Represents a position on a Uniswap V3 Pool
 */
var Position = /*#__PURE__*/function () {
  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  function Position(_ref) {
    var pool = _ref.pool,
      liquidity = _ref.liquidity,
      tickLower = _ref.tickLower,
      tickUpper = _ref.tickUpper;
    // cached resuts for the getters
    this._token0Amount = null;
    this._token1Amount = null;
    this._mintAmounts = null;
    !(tickLower < tickUpper) ?  invariant(false, "TICK_ORDER")  : void 0;
    !(tickLower >= TickMath.MIN_TICK && tickLower % pool.tickSpacing === 0) ?  invariant(false, "TICK_LOWER")  : void 0;
    !(tickUpper <= TickMath.MAX_TICK && tickUpper % pool.tickSpacing === 0) ?  invariant(false, "TICK_UPPER")  : void 0;
    this.pool = pool;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = JSBI.BigInt(liquidity);
  }
  /**
   * Returns the price of token0 at the lower tick
   */
  var _proto = Position.prototype;
  /**
   * Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @returns The sqrt ratios after slippage
   */
  _proto.ratiosAfterSlippage = function ratiosAfterSlippage(slippageTolerance) {
    var priceLower = this.pool.token0Price.asFraction.multiply(new Percent(1).subtract(slippageTolerance));
    var priceUpper = this.pool.token0Price.asFraction.multiply(slippageTolerance.add(1));
    var sqrtRatioX96Lower = encodeSqrtRatioX96(priceLower.numerator, priceLower.denominator);
    if (JSBI.lessThanOrEqual(sqrtRatioX96Lower, TickMath.MIN_SQRT_RATIO)) {
      sqrtRatioX96Lower = JSBI.add(TickMath.MIN_SQRT_RATIO, JSBI.BigInt(1));
    }
    var sqrtRatioX96Upper = encodeSqrtRatioX96(priceUpper.numerator, priceUpper.denominator);
    if (JSBI.greaterThanOrEqual(sqrtRatioX96Upper, TickMath.MAX_SQRT_RATIO)) {
      sqrtRatioX96Upper = JSBI.subtract(TickMath.MAX_SQRT_RATIO, JSBI.BigInt(1));
    }
    return {
      sqrtRatioX96Lower: sqrtRatioX96Lower,
      sqrtRatioX96Upper: sqrtRatioX96Upper
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */;
  _proto.mintAmountsWithSlippage = function mintAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip = this.ratiosAfterSlippage(slippageTolerance),
      sqrtRatioX96Upper = _this$ratiosAfterSlip.sqrtRatioX96Upper,
      sqrtRatioX96Lower = _this$ratiosAfterSlip.sqrtRatioX96Lower;
    // construct counterfactual pools
    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Lower, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Upper, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper));
    // because the router is imprecise, we need to calculate the position that will be created (assuming no slippage)
    var positionThatWillBeCreated = Position.fromAmounts(_extends({
      pool: this.pool,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }, this.mintAmounts, {
      useFullPrecision: false
    }));
    // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...
    var amount0 = new Position({
      pool: poolUpper,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount0;
    // ...and the lower for amount1
    var amount1 = new Position({
      pool: poolLower,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount1;
    return {
      amount0: amount0,
      amount1: amount1
    };
  }
  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */;
  _proto.burnAmountsWithSlippage = function burnAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip2 = this.ratiosAfterSlippage(slippageTolerance),
      sqrtRatioX96Upper = _this$ratiosAfterSlip2.sqrtRatioX96Upper,
      sqrtRatioX96Lower = _this$ratiosAfterSlip2.sqrtRatioX96Lower;
    // construct counterfactual pools
    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Lower, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX96Upper, 0 /* liquidity doesn't matter */, TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper));
    // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...
    var amount0 = new Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount0;
    // ...and the lower for amount1
    var amount1 = new Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount1;
    return {
      amount0: amount0.quotient,
      amount1: amount1.quotient
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */;
  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param pool The pool for which the position should be created
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 token0 amount
   * @param amount1 token1 amount
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The amount of liquidity for the position
   */
  Position.fromAmounts = function fromAmounts(_ref2) {
    var pool = _ref2.pool,
      tickLower = _ref2.tickLower,
      tickUpper = _ref2.tickUpper,
      amount0 = _ref2.amount0,
      amount1 = _ref2.amount1,
      useFullPrecision = _ref2.useFullPrecision;
    var sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    var sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
    return new Position({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      liquidity: maxLiquidityForAmounts(pool.sqrtRatioX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision)
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount0 The desired amount of token0
   * @param useFullPrecision If true, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The position
   */;
  Position.fromAmount0 = function fromAmount0(_ref3) {
    var pool = _ref3.pool,
      tickLower = _ref3.tickLower,
      tickUpper = _ref3.tickUpper,
      amount0 = _ref3.amount0,
      useFullPrecision = _ref3.useFullPrecision;
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: amount0,
      amount1: MaxUint256,
      useFullPrecision: useFullPrecision
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount1 The desired amount of token1
   * @returns The position
   */;
  Position.fromAmount1 = function fromAmount1(_ref4) {
    var pool = _ref4.pool,
      tickLower = _ref4.tickLower,
      tickUpper = _ref4.tickUpper,
      amount1 = _ref4.amount1;
    // this function always uses full precision,
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: MaxUint256,
      amount1: amount1,
      useFullPrecision: true
    });
  };
  return _createClass(Position, [{
    key: "token0PriceLower",
    get: function get() {
      return tickToPrice(this.pool.token0, this.pool.token1, this.tickLower);
    }
    /**
     * Returns the price of token0 at the upper tick
     */
  }, {
    key: "token0PriceUpper",
    get: function get() {
      return tickToPrice(this.pool.token0, this.pool.token1, this.tickUpper);
    }
    /**
     * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
     */
  }, {
    key: "amount0",
    get: function get() {
      if (this._token0Amount === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, SqrtPriceMath.getAmount0Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX96, TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, ZERO);
        }
      }
      return this._token0Amount;
    }
    /**
     * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
     */
  }, {
    key: "amount1",
    get: function get() {
      if (this._token1Amount === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, ZERO);
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX96, this.liquidity, false));
        } else {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        }
      }
      return this._token1Amount;
    }
  }, {
    key: "mintAmounts",
    get: function get() {
      if (this._mintAmounts === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          return {
            amount0: SqrtPriceMath.getAmount0Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: ZERO
          };
        } else if (this.pool.tickCurrent < this.tickUpper) {
          return {
            amount0: SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX96, TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX96, this.liquidity, true)
          };
        } else {
          return {
            amount0: ZERO,
            amount1: SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true)
          };
        }
      }
      return this._mintAmounts;
    }
  }]);
}();

/**
 * Represents a list of pools through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */
var RouteSDK = /*#__PURE__*/function () {
  /**
   * Creates an instance of route.
   * @param pools An array of `Pool` objects, ordered by the route the swap will take
   * @param input The input token
   * @param output The output token
   */
  function RouteSDK(pools, input, output) {
    this._midPrice = null;
    !(pools.length > 0) ?  invariant(false, "POOLS")  : void 0;
    var wrappedInput = input.wrapped;
    !pools[0].involvesToken(wrappedInput) ?  invariant(false, "INPUT")  : void 0;
    !pools[pools.length - 1].involvesToken(output.wrapped) ?  invariant(false, "OUTPUT")  : void 0;
    /**
     * Normalizes token0-token1 order and selects the next token/fee step to add to the path
     * */
    var tokenPath = [wrappedInput];
    for (var _iterator = _createForOfIteratorHelperLoose(pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        i = _step$value[0],
        pool = _step$value[1];
      var currentInputToken = tokenPath[i];
      !(currentInputToken.equals(pool.token0) || currentInputToken.equals(pool.token1)) ?  invariant(false, "PATH")  : void 0;
      var nextToken = currentInputToken.equals(pool.token0) ? pool.token1 : pool.token0;
      tokenPath.push(nextToken);
    }
    this.pools = pools;
    this.tokenPath = tokenPath;
    this.input = input;
    this.output = output != null ? output : tokenPath[tokenPath.length - 1];
  }
  /**
   * Returns the mid price of the route
   */
  return _createClass(RouteSDK, [{
    key: "midPrice",
    get: function get() {
      if (this._midPrice !== null) return this._midPrice;
      var price = this.pools.slice(1).reduce(function (_ref, pool) {
        var nextInput = _ref.nextInput,
          price = _ref.price;
        return nextInput.equals(pool.token0) ? {
          nextInput: pool.token1,
          price: price.multiply(pool.token0Price)
        } : {
          nextInput: pool.token0,
          price: price.multiply(pool.token1Price)
        };
      }, this.pools[0].token0.equals(this.input.wrapped) ? {
        nextInput: this.pools[0].token1,
        price: this.pools[0].token0Price
      } : {
        nextInput: this.pools[0].token0,
        price: this.pools[0].token1Price
      }).price;
      return this._midPrice = new Price(this.input, this.output, price.denominator, price.numerator);
    }
  }]);
}();
// V3 route wrapper
var Route = /*#__PURE__*/function (_RouteSDK) {
  function Route(v3Route) {
    var _this;
    _this = _RouteSDK.call(this, v3Route.pools, v3Route.input, v3Route.output) || this;
    _this.path = v3Route.tokenPath;
    return _this;
  }
  _inheritsLoose(Route, _RouteSDK);
  return Route;
}(RouteSDK);

var ONE_HUNDRED_PERCENT = /*#__PURE__*/new Percent(100, 100);
var ZERO_PERCENT = /*#__PURE__*/new Percent(ZERO);
/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */
function tradeComparator(a, b) {
  // must have same input and output token for comparison
  !a.inputAmount.currency.equals(b.inputAmount.currency) ?  invariant(false, "INPUT_CURRENCY")  : void 0;
  !a.outputAmount.currency.equals(b.outputAmount.currency) ?  invariant(false, "OUTPUT_CURRENCY")  : void 0;
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      var aHops = a.swaps.reduce(function (total, cur) {
        return total + cur.route.tokenPath.length;
      }, 0);
      var bHops = b.swaps.reduce(function (total, cur) {
        return total + cur.route.tokenPath.length;
      }, 0);
      return aHops - bHops;
    }
    // trade A requires less input than trade B, so A should come first
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}
/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 */
var TradeSDK = /*#__PURE__*/function () {
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  function TradeSDK(_ref) {
    var routes = _ref.routes,
      tradeType = _ref.tradeType;
    var inputCurrency = routes[0].inputAmount.currency;
    var outputCurrency = routes[0].outputAmount.currency;
    !routes.every(function (_ref2) {
      var route = _ref2.route;
      return inputCurrency.wrapped.equals(route.input.wrapped);
    }) ?  invariant(false, "INPUT_CURRENCY_MATCH")  : void 0;
    !routes.every(function (_ref3) {
      var route = _ref3.route;
      return outputCurrency.wrapped.equals(route.output.wrapped);
    }) ?  invariant(false, "OUTPUT_CURRENCY_MATCH")  : void 0;
    var numPools = routes.map(function (_ref4) {
      var route = _ref4.route;
      return route.pools.length;
    }).reduce(function (total, cur) {
      return total + cur;
    }, 0);
    var poolAddressSet = new Set();
    for (var _iterator = _createForOfIteratorHelperLoose(routes), _step; !(_step = _iterator()).done;) {
      var route = _step.value.route;
      for (var _iterator2 = _createForOfIteratorHelperLoose(route.pools), _step2; !(_step2 = _iterator2()).done;) {
        var pool = _step2.value;
        poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee));
      }
    }
    !(numPools == poolAddressSet.size) ?  invariant(false, "POOLS_DUPLICATED")  : void 0;
    this.swaps = routes;
    this.tradeType = tradeType;
  }
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */
  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  TradeSDK.exactIn =
  /*#__PURE__*/
  function () {
    var _exactIn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(route, amountIn) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", TradeSDK.fromRoute(route, amountIn, exports.TradeType.EXACT_INPUT));
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function exactIn(_x, _x2) {
      return _exactIn.apply(this, arguments);
    }
    return exactIn;
  }()
  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  ;
  TradeSDK.exactOut =
  /*#__PURE__*/
  function () {
    var _exactOut = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(route, amountOut) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", TradeSDK.fromRoute(route, amountOut, exports.TradeType.EXACT_OUTPUT));
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function exactOut(_x3, _x4) {
      return _exactOut.apply(this, arguments);
    }
    return exactOut;
  }()
  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  ;
  TradeSDK.fromRoute =
  /*#__PURE__*/
  function () {
    var _fromRoute = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(route, amount, tradeType) {
      var amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput, _outputAmount, _i, _pool, _yield$_pool$getInput, _inputAmount;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            amounts = new Array(route.tokenPath.length);
            if (!(tradeType === exports.TradeType.EXACT_INPUT)) {
              _context3.next = 19;
              break;
            }
            !amount.currency.equals(route.input) ?  invariant(false, "INPUT")  : void 0;
            amounts[0] = amount.wrapped;
            i = 0;
          case 5:
            if (!(i < route.tokenPath.length - 1)) {
              _context3.next = 15;
              break;
            }
            pool = route.pools[i];
            _context3.next = 9;
            return pool.getOutputAmount(amounts[i]);
          case 9:
            _yield$pool$getOutput = _context3.sent;
            _outputAmount = _yield$pool$getOutput[0];
            amounts[i + 1] = _outputAmount;
          case 12:
            i++;
            _context3.next = 5;
            break;
          case 15:
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
            _context3.next = 34;
            break;
          case 19:
            !amount.currency.equals(route.output) ?  invariant(false, "OUTPUT")  : void 0;
            amounts[amounts.length - 1] = amount.wrapped;
            _i = route.tokenPath.length - 1;
          case 22:
            if (!(_i > 0)) {
              _context3.next = 32;
              break;
            }
            _pool = route.pools[_i - 1];
            _context3.next = 26;
            return _pool.getInputAmount(amounts[_i]);
          case 26:
            _yield$_pool$getInput = _context3.sent;
            _inputAmount = _yield$_pool$getInput[0];
            amounts[_i - 1] = _inputAmount;
          case 29:
            _i--;
            _context3.next = 22;
            break;
          case 32:
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
          case 34:
            return _context3.abrupt("return", new TradeSDK({
              routes: [{
                inputAmount: inputAmount,
                outputAmount: outputAmount,
                route: route
              }],
              tradeType: tradeType
            }));
          case 35:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function fromRoute(_x5, _x6, _x7) {
      return _fromRoute.apply(this, arguments);
    }
    return fromRoute;
  }()
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  ;
  TradeSDK.fromRoutes =
  /*#__PURE__*/
  function () {
    var _fromRoutes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(routes, tradeType) {
      var populatedRoutes, _iterator3, _step3, _step3$value, route, amount, amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput2, _outputAmount2, _i2, _pool2, _yield$_pool2$getInpu, _inputAmount2;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            populatedRoutes = [];
            _iterator3 = _createForOfIteratorHelperLoose(routes);
          case 2:
            if ((_step3 = _iterator3()).done) {
              _context4.next = 43;
              break;
            }
            _step3$value = _step3.value, route = _step3$value.route, amount = _step3$value.amount;
            amounts = new Array(route.tokenPath.length);
            inputAmount = void 0;
            outputAmount = void 0;
            if (!(tradeType === exports.TradeType.EXACT_INPUT)) {
              _context4.next = 25;
              break;
            }
            !amount.currency.equals(route.input) ?  invariant(false, "INPUT")  : void 0;
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
            amounts[0] = CurrencyAmount.fromFractionalAmount(route.input.wrapped, amount.numerator, amount.denominator);
            i = 0;
          case 12:
            if (!(i < route.tokenPath.length - 1)) {
              _context4.next = 22;
              break;
            }
            pool = route.pools[i];
            _context4.next = 16;
            return pool.getOutputAmount(amounts[i]);
          case 16:
            _yield$pool$getOutput2 = _context4.sent;
            _outputAmount2 = _yield$pool$getOutput2[0];
            amounts[i + 1] = _outputAmount2;
          case 19:
            i++;
            _context4.next = 12;
            break;
          case 22:
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
            _context4.next = 40;
            break;
          case 25:
            !amount.currency.equals(route.output) ?  invariant(false, "OUTPUT")  : void 0;
            outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
            amounts[amounts.length - 1] = CurrencyAmount.fromFractionalAmount(route.output.wrapped, amount.numerator, amount.denominator);
            _i2 = route.tokenPath.length - 1;
          case 29:
            if (!(_i2 > 0)) {
              _context4.next = 39;
              break;
            }
            _pool2 = route.pools[_i2 - 1];
            _context4.next = 33;
            return _pool2.getInputAmount(amounts[_i2]);
          case 33:
            _yield$_pool2$getInpu = _context4.sent;
            _inputAmount2 = _yield$_pool2$getInpu[0];
            amounts[_i2 - 1] = _inputAmount2;
          case 36:
            _i2--;
            _context4.next = 29;
            break;
          case 39:
            inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
          case 40:
            populatedRoutes.push({
              route: route,
              inputAmount: inputAmount,
              outputAmount: outputAmount
            });
          case 41:
            _context4.next = 2;
            break;
          case 43:
            return _context4.abrupt("return", new TradeSDK({
              routes: populatedRoutes,
              tradeType: tradeType
            }));
          case 44:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    function fromRoutes(_x8, _x9) {
      return _fromRoutes.apply(this, arguments);
    }
    return fromRoutes;
  }()
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;
  TradeSDK.createUncheckedTrade = function createUncheckedTrade(constructorArguments) {
    return new TradeSDK(_extends({}, constructorArguments, {
      routes: [{
        inputAmount: constructorArguments.inputAmount,
        outputAmount: constructorArguments.outputAmount,
        route: constructorArguments.route
      }]
    }));
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */;
  TradeSDK.createUncheckedTradeWithMultipleRoutes = function createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new TradeSDK(constructorArguments);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */;
  var _proto = TradeSDK.prototype;
  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, "SLIPPAGE_TOLERANCE")  : void 0;
    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */;
  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, "SLIPPAGE_TOLERANCE")  : void 0;
    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */;
  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */;
  TradeSDK.bestTradeExactIn =
  /*#__PURE__*/
  function () {
    var _bestTradeExactIn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(pools, currencyAmountIn, currencyOut, _temp,
    // used in recursion.
    currentPools, nextAmountIn, bestTrades) {
      var _ref5, _ref5$maxNumResults, maxNumResults, _ref5$maxHops, maxHops, amountIn, tokenOut, i, pool, amountOut, _yield$pool$getOutput3, poolsExcludingThisPool;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _ref5 = _temp === void 0 ? {} : _temp, _ref5$maxNumResults = _ref5.maxNumResults, maxNumResults = _ref5$maxNumResults === void 0 ? 3 : _ref5$maxNumResults, _ref5$maxHops = _ref5.maxHops, maxHops = _ref5$maxHops === void 0 ? 3 : _ref5$maxHops;
            if (currentPools === void 0) {
              currentPools = [];
            }
            if (nextAmountIn === void 0) {
              nextAmountIn = currencyAmountIn;
            }
            if (bestTrades === void 0) {
              bestTrades = [];
            }
            !(pools.length > 0) ?  invariant(false, "POOLS")  : void 0;
            !(maxHops > 0) ?  invariant(false, "MAX_HOPS")  : void 0;
            !(currencyAmountIn === nextAmountIn || currentPools.length > 0) ?  invariant(false, "INVALID_RECURSION")  : void 0;
            amountIn = nextAmountIn.wrapped;
            tokenOut = currencyOut.wrapped;
            i = 0;
          case 10:
            if (!(i < pools.length)) {
              _context5.next = 45;
              break;
            }
            pool = pools[i]; // pool irrelevant
            if (!(!pool.token0.equals(amountIn.currency) && !pool.token1.equals(amountIn.currency))) {
              _context5.next = 14;
              break;
            }
            return _context5.abrupt("continue", 42);
          case 14:
            amountOut = void 0;
            _context5.prev = 15;
            _context5.next = 18;
            return pool.getOutputAmount(amountIn);
          case 18:
            _yield$pool$getOutput3 = _context5.sent;
            amountOut = _yield$pool$getOutput3[0];
            _context5.next = 27;
            break;
          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](15);
            if (!(_context5.t0 != null && _context5.t0.isInsufficientInputAmountError)) {
              _context5.next = 26;
              break;
            }
            return _context5.abrupt("continue", 42);
          case 26:
            throw _context5.t0;
          case 27:
            if (!(amountOut.currency.isToken && amountOut.currency.equals(tokenOut))) {
              _context5.next = 38;
              break;
            }
            _context5.t1 = sortedInsert;
            _context5.t2 = bestTrades;
            _context5.next = 32;
            return TradeSDK.fromRoute(new RouteSDK([].concat(currentPools, [pool]), currencyAmountIn.currency, currencyOut), currencyAmountIn, exports.TradeType.EXACT_INPUT);
          case 32:
            _context5.t3 = _context5.sent;
            _context5.t4 = maxNumResults;
            _context5.t5 = tradeComparator;
            (0, _context5.t1)(_context5.t2, _context5.t3, _context5.t4, _context5.t5);
            _context5.next = 42;
            break;
          case 38:
            if (!(maxHops > 1 && pools.length > 1)) {
              _context5.next = 42;
              break;
            }
            poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops
            _context5.next = 42;
            return TradeSDK.bestTradeExactIn(poolsExcludingThisPool, currencyAmountIn, currencyOut, {
              maxNumResults: maxNumResults,
              maxHops: maxHops - 1
            }, [].concat(currentPools, [pool]), amountOut, bestTrades);
          case 42:
            i++;
            _context5.next = 10;
            break;
          case 45:
            return _context5.abrupt("return", bestTrades);
          case 46:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[15, 22]]);
    }));
    function bestTradeExactIn(_x10, _x11, _x12, _x13, _x14, _x15, _x16) {
      return _bestTradeExactIn.apply(this, arguments);
    }
    return bestTradeExactIn;
  }()
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  ;
  TradeSDK.bestTradeExactOut =
  /*#__PURE__*/
  function () {
    var _bestTradeExactOut = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(pools, currencyIn, currencyAmountOut, _temp2,
    // used in recursion.
    currentPools, nextAmountOut, bestTrades) {
      var _ref6, _ref6$maxNumResults, maxNumResults, _ref6$maxHops, maxHops, amountOut, tokenIn, i, pool, amountIn, _yield$pool$getInputA, poolsExcludingThisPool;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _ref6 = _temp2 === void 0 ? {} : _temp2, _ref6$maxNumResults = _ref6.maxNumResults, maxNumResults = _ref6$maxNumResults === void 0 ? 3 : _ref6$maxNumResults, _ref6$maxHops = _ref6.maxHops, maxHops = _ref6$maxHops === void 0 ? 3 : _ref6$maxHops;
            if (currentPools === void 0) {
              currentPools = [];
            }
            if (nextAmountOut === void 0) {
              nextAmountOut = currencyAmountOut;
            }
            if (bestTrades === void 0) {
              bestTrades = [];
            }
            !(pools.length > 0) ?  invariant(false, "POOLS")  : void 0;
            !(maxHops > 0) ?  invariant(false, "MAX_HOPS")  : void 0;
            !(currencyAmountOut === nextAmountOut || currentPools.length > 0) ?  invariant(false, "INVALID_RECURSION")  : void 0;
            amountOut = nextAmountOut.wrapped;
            tokenIn = currencyIn.wrapped;
            i = 0;
          case 10:
            if (!(i < pools.length)) {
              _context6.next = 45;
              break;
            }
            pool = pools[i]; // pool irrelevant
            if (!(!pool.token0.equals(amountOut.currency) && !pool.token1.equals(amountOut.currency))) {
              _context6.next = 14;
              break;
            }
            return _context6.abrupt("continue", 42);
          case 14:
            amountIn = void 0;
            _context6.prev = 15;
            _context6.next = 18;
            return pool.getInputAmount(amountOut);
          case 18:
            _yield$pool$getInputA = _context6.sent;
            amountIn = _yield$pool$getInputA[0];
            _context6.next = 27;
            break;
          case 22:
            _context6.prev = 22;
            _context6.t0 = _context6["catch"](15);
            if (!(_context6.t0 != null && _context6.t0.isInsufficientReservesError)) {
              _context6.next = 26;
              break;
            }
            return _context6.abrupt("continue", 42);
          case 26:
            throw _context6.t0;
          case 27:
            if (!amountIn.currency.equals(tokenIn)) {
              _context6.next = 38;
              break;
            }
            _context6.t1 = sortedInsert;
            _context6.t2 = bestTrades;
            _context6.next = 32;
            return TradeSDK.fromRoute(new RouteSDK([pool].concat(currentPools), currencyIn, currencyAmountOut.currency), currencyAmountOut, exports.TradeType.EXACT_OUTPUT);
          case 32:
            _context6.t3 = _context6.sent;
            _context6.t4 = maxNumResults;
            _context6.t5 = tradeComparator;
            (0, _context6.t1)(_context6.t2, _context6.t3, _context6.t4, _context6.t5);
            _context6.next = 42;
            break;
          case 38:
            if (!(maxHops > 1 && pools.length > 1)) {
              _context6.next = 42;
              break;
            }
            poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops
            _context6.next = 42;
            return TradeSDK.bestTradeExactOut(poolsExcludingThisPool, currencyIn, currencyAmountOut, {
              maxNumResults: maxNumResults,
              maxHops: maxHops - 1
            }, [pool].concat(currentPools), amountIn, bestTrades);
          case 42:
            i++;
            _context6.next = 10;
            break;
          case 45:
            return _context6.abrupt("return", bestTrades);
          case 46:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[15, 22]]);
    }));
    function bestTradeExactOut(_x17, _x18, _x19, _x20, _x21, _x22, _x23) {
      return _bestTradeExactOut.apply(this, arguments);
    }
    return bestTradeExactOut;
  }();
  return _createClass(TradeSDK, [{
    key: "route",
    get: function get() {
      !(this.swaps.length == 1) ?  invariant(false, "MULTIPLE_ROUTES")  : void 0;
      return this.swaps[0].route;
    }
    /**
     * The input amount for the trade assuming no slippage.
     */
  }, {
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }
      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref7) {
        var inputAmount = _ref7.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
    /**
     * The output amount for the trade assuming no slippage.
     */
  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }
      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref8) {
        var outputAmount = _ref8.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */
  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice;
      return (_this$_executionPrice = this._executionPrice) != null ? _this$_executionPrice : this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the percent difference between the route's mid price and the price impact
     */
  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }
      var spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);
      for (var _iterator4 = _createForOfIteratorHelperLoose(this.swaps), _step4; !(_step4 = _iterator4()).done;) {
        var _step4$value = _step4.value,
          route = _step4$value.route,
          inputAmount = _step4$value.inputAmount;
        var midPrice = route.midPrice;
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
      }
      var priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
      this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);
}();
var Trade = /*#__PURE__*/function () {
  //  construct a trade across v2 and v3 routes from pre-computed amounts
  function Trade(_ref9) {
    var v3Routes = _ref9.v3Routes,
      tradeType = _ref9.tradeType;
    this.swaps = [];
    this.routes = [];
    // wrap v3 routes
    for (var _iterator5 = _createForOfIteratorHelperLoose(v3Routes), _step5; !(_step5 = _iterator5()).done;) {
      var _step5$value = _step5.value,
        routev3 = _step5$value.routev3,
        inputAmount = _step5$value.inputAmount,
        outputAmount = _step5$value.outputAmount;
      var route = new Route(routev3);
      this.routes.push(route);
      this.swaps.push({
        route: route,
        inputAmount: inputAmount,
        outputAmount: outputAmount
      });
    }
    if (this.swaps.length === 0) {
      throw new Error("No routes provided when calling Trade constructor");
    }
    this.tradeType = tradeType;
    // each route must have the same input and output currency
    var inputCurrency = this.swaps[0].inputAmount.currency;
    var outputCurrency = this.swaps[0].outputAmount.currency;
    !this.swaps.every(function (_ref10) {
      var route = _ref10.route;
      return inputCurrency.wrapped.equals(route.input.wrapped);
    }) ?  invariant(false, "INPUT_CURRENCY_MATCH")  : void 0;
    !this.swaps.every(function (_ref11) {
      var route = _ref11.route;
      return outputCurrency.wrapped.equals(route.output.wrapped);
    }) ?  invariant(false, "OUTPUT_CURRENCY_MATCH")  : void 0;
    // pools must be unique inter protocols
    var numPools = this.swaps.map(function (_ref12) {
      var route = _ref12.route;
      return route.pools.length;
    }).reduce(function (total, cur) {
      return total + cur;
    }, 0);
    var poolAddressSet = new Set();
    for (var _iterator6 = _createForOfIteratorHelperLoose(this.swaps), _step6; !(_step6 = _iterator6()).done;) {
      var _route = _step6.value.route;
      for (var _iterator7 = _createForOfIteratorHelperLoose(_route.pools), _step7; !(_step7 = _iterator7()).done;) {
        var pool = _step7.value;
        if (pool instanceof Pool) {
          poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee));
        } else {
          throw new Error("Unexpected pool type in route when constructing trade object");
        }
      }
    }
    !(numPools == poolAddressSet.size) ?  invariant(false, "POOLS_DUPLICATED")  : void 0;
  }
  var _proto2 = Trade.prototype;
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  _proto2.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, "SLIPPAGE_TOLERANCE")  : void 0;
    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */;
  _proto2.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, "SLIPPAGE_TOLERANCE")  : void 0;
    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */;
  _proto2.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  };
  Trade.fromRoutes = /*#__PURE__*/function () {
    var _fromRoutes2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(v3Routes, tradeType) {
      var populatedV3Routes, _iterator8, _step8, _step8$value, routev3, amount, v3Trade, inputAmount, outputAmount;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            populatedV3Routes = [];
            _iterator8 = _createForOfIteratorHelperLoose(v3Routes);
          case 2:
            if ((_step8 = _iterator8()).done) {
              _context7.next = 11;
              break;
            }
            _step8$value = _step8.value, routev3 = _step8$value.routev3, amount = _step8$value.amount;
            _context7.next = 6;
            return TradeSDK.fromRoute(routev3, amount, tradeType);
          case 6:
            v3Trade = _context7.sent;
            inputAmount = v3Trade.inputAmount, outputAmount = v3Trade.outputAmount;
            populatedV3Routes.push({
              routev3: routev3,
              inputAmount: inputAmount,
              outputAmount: outputAmount
            });
          case 9:
            _context7.next = 2;
            break;
          case 11:
            return _context7.abrupt("return", new Trade({
              v3Routes: populatedV3Routes,
              tradeType: tradeType
            }));
          case 12:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function fromRoutes(_x24, _x25) {
      return _fromRoutes2.apply(this, arguments);
    }
    return fromRoutes;
  }();
  Trade.fromRoute = /*#__PURE__*/function () {
    var _fromRoute2 = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(route, amount, tradeType) {
      var v3Routes, v3Trade, inputAmount, outputAmount;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            v3Routes = [];
            if (!(route instanceof RouteSDK)) {
              _context8.next = 9;
              break;
            }
            _context8.next = 4;
            return TradeSDK.fromRoute(route, amount, tradeType);
          case 4:
            v3Trade = _context8.sent;
            inputAmount = v3Trade.inputAmount, outputAmount = v3Trade.outputAmount;
            v3Routes = [{
              routev3: route,
              inputAmount: inputAmount,
              outputAmount: outputAmount
            }];
            _context8.next = 10;
            break;
          case 9:
            throw new Error("Invalid route type");
          case 10:
            return _context8.abrupt("return", new Trade({
              v3Routes: v3Routes,
              tradeType: tradeType
            }));
          case 11:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    function fromRoute(_x26, _x27, _x28) {
      return _fromRoute2.apply(this, arguments);
    }
    return fromRoute;
  }();
  return _createClass(Trade, [{
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }
      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref13) {
        var inputAmount = _ref13.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }
      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref14) {
        var outputAmount = _ref14.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */
  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice2;
      return (_this$_executionPrice2 = this._executionPrice) != null ? _this$_executionPrice2 : this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the sell tax of the input token
     */
  }, {
    key: "inputTax",
    get: function get() {
      var inputCurrency = this.inputAmount.currency;
      if (inputCurrency.isNative || !inputCurrency.wrapped.sellFeeBps) return ZERO_PERCENT;
      return new Percent(inputCurrency.wrapped.sellFeeBps.toNumber(), 10000);
    }
    /**
     * Returns the buy tax of the output token
     */
  }, {
    key: "outputTax",
    get: function get() {
      var outputCurrency = this.outputAmount.currency;
      if (outputCurrency.isNative || !outputCurrency.wrapped.buyFeeBps) return ZERO_PERCENT;
      return new Percent(outputCurrency.wrapped.buyFeeBps.toNumber(), 10000);
    }
    /**
     * Returns the percent difference between the route's mid price and the expected execution price
     * In order to exclude token taxes from the price impact calculation, the spot price is calculated
     * using a ratio of values that go into the pools, which are the post-tax input amount and pre-tax output amount.
     */
  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }
      // returns 0% price impact even though this may be inaccurate as a swap may have occured.
      // because we're unable to derive the pre-buy-tax amount, use 0% as a placeholder.
      if (this.outputTax.equalTo(ONE_HUNDRED_PERCENT)) return ZERO_PERCENT;
      var spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);
      for (var _iterator9 = _createForOfIteratorHelperLoose(this.swaps), _step9; !(_step9 = _iterator9()).done;) {
        var _step9$value = _step9.value,
          route = _step9$value.route,
          inputAmount = _step9$value.inputAmount;
        var midPrice = route.midPrice;
        var postTaxInputAmount = inputAmount.multiply(new Fraction(ONE).subtract(this.inputTax));
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(postTaxInputAmount));
      }
      // if the total output of this trade is 0, then most likely the post-tax input was also 0, and therefore this swap
      // does not move the pools' market price
      if (spotOutputAmount.equalTo(ZERO)) return ZERO_PERCENT;
      var preTaxOutputAmount = this.outputAmount.divide(new Fraction(ONE).subtract(this.outputTax));
      var priceImpact = spotOutputAmount.subtract(preTaxOutputAmount).divide(spotOutputAmount);
      this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);
}();

(function (Protocol) {
  Protocol["V2"] = "V2";
  Protocol["V3"] = "V3";
  Protocol["MIXED"] = "MIXED";
})(exports.Protocol || (exports.Protocol = {}));

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */
function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var quotedOutputAmount = midPrice.quote(inputAmount);
  // calculate price impact := (exactQuote - outputAmount) / exactQuote
  var priceImpact = quotedOutputAmount.subtract(outputAmount).divide(quotedOutputAmount);
  return new Percent(priceImpact.numerator, priceImpact.denominator);
}

// given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item
function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, "MAX_SIZE_ZERO")  : void 0;
  // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize
  !(items.length <= maxSize) ?  invariant(false, "ITEMS_SIZE")  : void 0;
  // short circuit first item add
  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize;
    // short circuit if full and the additional item does not come before the last item
    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }
    var lo = 0,
      hi = items.length;
    while (lo < hi) {
      var mid = lo + hi >>> 1;
      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

var MAX_SAFE_INTEGER = /*#__PURE__*/JSBI.BigInt(Number.MAX_SAFE_INTEGER);
var ZERO$1 = /*#__PURE__*/JSBI.BigInt(0);
var ONE$1 = /*#__PURE__*/JSBI.BigInt(1);
var TWO$1 = /*#__PURE__*/JSBI.BigInt(2);
/**
 * Computes floor(sqrt(value))
 * @param value the value for which to compute the square root, rounded down
 */
function sqrt(value) {
  !JSBI.greaterThanOrEqual(value, ZERO$1) ?  invariant(false, "NEGATIVE")  : void 0;
  // rely on built in sqrt if possible
  if (JSBI.lessThan(value, MAX_SAFE_INTEGER)) {
    return JSBI.BigInt(Math.floor(Math.sqrt(JSBI.toNumber(value))));
  }
  var z;
  var x;
  z = value;
  x = JSBI.add(JSBI.divide(value, TWO$1), ONE$1);
  while (JSBI.lessThan(x, z)) {
    z = x;
    x = JSBI.divide(JSBI.add(JSBI.divide(value, x), x), TWO$1);
  }
  return z;
}

/**
 * Validates an address and returns the parsed (checksummed) version of that address
 * @param address the unchecksummed hex address
 */
function validateAndParseAddress(address$1) {
  try {
    return address.getAddress(address$1);
  } catch (error) {
    throw new Error(address$1 + " is not a valid address.");
  }
}
// Checks a string starts with 0x, is 42 characters long and contains only hex characters after 0x
var startsWith0xLen42HexRegex = /^0x[0-9a-fA-F]{40}$/;
/**
 * Checks if an address is valid by checking 0x prefix, length === 42 and hex encoding.
 * @param address the unchecksummed hex address
 */
function checkValidAddress(address) {
  if (startsWith0xLen42HexRegex.test(address)) {
    return address;
  }
  throw new Error(address + " is not a valid address.");
}

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
function computePoolAddress(_ref) {
  var factoryAddress = _ref.factoryAddress,
    tokenA = _ref.tokenA,
    tokenB = _ref.tokenB,
    fee = _ref.fee,
    initCodeHashManualOverride = _ref.initCodeHashManualOverride;
  var _ref2 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
    token0 = _ref2[0],
    token1 = _ref2[1]; // does safety checks
  return address.getCreate2Address(factoryAddress, solidity.keccak256(["bytes"], [abi$8.defaultAbiCoder.encode(["address", "address", "uint24"], [token0.address, token1.address, fee])]), initCodeHashManualOverride != null ? initCodeHashManualOverride : POOL_INIT_CODE_HASH);
}

var LiquidityMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function LiquidityMath() {}
  LiquidityMath.addDelta = function addDelta(x, y) {
    if (JSBI.lessThan(y, ZERO)) {
      return JSBI.subtract(x, JSBI.multiply(y, NEGATIVE_ONE));
    } else {
      return JSBI.add(x, y);
    }
  };
  return LiquidityMath;
}();

var MAX_FEE = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(10), /*#__PURE__*/JSBI.BigInt(6));
var SwapMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SwapMath() {}
  SwapMath.computeSwapStep = function computeSwapStep(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, amountRemaining, feePips) {
    var returnValues = {};
    var zeroForOne = JSBI.greaterThanOrEqual(sqrtRatioCurrentX96, sqrtRatioTargetX96);
    var exactIn = JSBI.greaterThanOrEqual(amountRemaining, ZERO);
    if (exactIn) {
      var amountRemainingLessFee = JSBI.divide(JSBI.multiply(amountRemaining, JSBI.subtract(MAX_FEE, JSBI.BigInt(feePips))), MAX_FEE);
      returnValues.amountIn = zeroForOne ? SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, true) : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, true);
      if (JSBI.greaterThanOrEqual(amountRemainingLessFee, returnValues.amountIn)) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96;
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromInput(sqrtRatioCurrentX96, liquidity, amountRemainingLessFee, zeroForOne);
      }
    } else {
      returnValues.amountOut = zeroForOne ? SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, false) : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, false);
      if (JSBI.greaterThanOrEqual(JSBI.multiply(amountRemaining, NEGATIVE_ONE), returnValues.amountOut)) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96;
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromOutput(sqrtRatioCurrentX96, liquidity, JSBI.multiply(amountRemaining, NEGATIVE_ONE), zeroForOne);
      }
    }
    var max = JSBI.equal(sqrtRatioTargetX96, returnValues.sqrtRatioNextX96);
    if (zeroForOne) {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount0Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, true);
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount1Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, false);
    } else {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, true);
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, false);
    }
    if (!exactIn && JSBI.greaterThan(returnValues.amountOut, JSBI.multiply(amountRemaining, NEGATIVE_ONE))) {
      returnValues.amountOut = JSBI.multiply(amountRemaining, NEGATIVE_ONE);
    }
    if (exactIn && JSBI.notEqual(returnValues.sqrtRatioNextX96, sqrtRatioTargetX96)) {
      // we didn't reach the target, so take the remainder of the maximum input as fee
      returnValues.feeAmount = JSBI.subtract(amountRemaining, returnValues.amountIn);
    } else {
      returnValues.feeAmount = FullMath.mulDivRoundingUp(returnValues.amountIn, JSBI.BigInt(feePips), JSBI.subtract(MAX_FEE, JSBI.BigInt(feePips)));
    }
    return [returnValues.sqrtRatioNextX96, returnValues.amountIn, returnValues.amountOut, returnValues.feeAmount];
  };
  return SwapMath;
}();

/**
 * Determines if a tick list is sorted
 * @param list The tick list
 * @param comparator The comparator
 * @returns true if sorted
 */
function isSorted(list, comparator) {
  for (var i = 0; i < list.length - 1; i++) {
    if (comparator(list[i], list[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}

function tickComparator(a, b) {
  return a.index - b.index;
}
/**
 * Utility methods for interacting with sorted lists of ticks
 */
var TickList = /*#__PURE__*/function () {
  /**
   * Cannot be constructed
   */
  function TickList() {}
  TickList.validateList = function validateList(ticks, tickSpacing) {
    !(tickSpacing > 0) ?  invariant(false, "TICK_SPACING_NONZERO")  : void 0;
    // ensure ticks are spaced appropriately
    !ticks.every(function (_ref) {
      var index = _ref.index;
      return index % tickSpacing === 0;
    }) ?  invariant(false, "TICK_SPACING")  : void 0;
    // ensure tick liquidity deltas sum to 0
    !JSBI.equal(ticks.reduce(function (accumulator, _ref2) {
      var liquidityNet = _ref2.liquidityNet;
      return JSBI.add(accumulator, liquidityNet);
    }, ZERO), ZERO) ?  invariant(false, "ZERO_NET")  : void 0;
    !isSorted(ticks, tickComparator) ?  invariant(false, "SORTED")  : void 0;
  };
  TickList.isBelowSmallest = function isBelowSmallest(ticks, tick) {
    !(ticks.length > 0) ?  invariant(false, "LENGTH")  : void 0;
    return tick < ticks[0].index;
  };
  TickList.isAtOrAboveLargest = function isAtOrAboveLargest(ticks, tick) {
    !(ticks.length > 0) ?  invariant(false, "LENGTH")  : void 0;
    return tick >= ticks[ticks.length - 1].index;
  };
  TickList.getTick = function getTick(ticks, index) {
    var tick = ticks[this.binarySearch(ticks, index)];
    !(tick.index === index) ?  invariant(false, "NOT_CONTAINED")  : void 0;
    return tick;
  }
  /**
   * Finds the largest tick in the list of ticks that is less than or equal to tick
   * @param ticks list of ticks
   * @param tick tick to find the largest tick that is less than or equal to tick
   * @private
   */;
  TickList.binarySearch = function binarySearch(ticks, tick) {
    !!this.isBelowSmallest(ticks, tick) ?  invariant(false, "BELOW_SMALLEST")  : void 0;
    var l = 0;
    var r = ticks.length - 1;
    var i;
    while (true) {
      i = Math.floor((l + r) / 2);
      if (ticks[i].index <= tick && (i === ticks.length - 1 || ticks[i + 1].index > tick)) {
        return i;
      }
      if (ticks[i].index < tick) {
        l = i + 1;
      } else {
        r = i - 1;
      }
    }
  };
  TickList.nextInitializedTick = function nextInitializedTick(ticks, tick, lte) {
    if (lte) {
      !!TickList.isBelowSmallest(ticks, tick) ?  invariant(false, "BELOW_SMALLEST")  : void 0;
      if (TickList.isAtOrAboveLargest(ticks, tick)) {
        return ticks[ticks.length - 1];
      }
      var index = this.binarySearch(ticks, tick);
      return ticks[index];
    } else {
      !!this.isAtOrAboveLargest(ticks, tick) ?  invariant(false, "AT_OR_ABOVE_LARGEST")  : void 0;
      if (this.isBelowSmallest(ticks, tick)) {
        return ticks[0];
      }
      var _index = this.binarySearch(ticks, tick);
      return ticks[_index + 1];
    }
  };
  TickList.nextInitializedTickWithinOneWord = function nextInitializedTickWithinOneWord(ticks, tick, lte, tickSpacing) {
    var compressed = Math.floor(tick / tickSpacing); // matches rounding in the code
    if (lte) {
      var wordPos = compressed >> 8;
      var minimum = (wordPos << 8) * tickSpacing;
      if (TickList.isBelowSmallest(ticks, tick)) {
        return [minimum, false];
      }
      var index = TickList.nextInitializedTick(ticks, tick, lte).index;
      var nextInitializedTick = Math.max(minimum, index);
      return [nextInitializedTick, nextInitializedTick === index];
    } else {
      var _wordPos = compressed + 1 >> 8;
      var maximum = ((_wordPos + 1 << 8) - 1) * tickSpacing;
      if (this.isAtOrAboveLargest(ticks, tick)) {
        return [maximum, false];
      }
      var _index2 = this.nextInitializedTick(ticks, tick, lte).index;
      var _nextInitializedTick = Math.min(maximum, _index2);
      return [_nextInitializedTick, _nextInitializedTick === _index2];
    }
  };
  return TickList;
}();

/**
 * Returns an imprecise maximum amount of liquidity received for a given amount of token 0.
 * This function is available to accommodate LiquidityAmounts#getLiquidityForAmount0 in the v3 periphery,
 * which could be more precise by at least 32 bits by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits. This imprecise calculation will likely be replaced in a future
 * v3 router contract.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, imprecise
 */
function maxLiquidityForAmount0Imprecise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref[0];
    sqrtRatioBX96 = _ref[1];
  }
  var intermediate = JSBI.divide(JSBI.multiply(sqrtRatioAX96, sqrtRatioBX96), Q96);
  return JSBI.divide(JSBI.multiply(JSBI.BigInt(amount0), intermediate), JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));
}
/**
 * Returns a precise maximum amount of liquidity received for a given amount of token 0 by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits.
 * @param sqrtRatioAX96 The price at the lower boundary
 * @param sqrtRatioBX96 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, precise
 */
function maxLiquidityForAmount0Precise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref2 = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref2[0];
    sqrtRatioBX96 = _ref2[1];
  }
  var numerator = JSBI.multiply(JSBI.multiply(JSBI.BigInt(amount0), sqrtRatioAX96), sqrtRatioBX96);
  var denominator = JSBI.multiply(Q96, JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));
  return JSBI.divide(numerator, denominator);
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token1
 * @param sqrtRatioAX96 The price at the lower tick boundary
 * @param sqrtRatioBX96 The price at the upper tick boundary
 * @param amount1 The token1 amount
 * @returns liquidity for amount1
 */
function maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref3 = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref3[0];
    sqrtRatioBX96 = _ref3[1];
  }
  return JSBI.divide(JSBI.multiply(JSBI.BigInt(amount1), Q96), JSBI.subtract(sqrtRatioBX96, sqrtRatioAX96));
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token0, token1,
 * and the prices at the tick boundaries.
 * @param sqrtRatioCurrentX96 the current price
 * @param sqrtRatioAX96 price at lower boundary
 * @param sqrtRatioBX96 price at upper boundary
 * @param amount0 token0 amount
 * @param amount1 token1 amount
 * @param useFullPrecision if false, liquidity will be maximized according to what the router can calculate,
 * not what core can theoretically support
 */
function maxLiquidityForAmounts(sqrtRatioCurrentX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision) {
  if (JSBI.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    var _ref4 = [sqrtRatioBX96, sqrtRatioAX96];
    sqrtRatioAX96 = _ref4[0];
    sqrtRatioBX96 = _ref4[1];
  }
  var maxLiquidityForAmount0 = useFullPrecision ? maxLiquidityForAmount0Precise : maxLiquidityForAmount0Imprecise;
  if (JSBI.lessThanOrEqual(sqrtRatioCurrentX96, sqrtRatioAX96)) {
    return maxLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amount0);
  } else if (JSBI.lessThan(sqrtRatioCurrentX96, sqrtRatioBX96)) {
    var liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX96, sqrtRatioBX96, amount0);
    var liquidity1 = maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioCurrentX96, amount1);
    return JSBI.lessThan(liquidity0, liquidity1) ? liquidity0 : liquidity1;
  } else {
    return maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1);
  }
}

/**
 * Returns the sqrt ratio as a Q64.96 corresponding to a given ratio of amount1 and amount0
 * @param amount1 The numerator amount i.e., the amount of token1
 * @param amount0 The denominator amount i.e., the amount of token0
 * @returns The sqrt ratio
 */
function encodeSqrtRatioX96(amount1, amount0) {
  var numerator = JSBI.leftShift(JSBI.BigInt(amount1), JSBI.BigInt(192));
  var denominator = JSBI.BigInt(amount0);
  var ratioX192 = JSBI.divide(numerator, denominator);
  return sqrt(ratioX192);
}

/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
function tickToPrice(baseToken, quoteToken, tick) {
  var sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);
  var ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);
  return baseToken.sortsBefore(quoteToken) ? new Price(baseToken, quoteToken, Q192, ratioX192) : new Price(baseToken, quoteToken, ratioX192, Q192);
}
/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
function priceToClosestTick(price) {
  var sorted = price.baseCurrency.sortsBefore(price.quoteCurrency);
  var sqrtRatioX96 = sorted ? encodeSqrtRatioX96(price.numerator, price.denominator) : encodeSqrtRatioX96(price.denominator, price.numerator);
  var tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  var nextTickPrice = tickToPrice(price.baseCurrency, price.quoteCurrency, tick + 1);
  if (sorted) {
    if (!price.lessThan(nextTickPrice)) {
      tick++;
    }
  } else {
    if (!price.greaterThan(nextTickPrice)) {
      tick++;
    }
  }
  return tick;
}

/**
 * Converts a route to a hex encoded path
 * @param route the v3 path to convert to an encoded path
 * @param exactOutput whether the route should be encoded in reverse, for making exact output swaps
 */
function encodeRouteToPath(route, exactOutput) {
  var firstInputToken = route.input.wrapped;
  var _route$pools$reduce = route.pools.reduce(function (_ref, pool, index) {
      var inputToken = _ref.inputToken,
        path = _ref.path,
        types = _ref.types;
      var outputToken = pool.token0.equals(inputToken) ? pool.token1 : pool.token0;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "uint24", "address"],
          path: [inputToken.address, pool.fee, outputToken.address]
        };
      } else {
        return {
          inputToken: outputToken,
          types: [].concat(types, ["uint24", "address"]),
          path: [].concat(path, [pool.fee, outputToken.address])
        };
      }
    }, {
      inputToken: firstInputToken,
      path: [],
      types: []
    }),
    path = _route$pools$reduce.path,
    types = _route$pools$reduce.types;
  return exactOutput ? solidity.pack(types.reverse(), path.reverse()) : solidity.pack(types, path);
}

/**
 * Returns the closest tick that is nearest a given tick and usable for the given tick spacing
 * @param tick the target tick
 * @param tickSpacing the spacing of the pool
 */
function nearestUsableTick(tick, tickSpacing) {
  !(Number.isInteger(tick) && Number.isInteger(tickSpacing)) ?  invariant(false, "INTEGERS")  : void 0;
  !(tickSpacing > 0) ?  invariant(false, "TICK_SPACING")  : void 0;
  !(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK) ?  invariant(false, "TICK_BOUND")  : void 0;
  var rounded = Math.round(tick / tickSpacing) * tickSpacing;
  if (rounded < TickMath.MIN_TICK) return rounded + tickSpacing;else if (rounded > TickMath.MAX_TICK) return rounded - tickSpacing;else return rounded;
}

var Q256 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(256));
function subIn256(x, y) {
  var difference = JSBI.subtract(x, y);
  if (JSBI.lessThan(difference, ZERO)) {
    return JSBI.add(Q256, difference);
  } else {
    return difference;
  }
}
var TickLibrary = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function TickLibrary() {}
  TickLibrary.getFeeGrowthInside = function getFeeGrowthInside(feeGrowthOutsideLower, feeGrowthOutsideUpper, tickLower, tickUpper, tickCurrent, feeGrowthGlobal0X128, feeGrowthGlobal1X128) {
    var feeGrowthBelow0X128;
    var feeGrowthBelow1X128;
    if (tickCurrent >= tickLower) {
      feeGrowthBelow0X128 = feeGrowthOutsideLower.feeGrowthOutside0X128;
      feeGrowthBelow1X128 = feeGrowthOutsideLower.feeGrowthOutside1X128;
    } else {
      feeGrowthBelow0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideLower.feeGrowthOutside0X128);
      feeGrowthBelow1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideLower.feeGrowthOutside1X128);
    }
    var feeGrowthAbove0X128;
    var feeGrowthAbove1X128;
    if (tickCurrent < tickUpper) {
      feeGrowthAbove0X128 = feeGrowthOutsideUpper.feeGrowthOutside0X128;
      feeGrowthAbove1X128 = feeGrowthOutsideUpper.feeGrowthOutside1X128;
    } else {
      feeGrowthAbove0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideUpper.feeGrowthOutside0X128);
      feeGrowthAbove1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideUpper.feeGrowthOutside1X128);
    }
    return [subIn256(subIn256(feeGrowthGlobal0X128, feeGrowthBelow0X128), feeGrowthAbove0X128), subIn256(subIn256(feeGrowthGlobal1X128, feeGrowthBelow1X128), feeGrowthAbove1X128)];
  };
  return TickLibrary;
}();

var Q128 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(128));
var PositionLibrary = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function PositionLibrary() {}
  // replicates the portions of Position#update required to compute unaccounted fees
  PositionLibrary.getTokensOwed = function getTokensOwed(feeGrowthInside0LastX128, feeGrowthInside1LastX128, liquidity, feeGrowthInside0X128, feeGrowthInside1X128) {
    var tokensOwed0 = JSBI.divide(JSBI.multiply(subIn256(feeGrowthInside0X128, feeGrowthInside0LastX128), liquidity), Q128);
    var tokensOwed1 = JSBI.divide(JSBI.multiply(subIn256(feeGrowthInside1X128, feeGrowthInside1LastX128), liquidity), Q128);
    return [tokensOwed0, tokensOwed1];
  };
  return PositionLibrary;
}();

/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
function toHex(bigintIsh) {
  var bigInt = JSBI.BigInt(bigintIsh);
  var hex = bigInt.toString(16);
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  return "0x" + hex;
}

var abi = [
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	}
];
var IMulticall = {
	abi: abi
};

var Multicall = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Multicall() {}
  Multicall.encodeMulticall = function encodeMulticall(calldatas) {
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    }
    return calldatas.length === 1 ? calldatas[0] : Multicall.INTERFACE.encodeFunctionData("multicall", [calldatas]);
  };
  return Multicall;
}();
Multicall.INTERFACE = /*#__PURE__*/new abi$8.Interface(IMulticall.abi);

var abi$1 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowed",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowedIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	}
];
var ISelfPermit = {
	abi: abi$1
};

function isAllowedPermit(permitOptions) {
  return "nonce" in permitOptions;
}
var SelfPermit = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SelfPermit() {}
  SelfPermit.encodePermit = function encodePermit(token, options) {
    return isAllowedPermit(options) ? SelfPermit.INTERFACE.encodeFunctionData("selfPermitAllowed", [token.address, toHex(options.nonce), toHex(options.expiry), options.v, options.r, options.s]) : SelfPermit.INTERFACE.encodeFunctionData("selfPermit", [token.address, toHex(options.amount), toHex(options.deadline), options.v, options.r, options.s]);
  };
  return SelfPermit;
}();
SelfPermit.INTERFACE = /*#__PURE__*/new abi$8.Interface(ISelfPermit.abi);

var abi$2 = [
	{
		inputs: [
		],
		name: "refundETH",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "sweepTokenWithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWETH9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "unwrapWETH9WithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	}
];
var IPeripheryPaymentsWithFee = {
	abi: abi$2
};

var Payments = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Payments() {}
  Payments.encodeFeeBips = function encodeFeeBips(fee) {
    return toHex(fee.multiply(10000).quotient);
  };
  Payments.encodeUnwrapWETH9 = function encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient);
    if (!!feeOptions) {
      var feeBips = this.encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return Payments.INTERFACE.encodeFunctionData("unwrapWETH9WithFee", [toHex(amountMinimum), recipient, feeBips, feeRecipient]);
    } else {
      return Payments.INTERFACE.encodeFunctionData("unwrapWETH9", [toHex(amountMinimum), recipient]);
    }
  };
  Payments.encodeSweepToken = function encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient);
    if (!!feeOptions) {
      var feeBips = this.encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return Payments.INTERFACE.encodeFunctionData("sweepTokenWithFee", [token.address, toHex(amountMinimum), recipient, feeBips, feeRecipient]);
    } else {
      return Payments.INTERFACE.encodeFunctionData("sweepToken", [token.address, toHex(amountMinimum), recipient]);
    }
  };
  Payments.encodeRefundETH = function encodeRefundETH() {
    return Payments.INTERFACE.encodeFunctionData("refundETH");
  };
  return Payments;
}();
Payments.INTERFACE = /*#__PURE__*/new abi$8.Interface(IPeripheryPaymentsWithFee.abi);

var abi$3 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_factory",
				type: "address"
			},
			{
				internalType: "address",
				name: "_WETH9",
				type: "address"
			},
			{
				internalType: "address",
				name: "_tokenDescriptor_",
				type: "address"
			}
		],
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "approved",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				indexed: false,
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "ApprovalForAll",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Collect",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "DecreaseLiquidity",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "IncreaseLiquidity",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "WETH9",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "baseURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "pure",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "burn",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint128",
						name: "amount0Max",
						type: "uint128"
					},
					{
						internalType: "uint128",
						name: "amount1Max",
						type: "uint128"
					}
				],
				internalType: "struct INonfungiblePositionManager.CollectParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "collect",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "token1",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "uint160",
				name: "sqrtPriceX96",
				type: "uint160"
			}
		],
		name: "createAndInitializePoolIfNecessary",
		outputs: [
			{
				internalType: "address",
				name: "pool",
				type: "address"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint128",
						name: "liquidity",
						type: "uint128"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManager.DecreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "decreaseLiquidity",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "getApproved",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManager.IncreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "increaseLiquidity",
		outputs: [
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			}
		],
		name: "isApprovedForAll",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token0",
						type: "address"
					},
					{
						internalType: "address",
						name: "token1",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "int24",
						name: "tickLower",
						type: "int24"
					},
					{
						internalType: "int24",
						name: "tickUpper",
						type: "int24"
					},
					{
						internalType: "uint256",
						name: "amount0Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Desired",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct INonfungiblePositionManager.MintParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "ownerOf",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "positions",
		outputs: [
			{
				internalType: "uint96",
				name: "nonce",
				type: "uint96"
			},
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "address",
				name: "token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "token1",
				type: "address"
			},
			{
				internalType: "uint24",
				name: "fee",
				type: "uint24"
			},
			{
				internalType: "int24",
				name: "tickLower",
				type: "int24"
			},
			{
				internalType: "int24",
				name: "tickUpper",
				type: "int24"
			},
			{
				internalType: "uint128",
				name: "liquidity",
				type: "uint128"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside0LastX128",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeGrowthInside1LastX128",
				type: "uint256"
			},
			{
				internalType: "uint128",
				name: "tokensOwed0",
				type: "uint128"
			},
			{
				internalType: "uint128",
				name: "tokensOwed1",
				type: "uint128"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "refundETH",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "_data",
				type: "bytes"
			}
		],
		name: "safeTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowed",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowedIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "operator",
				type: "address"
			},
			{
				internalType: "bool",
				name: "approved",
				type: "bool"
			}
		],
		name: "setApprovalForAll",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4"
			}
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "index",
				type: "uint256"
			}
		],
		name: "tokenOfOwnerByIndex",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "tokenURI",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "tokenId",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Owed",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Owed",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "uniswapV3MintCallback",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWETH9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		stateMutability: "payable",
		type: "receive"
	}
];
var INonfungiblePositionManager = {
	abi: abi$3
};

var _excluded = ["expectedCurrencyOwed0", "expectedCurrencyOwed1"];
var MaxUint128 = /*#__PURE__*/toHex(/*#__PURE__*/JSBI.subtract(/*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(128)), /*#__PURE__*/JSBI.BigInt(1)));
// type guard
function isMint(options) {
  return Object.keys(options).some(function (k) {
    return k === "recipient";
  });
}
var NonfungiblePositionManager = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function NonfungiblePositionManager() {}
  NonfungiblePositionManager.encodeCreate = function encodeCreate(pool) {
    return NonfungiblePositionManager.INTERFACE.encodeFunctionData("createAndInitializePoolIfNecessary", [pool.token0.address, pool.token1.address, pool.fee, toHex(pool.sqrtRatioX96)]);
  };
  NonfungiblePositionManager.createCallParameters = function createCallParameters(pool) {
    return {
      calldata: this.encodeCreate(pool),
      value: toHex(0)
    };
  };
  NonfungiblePositionManager.addCallParameters = function addCallParameters(position, options) {
    !JSBI.greaterThan(position.liquidity, ZERO) ?  invariant(false, "ZERO_LIQUIDITY")  : void 0;
    var calldatas = [];
    // get amounts
    var _position$mintAmounts = position.mintAmounts,
      amount0Desired = _position$mintAmounts.amount0,
      amount1Desired = _position$mintAmounts.amount1;
    // adjust for slippage
    var minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance);
    var amount0Min = toHex(minimumAmounts.amount0);
    var amount1Min = toHex(minimumAmounts.amount1);
    var deadline = toHex(options.deadline);
    // create pool if needed
    if (isMint(options) && options.createPool) {
      calldatas.push(this.encodeCreate(position.pool));
    }
    // permits if necessary
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit));
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit));
    }
    // mint
    if (isMint(options)) {
      var recipient = validateAndParseAddress(options.recipient);
      calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData("mint", [{
        token0: position.pool.token0.address,
        token1: position.pool.token1.address,
        fee: position.pool.fee,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        amount0Desired: toHex(amount0Desired),
        amount1Desired: toHex(amount1Desired),
        amount0Min: amount0Min,
        amount1Min: amount1Min,
        recipient: recipient,
        deadline: deadline
      }]));
    } else {
      // increase
      calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData("increaseLiquidity", [{
        tokenId: toHex(options.tokenId),
        amount0Desired: toHex(amount0Desired),
        amount1Desired: toHex(amount1Desired),
        amount0Min: amount0Min,
        amount1Min: amount1Min,
        deadline: deadline
      }]));
    }
    var value = toHex(0);
    if (options.useNative) {
      var wrapped = options.useNative.wrapped;
      !(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped)) ?  invariant(false, "NO_WETH")  : void 0;
      var wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired;
      // we only need to refund if we're actually sending ETH
      if (JSBI.greaterThan(wrappedValue, ZERO)) {
        calldatas.push(Payments.encodeRefundETH());
      }
      value = toHex(wrappedValue);
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: value
    };
  };
  NonfungiblePositionManager.encodeCollect = function encodeCollect(options) {
    var calldatas = [];
    var tokenId = toHex(options.tokenId);
    var involvesETH = options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative;
    var recipient = validateAndParseAddress(options.recipient);
    // collect
    calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData("collect", [{
      tokenId: tokenId,
      recipient: involvesETH ? ZERO_ADDRESS : recipient,
      amount0Max: MaxUint128,
      amount1Max: MaxUint128
    }]));
    if (involvesETH) {
      var ethAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed0.quotient : options.expectedCurrencyOwed1.quotient;
      var token = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.currency : options.expectedCurrencyOwed0.currency;
      var tokenAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.quotient : options.expectedCurrencyOwed0.quotient;
      calldatas.push(Payments.encodeUnwrapWETH9(ethAmount, recipient));
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient));
    }
    return calldatas;
  };
  NonfungiblePositionManager.collectCallParameters = function collectCallParameters(options) {
    var calldatas = NonfungiblePositionManager.encodeCollect(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  /**
   * Produces the calldata for completely or partially exiting a position
   * @param position The position to exit
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */;
  NonfungiblePositionManager.removeCallParameters = function removeCallParameters(position, options) {
    var calldatas = [];
    var deadline = toHex(options.deadline);
    var tokenId = toHex(options.tokenId);
    // construct a partial position with a percentage of liquidity
    var partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    });
    !JSBI.greaterThan(partialPosition.liquidity, ZERO) ?  invariant(false, "ZERO_LIQUIDITY")  : void 0;
    // slippage-adjusted underlying amounts
    var _partialPosition$burn = partialPosition.burnAmountsWithSlippage(options.slippageTolerance),
      amount0Min = _partialPosition$burn.amount0,
      amount1Min = _partialPosition$burn.amount1;
    if (options.permit) {
      calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData("permit", [validateAndParseAddress(options.permit.spender), tokenId, toHex(options.permit.deadline), options.permit.v, options.permit.r, options.permit.s]));
    }
    // remove liquidity
    calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData("decreaseLiquidity", [{
      tokenId: tokenId,
      liquidity: toHex(partialPosition.liquidity),
      amount0Min: toHex(amount0Min),
      amount1Min: toHex(amount1Min),
      deadline: deadline
    }]));
    var _options$collectOptio = options.collectOptions,
      expectedCurrencyOwed0 = _options$collectOptio.expectedCurrencyOwed0,
      expectedCurrencyOwed1 = _options$collectOptio.expectedCurrencyOwed1,
      rest = _objectWithoutPropertiesLoose(_options$collectOptio, _excluded);
    calldatas.push.apply(calldatas, NonfungiblePositionManager.encodeCollect(_extends({
      tokenId: toHex(options.tokenId),
      // add the underlying value to the expected currency already owed
      expectedCurrencyOwed0: expectedCurrencyOwed0.add(CurrencyAmount.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)),
      expectedCurrencyOwed1: expectedCurrencyOwed1.add(CurrencyAmount.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min))
    }, rest)));
    if (options.liquidityPercentage.equalTo(ONE)) {
      if (options.burnToken) {
        calldatas.push(NonfungiblePositionManager.INTERFACE.encodeFunctionData("burn", [tokenId]));
      }
    } else {
      !(options.burnToken !== true) ?  invariant(false, "CANNOT_BURN")  : void 0;
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  };
  NonfungiblePositionManager.safeTransferFromParameters = function safeTransferFromParameters(options) {
    var recipient = validateAndParseAddress(options.recipient);
    var sender = validateAndParseAddress(options.sender);
    var calldata;
    if (options.data) {
      calldata = NonfungiblePositionManager.INTERFACE.encodeFunctionData("safeTransferFrom(address,address,uint256,bytes)", [sender, recipient, toHex(options.tokenId), options.data]);
    } else {
      calldata = NonfungiblePositionManager.INTERFACE.encodeFunctionData("safeTransferFrom(address,address,uint256)", [sender, recipient, toHex(options.tokenId)]);
    }
    return {
      calldata: calldata,
      value: toHex(0)
    };
  };
  return NonfungiblePositionManager;
}();
NonfungiblePositionManager.INTERFACE = /*#__PURE__*/new abi$8.Interface(INonfungiblePositionManager.abi);

var abi$4 = [
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "previousBlockhash",
				type: "bytes32"
			},
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	}
];

function validateAndParseBytes32(bytes32) {
  if (!bytes32.match(/^0x[0-9a-fA-F]{64}$/)) {
    throw new Error(bytes32 + " is not valid bytes32.");
  }
  return bytes32.toLowerCase();
}
var MulticallExtended = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function MulticallExtended() {}
  MulticallExtended.encodeMulticall = function encodeMulticall(calldatas, validation) {
    // if there's no validation, we can just fall back to regular multicall
    if (typeof validation === "undefined") {
      return Multicall.encodeMulticall(calldatas);
    }
    // if there is validation, we have to normalize calldatas
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    }
    // this means the validation value should be a previousBlockhash
    if (typeof validation === "string" && validation.startsWith("0x")) {
      var previousBlockhash = validateAndParseBytes32(validation);
      return MulticallExtended.INTERFACE.encodeFunctionData("multicall(bytes32,bytes[])", [previousBlockhash, calldatas]);
    } else {
      var deadline = toHex(validation);
      return MulticallExtended.INTERFACE.encodeFunctionData("multicall(uint256,bytes[])", [deadline, calldatas]);
    }
  };
  return MulticallExtended;
}();
MulticallExtended.INTERFACE = /*#__PURE__*/new abi$8.Interface(abi$4);

var abi$5 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "pull",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
		],
		name: "refundETH",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			}
		],
		name: "sweepToken",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "sweepTokenWithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "sweepTokenWithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			}
		],
		name: "unwrapWETH9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			}
		],
		name: "unwrapWETH9",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "unwrapWETH9WithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountMinimum",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "feeBips",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "feeRecipient",
				type: "address"
			}
		],
		name: "unwrapWETH9WithFee",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "wrapETH",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	}
];

function encodeFeeBips(fee) {
  return toHex(fee.multiply(10000).quotient);
}
var PaymentsExtended = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function PaymentsExtended() {}
  PaymentsExtended.encodeUnwrapWETH9 = function encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    // if there's a recipient, just pass it along
    if (typeof recipient === "string") {
      return Payments.encodeUnwrapWETH9(amountMinimum, recipient, feeOptions);
    }
    if (!!feeOptions) {
      var feeBips = encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return PaymentsExtended.INTERFACE.encodeFunctionData("unwrapWETH9WithFee(uint256,uint256,address)", [toHex(amountMinimum), feeBips, feeRecipient]);
    } else {
      return PaymentsExtended.INTERFACE.encodeFunctionData("unwrapWETH9(uint256)", [toHex(amountMinimum)]);
    }
  };
  PaymentsExtended.encodeSweepToken = function encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    // if there's a recipient, just pass it along
    if (typeof recipient === "string") {
      return Payments.encodeSweepToken(token, amountMinimum, recipient, feeOptions);
    }
    if (!!feeOptions) {
      var feeBips = encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return PaymentsExtended.INTERFACE.encodeFunctionData("sweepTokenWithFee(address,uint256,uint256,address)", [token.address, toHex(amountMinimum), feeBips, feeRecipient]);
    } else {
      return PaymentsExtended.INTERFACE.encodeFunctionData("sweepToken(address,uint256)", [token.address, toHex(amountMinimum)]);
    }
  };
  PaymentsExtended.encodePull = function encodePull(token, amount) {
    return PaymentsExtended.INTERFACE.encodeFunctionData("pull", [token.address, toHex(amount)]);
  };
  PaymentsExtended.encodeWrapETH = function encodeWrapETH(amount) {
    return PaymentsExtended.INTERFACE.encodeFunctionData("wrapETH", [toHex(amount)]);
  };
  return PaymentsExtended;
}();
PaymentsExtended.INTERFACE = /*#__PURE__*/new abi$8.Interface(abi$5);

var USDC = /*#__PURE__*/new Token(USDC_TOKEN_ADDRESS, 6, "USDC", "USD Coin", "/icons/usdc.png", "usd-coin");
var WRAPPED_NATIVE_TOKEN = /*#__PURE__*/new Token(WRAPPED_NATIVE_TOKEN_ADDRESS, 18, "WETH", "Wrapped ETH", "/icons/weth.svg", "weth");
var _NativeCurrenty = /*#__PURE__*/function (_NativeCurrency) {
  function _NativeCurrenty() {
    return _NativeCurrency.call(this, 18, "ETH", "Ethereum", "/icons/eth.svg", "ethereum") || this;
  }
  _inheritsLoose(_NativeCurrenty, _NativeCurrency);
  var _proto = _NativeCurrenty.prototype;
  _proto.equals = function equals(other) {
    return other.isNative;
  };
  return _createClass(_NativeCurrenty, [{
    key: "wrapped",
    get: function get() {
      return WRAPPED_NATIVE_TOKEN;
    }
  }], [{
    key: "id",
    get: function get() {
      return "ETH";
    }
  }]);
}(NativeCurrency);
var NATIVE_CURRENCY = /*#__PURE__*/new _NativeCurrenty();

var abi$6 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveMax",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveMaxMinusOne",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveZeroThenMax",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveZeroThenMaxMinusOne",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "callPositionManager",
		outputs: [
			{
				internalType: "bytes",
				name: "result",
				type: "bytes"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "bytes",
						name: "path",
						type: "bytes"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOutMinimum",
						type: "uint256"
					}
				],
				internalType: "struct IV3SwapRouter.ExactInputParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactInput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "tokenIn",
						type: "address"
					},
					{
						internalType: "address",
						name: "tokenOut",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountIn",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountOutMinimum",
						type: "uint256"
					},
					{
						internalType: "uint160",
						name: "sqrtPriceLimitX96",
						type: "uint160"
					}
				],
				internalType: "struct IV3SwapRouter.ExactInputSingleParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactInputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "bytes",
						name: "path",
						type: "bytes"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountInMaximum",
						type: "uint256"
					}
				],
				internalType: "struct IV3SwapRouter.ExactOutputParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactOutput",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "tokenIn",
						type: "address"
					},
					{
						internalType: "address",
						name: "tokenOut",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "amountOut",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amountInMaximum",
						type: "uint256"
					},
					{
						internalType: "uint160",
						name: "sqrtPriceLimitX96",
						type: "uint160"
					}
				],
				internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "exactOutputSingle",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "getApprovalType",
		outputs: [
			{
				internalType: "enum IApproveAndCall.ApprovalType",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token0",
						type: "address"
					},
					{
						internalType: "address",
						name: "token1",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					}
				],
				internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "increaseLiquidity",
		outputs: [
			{
				internalType: "bytes",
				name: "result",
				type: "bytes"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token0",
						type: "address"
					},
					{
						internalType: "address",
						name: "token1",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "int24",
						name: "tickLower",
						type: "int24"
					},
					{
						internalType: "int24",
						name: "tickUpper",
						type: "int24"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					}
				],
				internalType: "struct IApproveAndCall.MintParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "bytes",
				name: "result",
				type: "bytes"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "previousBlockhash",
				type: "bytes32"
			},
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes[]",
				name: "data",
				type: "bytes[]"
			}
		],
		name: "multicall",
		outputs: [
			{
				internalType: "bytes[]",
				name: "results",
				type: "bytes[]"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermit",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowed",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "nonce",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "expiry",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitAllowedIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "selfPermitIfNecessary",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountOutMin",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "swapExactTokensForTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "amountOut",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amountInMax",
				type: "uint256"
			},
			{
				internalType: "address[]",
				name: "path",
				type: "address[]"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "swapTokensForExactTokens",
		outputs: [
			{
				internalType: "uint256",
				name: "amountIn",
				type: "uint256"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "int256",
				name: "amount0Delta",
				type: "int256"
			},
			{
				internalType: "int256",
				name: "amount1Delta",
				type: "int256"
			},
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "uniswapV3SwapCallback",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var abi$7 = [
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveMax",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveMaxMinusOne",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveZeroThenMax",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			}
		],
		name: "approveZeroThenMaxMinusOne",
		outputs: [
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "data",
				type: "bytes"
			}
		],
		name: "callPositionManager",
		outputs: [
			{
				internalType: "bytes",
				name: "result",
				type: "bytes"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256"
			}
		],
		name: "getApprovalType",
		outputs: [
			{
				internalType: "enum IApproveAndCall.ApprovalType",
				name: "",
				type: "uint8"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token0",
						type: "address"
					},
					{
						internalType: "address",
						name: "token1",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "tokenId",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					}
				],
				internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "increaseLiquidity",
		outputs: [
			{
				internalType: "bytes",
				name: "result",
				type: "bytes"
			}
		],
		stateMutability: "payable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token0",
						type: "address"
					},
					{
						internalType: "address",
						name: "token1",
						type: "address"
					},
					{
						internalType: "uint24",
						name: "fee",
						type: "uint24"
					},
					{
						internalType: "int24",
						name: "tickLower",
						type: "int24"
					},
					{
						internalType: "int24",
						name: "tickUpper",
						type: "int24"
					},
					{
						internalType: "uint256",
						name: "amount0Min",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "amount1Min",
						type: "uint256"
					},
					{
						internalType: "address",
						name: "recipient",
						type: "address"
					}
				],
				internalType: "struct IApproveAndCall.MintParams",
				name: "params",
				type: "tuple"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "bytes",
				name: "result",
				type: "bytes"
			}
		],
		stateMutability: "payable",
		type: "function"
	}
];

(function (ApprovalTypes) {
  ApprovalTypes[ApprovalTypes["NOT_REQUIRED"] = 0] = "NOT_REQUIRED";
  ApprovalTypes[ApprovalTypes["MAX"] = 1] = "MAX";
  ApprovalTypes[ApprovalTypes["MAX_MINUS_ONE"] = 2] = "MAX_MINUS_ONE";
  ApprovalTypes[ApprovalTypes["ZERO_THEN_MAX"] = 3] = "ZERO_THEN_MAX";
  ApprovalTypes[ApprovalTypes["ZERO_THEN_MAX_MINUS_ONE"] = 4] = "ZERO_THEN_MAX_MINUS_ONE";
})(exports.ApprovalTypes || (exports.ApprovalTypes = {}));
// type guard
function isMint$1(options) {
  return Object.keys(options).some(function (k) {
    return k === "recipient";
  });
}
var ApproveAndCall = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function ApproveAndCall() {}
  ApproveAndCall.encodeApproveMax = function encodeApproveMax(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData("approveMax", [token.address]);
  };
  ApproveAndCall.encodeApproveMaxMinusOne = function encodeApproveMaxMinusOne(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData("approveMaxMinusOne", [token.address]);
  };
  ApproveAndCall.encodeApproveZeroThenMax = function encodeApproveZeroThenMax(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData("approveZeroThenMax", [token.address]);
  };
  ApproveAndCall.encodeApproveZeroThenMaxMinusOne = function encodeApproveZeroThenMaxMinusOne(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData("approveZeroThenMaxMinusOne", [token.address]);
  };
  ApproveAndCall.encodeCallPositionManager = function encodeCallPositionManager(calldatas) {
    !(calldatas.length > 0) ?  invariant(false, "NULL_CALLDATA")  : void 0;
    if (calldatas.length == 1) {
      return ApproveAndCall.INTERFACE.encodeFunctionData("callPositionManager", calldatas);
    } else {
      var encodedMulticall = NonfungiblePositionManager.INTERFACE.encodeFunctionData("multicall", [calldatas]);
      return ApproveAndCall.INTERFACE.encodeFunctionData("callPositionManager", [encodedMulticall]);
    }
  }
  /**
   * Encode adding liquidity to a position in the nft manager contract
   * @param position Forcasted position with expected amount out from swap
   * @param minimalPosition Forcasted position with custom minimal token amounts
   * @param addLiquidityOptions Options for adding liquidity
   * @param slippageTolerance Defines maximum slippage
   */;
  ApproveAndCall.encodeAddLiquidity = function encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, slippageTolerance) {
    var _position$mintAmounts = position.mintAmountsWithSlippage(slippageTolerance),
      amount0Min = _position$mintAmounts.amount0,
      amount1Min = _position$mintAmounts.amount1;
    // position.mintAmountsWithSlippage() can create amounts not dependenable in scenarios
    // such as range orders. Allow the option to provide a position with custom minimum amounts
    // for these scenarios
    if (JSBI.lessThan(minimalPosition.amount0.quotient, amount0Min)) {
      amount0Min = minimalPosition.amount0.quotient;
    }
    if (JSBI.lessThan(minimalPosition.amount1.quotient, amount1Min)) {
      amount1Min = minimalPosition.amount1.quotient;
    }
    if (isMint$1(addLiquidityOptions)) {
      return ApproveAndCall.INTERFACE.encodeFunctionData("mint", [{
        token0: position.pool.token0.address,
        token1: position.pool.token1.address,
        fee: position.pool.fee,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        amount0Min: toHex(amount0Min),
        amount1Min: toHex(amount1Min),
        recipient: addLiquidityOptions.recipient
      }]);
    } else {
      return ApproveAndCall.INTERFACE.encodeFunctionData("increaseLiquidity", [{
        token0: position.pool.token0.address,
        token1: position.pool.token1.address,
        amount0Min: toHex(amount0Min),
        amount1Min: toHex(amount1Min),
        tokenId: toHex(addLiquidityOptions.tokenId)
      }]);
    }
  };
  ApproveAndCall.encodeApprove = function encodeApprove(token, approvalType) {
    switch (approvalType) {
      case exports.ApprovalTypes.MAX:
        return ApproveAndCall.encodeApproveMax(token.wrapped);
      case exports.ApprovalTypes.MAX_MINUS_ONE:
        return ApproveAndCall.encodeApproveMaxMinusOne(token.wrapped);
      case exports.ApprovalTypes.ZERO_THEN_MAX:
        return ApproveAndCall.encodeApproveZeroThenMax(token.wrapped);
      case exports.ApprovalTypes.ZERO_THEN_MAX_MINUS_ONE:
        return ApproveAndCall.encodeApproveZeroThenMaxMinusOne(token.wrapped);
      default:
        throw "Error: invalid ApprovalType";
    }
  };
  return ApproveAndCall;
}();
ApproveAndCall.INTERFACE = /*#__PURE__*/new abi$8.Interface(abi$7);

var ZERO$2 = /*#__PURE__*/JSBI.BigInt(0);
var REFUND_ETH_PRICE_IMPACT_THRESHOLD = /*#__PURE__*/new Percent(/*#__PURE__*/JSBI.BigInt(50), /*#__PURE__*/JSBI.BigInt(100));
/**
 * Represents the Uniswap V2 + V3 SwapRouter02, and has static methods for helping execute trades.
 */
var SwapRouter = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SwapRouter() {}
  /**
   * @notice Generates the calldata for a Swap with a V3 Route.
   * @param trade The V3Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  SwapRouter.encodeV3Swap = function encodeV3Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    var calldatas = [];
    for (var _iterator = _createForOfIteratorHelperLoose(trade.swaps), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        route = _step$value.route,
        inputAmount = _step$value.inputAmount,
        outputAmount = _step$value.outputAmount;
      var amountIn = toHex(trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient);
      var amountOut = toHex(trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient);
      // flag for whether the trade is single hop or not
      var singleHop = route.pools.length === 1;
      var recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === "undefined" ? MSG_SENDER : validateAndParseAddress(options.recipient);
      if (singleHop) {
        if (trade.tradeType === exports.TradeType.EXACT_INPUT) {
          var exactInputSingleParams = {
            tokenIn: route.tokenPath[0].address,
            tokenOut: route.tokenPath[1].address,
            fee: route.pools[0].fee,
            recipient: recipient,
            amountIn: amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut,
            sqrtPriceLimitX96: 0
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData("exactInputSingle", [exactInputSingleParams]));
        } else {
          var exactOutputSingleParams = {
            tokenIn: route.tokenPath[0].address,
            tokenOut: route.tokenPath[1].address,
            fee: route.pools[0].fee,
            recipient: recipient,
            amountOut: amountOut,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData("exactOutputSingle", [exactOutputSingleParams]));
        }
      } else {
        var path = encodeRouteToPath(route, trade.tradeType === exports.TradeType.EXACT_OUTPUT);
        if (trade.tradeType === exports.TradeType.EXACT_INPUT) {
          var exactInputParams = {
            path: path,
            recipient: recipient,
            amountIn: amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData("exactInput", [exactInputParams]));
        } else {
          var exactOutputParams = {
            path: path,
            recipient: recipient,
            amountOut: amountOut,
            amountInMaximum: amountIn
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData("exactOutput", [exactOutputParams]));
        }
      }
    }
    return calldatas;
  };
  SwapRouter.encodeSwaps = function encodeSwaps(trades, options, isSwapAndAdd) {
    // If dealing with an instance of the aggregated Trade object, unbundle it to individual trade objects.
    if (trades instanceof Trade) {
      var individualTrades = [];
      for (var _iterator2 = _createForOfIteratorHelperLoose(trades.swaps), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
          route = _step2$value.route,
          inputAmount = _step2$value.inputAmount,
          outputAmount = _step2$value.outputAmount;
        individualTrades.push(TradeSDK.createUncheckedTrade({
          route: route,
          inputAmount: inputAmount,
          outputAmount: outputAmount,
          tradeType: trades.tradeType
        }));
      }
      trades = individualTrades;
    }
    if (!Array.isArray(trades)) {
      trades = [trades];
    }
    var numberOfTrades = trades.reduce(function (numberOfTrades, trade) {
      return numberOfTrades + (trade instanceof TradeSDK ? trade.swaps.length : 1);
    }, 0);
    var sampleTrade = trades[0];
    // All trades should have the same starting/ending currency and trade type
    !trades.every(function (trade) {
      return trade.inputAmount.currency.equals(sampleTrade.inputAmount.currency);
    }) ?  invariant(false, "TOKEN_IN_DIFF")  : void 0;
    !trades.every(function (trade) {
      return trade.outputAmount.currency.equals(sampleTrade.outputAmount.currency);
    }) ?  invariant(false, "TOKEN_OUT_DIFF")  : void 0;
    !trades.every(function (trade) {
      return trade.tradeType === sampleTrade.tradeType;
    }) ?  invariant(false, "TRADE_TYPE_DIFF")  : void 0;
    var calldatas = [];
    var inputIsNative = sampleTrade.inputAmount.currency.isNative;
    var outputIsNative = sampleTrade.outputAmount.currency.isNative;
    // flag for whether we want to perform an aggregated slippage check
    //   1. when there are >2 exact input trades. this is only a heuristic,
    //      as it's still more gas-expensive even in this case, but has benefits
    //      in that the reversion probability is lower
    var performAggregatedSlippageCheck = sampleTrade.tradeType === exports.TradeType.EXACT_INPUT && numberOfTrades > 2;
    // flag for whether funds should be send first to the router
    //   1. when receiving ETH (which much be unwrapped from WETH)
    //   2. when a fee on the output is being taken
    //   3. when performing swap and add
    //   4. when performing an aggregated slippage check
    var routerMustCustody = outputIsNative || !!options.fee || !!isSwapAndAdd || performAggregatedSlippageCheck;
    // encode permit if necessary
    if (options.inputTokenPermit) {
      !sampleTrade.inputAmount.currency.isToken ?  invariant(false, "NON_TOKEN_PERMIT")  : void 0;
      calldatas.push(SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit));
    }
    for (var _iterator3 = _createForOfIteratorHelperLoose(trades), _step3; !(_step3 = _iterator3()).done;) {
      var trade = _step3.value;
      if (trade instanceof TradeSDK) {
        for (var _iterator4 = _createForOfIteratorHelperLoose(SwapRouter.encodeV3Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck)), _step4; !(_step4 = _iterator4()).done;) {
          var calldata = _step4.value;
          calldatas.push(calldata);
        }
      } else {
        throw new Error("Unsupported trade object");
      }
    }
    var ZERO_IN = CurrencyAmount.fromRawAmount(sampleTrade.inputAmount.currency, 0);
    var ZERO_OUT = CurrencyAmount.fromRawAmount(sampleTrade.outputAmount.currency, 0);
    var minimumAmountOut = trades.reduce(function (sum, trade) {
      return sum.add(trade.minimumAmountOut(options.slippageTolerance));
    }, ZERO_OUT);
    var quoteAmountOut = trades.reduce(function (sum, trade) {
      return sum.add(trade.outputAmount);
    }, ZERO_OUT);
    var totalAmountIn = trades.reduce(function (sum, trade) {
      return sum.add(trade.maximumAmountIn(options.slippageTolerance));
    }, ZERO_IN);
    return {
      calldatas: calldatas,
      sampleTrade: sampleTrade,
      routerMustCustody: routerMustCustody,
      inputIsNative: inputIsNative,
      outputIsNative: outputIsNative,
      totalAmountIn: totalAmountIn,
      minimumAmountOut: minimumAmountOut,
      quoteAmountOut: quoteAmountOut
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */;
  SwapRouter.swapCallParameters = function swapCallParameters(trades, options) {
    var _SwapRouter$encodeSwa = SwapRouter.encodeSwaps(trades, options),
      calldatas = _SwapRouter$encodeSwa.calldatas,
      sampleTrade = _SwapRouter$encodeSwa.sampleTrade,
      routerMustCustody = _SwapRouter$encodeSwa.routerMustCustody,
      inputIsNative = _SwapRouter$encodeSwa.inputIsNative,
      outputIsNative = _SwapRouter$encodeSwa.outputIsNative,
      totalAmountIn = _SwapRouter$encodeSwa.totalAmountIn,
      minimumAmountOut = _SwapRouter$encodeSwa.minimumAmountOut;
    // unwrap or sweep
    if (routerMustCustody) {
      if (outputIsNative) {
        calldatas.push(PaymentsExtended.encodeUnwrapWETH9(minimumAmountOut.quotient, options.recipient, options.fee));
      } else {
        calldatas.push(PaymentsExtended.encodeSweepToken(sampleTrade.outputAmount.currency.wrapped, minimumAmountOut.quotient, options.recipient, options.fee));
      }
    }
    // must refund when paying in ETH: either with an uncertain input amount OR if there's a chance of a partial fill.
    // unlike ERC20's, the full ETH value must be sent in the transaction, so the rest must be refunded.
    if (inputIsNative && (sampleTrade.tradeType === exports.TradeType.EXACT_OUTPUT || SwapRouter.riskOfPartialFill(trades))) {
      calldatas.push(Payments.encodeRefundETH());
    }
    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: toHex(inputIsNative ? totalAmountIn.quotient : ZERO$2)
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */;
  SwapRouter.swapAndAddCallParameters = function swapAndAddCallParameters(trades, options, position, addLiquidityOptions, tokenInApprovalType, tokenOutApprovalType) {
    var _SwapRouter$encodeSwa2 = SwapRouter.encodeSwaps(trades, options, true),
      calldatas = _SwapRouter$encodeSwa2.calldatas,
      inputIsNative = _SwapRouter$encodeSwa2.inputIsNative,
      outputIsNative = _SwapRouter$encodeSwa2.outputIsNative,
      totalAmountSwapped = _SwapRouter$encodeSwa2.totalAmountIn,
      quoteAmountOut = _SwapRouter$encodeSwa2.quoteAmountOut,
      minimumAmountOut = _SwapRouter$encodeSwa2.minimumAmountOut;
    // encode output token permit if necessary
    if (options.outputTokenPermit) {
      !quoteAmountOut.currency.isToken ?  invariant(false, "NON_TOKEN_PERMIT_OUTPUT")  : void 0;
      calldatas.push(SelfPermit.encodePermit(quoteAmountOut.currency, options.outputTokenPermit));
    }
    var zeroForOne = position.pool.token0.wrapped.address === totalAmountSwapped.currency.wrapped.address;
    var _SwapRouter$getPositi = SwapRouter.getPositionAmounts(position, zeroForOne),
      positionAmountIn = _SwapRouter$getPositi.positionAmountIn,
      positionAmountOut = _SwapRouter$getPositi.positionAmountOut;
    // if tokens are native they will be converted to WETH9
    var tokenIn = inputIsNative ? WRAPPED_NATIVE_TOKEN : positionAmountIn.currency.wrapped;
    var tokenOut = outputIsNative ? WRAPPED_NATIVE_TOKEN : positionAmountOut.currency.wrapped;
    // if swap output does not make up whole outputTokenBalanceDesired, pull in remaining tokens for adding liquidity
    var amountOutRemaining = positionAmountOut.subtract(quoteAmountOut.wrapped);
    if (amountOutRemaining.greaterThan(CurrencyAmount.fromRawAmount(positionAmountOut.currency, 0))) {
      // if output is native, this means the remaining portion is included as native value in the transaction
      // and must be wrapped. Otherwise, pull in remaining ERC20 token.
      outputIsNative ? calldatas.push(PaymentsExtended.encodeWrapETH(amountOutRemaining.quotient)) : calldatas.push(PaymentsExtended.encodePull(tokenOut, amountOutRemaining.quotient));
    }
    // if input is native, convert to WETH9, else pull ERC20 token
    inputIsNative ? calldatas.push(PaymentsExtended.encodeWrapETH(positionAmountIn.quotient)) : calldatas.push(PaymentsExtended.encodePull(tokenIn, positionAmountIn.quotient));
    // approve token balances to NFTManager
    if (tokenInApprovalType !== exports.ApprovalTypes.NOT_REQUIRED) calldatas.push(ApproveAndCall.encodeApprove(tokenIn, tokenInApprovalType));
    if (tokenOutApprovalType !== exports.ApprovalTypes.NOT_REQUIRED) calldatas.push(ApproveAndCall.encodeApprove(tokenOut, tokenOutApprovalType));
    // represents a position with token amounts resulting from a swap with maximum slippage
    // hence the minimal amount out possible.
    var minimalPosition = Position.fromAmounts({
      pool: position.pool,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
      amount0: zeroForOne ? position.amount0.quotient.toString() : minimumAmountOut.quotient.toString(),
      amount1: zeroForOne ? minimumAmountOut.quotient.toString() : position.amount1.quotient.toString(),
      useFullPrecision: false
    });
    // encode NFTManager add liquidity
    calldatas.push(ApproveAndCall.encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, options.slippageTolerance));
    // sweep remaining tokens
    inputIsNative ? calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO$2)) : calldatas.push(PaymentsExtended.encodeSweepToken(tokenIn, ZERO$2));
    outputIsNative ? calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO$2)) : calldatas.push(PaymentsExtended.encodeSweepToken(tokenOut, ZERO$2));
    var value;
    if (inputIsNative) {
      value = totalAmountSwapped.wrapped.add(positionAmountIn.wrapped).quotient;
    } else if (outputIsNative) {
      value = amountOutRemaining.quotient;
    } else {
      value = ZERO$2;
    }
    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: value.toString()
    };
  }
  // if price impact is very high, there's a chance of hitting max/min prices resulting in a partial fill of the swap
  ;
  SwapRouter.riskOfPartialFill = function riskOfPartialFill(trades) {
    if (Array.isArray(trades)) {
      return trades.some(function (trade) {
        return SwapRouter.v3TradeWithHighPriceImpact(trade);
      });
    } else {
      return SwapRouter.v3TradeWithHighPriceImpact(trades);
    }
  };
  SwapRouter.v3TradeWithHighPriceImpact = function v3TradeWithHighPriceImpact(trade) {
    return trade.priceImpact.greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD);
  };
  SwapRouter.getPositionAmounts = function getPositionAmounts(position, zeroForOne) {
    var _position$mintAmounts = position.mintAmounts,
      amount0 = _position$mintAmounts.amount0,
      amount1 = _position$mintAmounts.amount1;
    var currencyAmount0 = CurrencyAmount.fromRawAmount(position.pool.token0, amount0);
    var currencyAmount1 = CurrencyAmount.fromRawAmount(position.pool.token1, amount1);
    var _ref = zeroForOne ? [currencyAmount0, currencyAmount1] : [currencyAmount1, currencyAmount0],
      positionAmountIn = _ref[0],
      positionAmountOut = _ref[1];
    return {
      positionAmountIn: positionAmountIn,
      positionAmountOut: positionAmountOut
    };
  };
  return SwapRouter;
}();
SwapRouter.INTERFACE = /*#__PURE__*/new abi$8.Interface(abi$6);

var tokens = [{
  symbol: "WETH",
  name: "Wrapped Ethereum",
  icon: "/icons/weth.svg",
  decimals: 18,
  address: "0x4200000000000000000000000000000000000006",
  coingeckoId: "ethereum"
}, {
  symbol: "USDC",
  name: "USD Coin",
  icon: "/icons/usdc.png",
  decimals: 6,
  address: "0xb62F35B9546A908d11c5803ecBBA735AbC3E3eaE",
  coingeckoId: "usdc"
}, {
  symbol: "USDT",
  name: "Tether USD",
  icon: "/icons/usdt.png",
  decimals: 6,
  address: "0x05D032ac25d322df992303dCa074EE7392C117b9",
  coingeckoId: "tether"
}];
var DEFAULT_TOKEN_LIST = {
  name: "Votopia Default",
  timestamp: /*#__PURE__*/new Date().toISOString(),
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  tags: {},
  logoURI: "ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir",
  keywords: ["votopia", "default"],
  tokens: tokens
};

exports.ADDRESS_MAP = ADDRESS_MAP;
exports.ADDRESS_THIS = ADDRESS_THIS;
exports.ApproveAndCall = ApproveAndCall;
exports.CurrencyAmount = CurrencyAmount;
exports.DEFAULT_TOKEN_LIST = DEFAULT_TOKEN_LIST;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.Fraction = Fraction;
exports.FullMath = FullMath;
exports.JSON_RPC_PROVIER = JSON_RPC_PROVIER;
exports.LiquidityMath = LiquidityMath;
exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
exports.MSG_SENDER = MSG_SENDER;
exports.MULTICALL_ADDRESS = MULTICALL_ADDRESS;
exports.MaxUint256 = MaxUint256;
exports.Multicall = Multicall;
exports.MulticallExtended = MulticallExtended;
exports.NATIVE_CURRENCY = NATIVE_CURRENCY;
exports.NEGATIVE_ONE = NEGATIVE_ONE;
exports.NETWORK_NAME = NETWORK_NAME;
exports.NONFUNGIBLE_POSITION_MANAGER_ADDRESS = NONFUNGIBLE_POSITION_MANAGER_ADDRESS;
exports.NativeCurrency = NativeCurrency;
exports.NoTickDataProvider = NoTickDataProvider;
exports.NonfungiblePositionManager = NonfungiblePositionManager;
exports.ONE = ONE;
exports.OVM_GASPRICE_ADDRESS = OVM_GASPRICE_ADDRESS;
exports.POOL_INIT_CODE_HASH = POOL_INIT_CODE_HASH;
exports.Payments = Payments;
exports.PaymentsExtended = PaymentsExtended;
exports.Percent = Percent;
exports.Pool = Pool;
exports.Position = Position;
exports.PositionLibrary = PositionLibrary;
exports.Price = Price;
exports.Q192 = Q192;
exports.Q96 = Q96;
exports.QUOTER_V2_ADDRESS = QUOTER_V2_ADDRESS;
exports.Route = Route;
exports.RouteSDK = RouteSDK;
exports.SUBGRAPH_URL = SUBGRAPH_URL;
exports.SWAP_ROUTER_02_ADDRESS = SWAP_ROUTER_02_ADDRESS;
exports.SelfPermit = SelfPermit;
exports.SqrtPriceMath = SqrtPriceMath;
exports.SwapMath = SwapMath;
exports.SwapRouter = SwapRouter;
exports.TICK_LENS_ADDRESS = TICK_LENS_ADDRESS;
exports.TICK_SPACINGS = TICK_SPACINGS;
exports.Tick = Tick;
exports.TickLibrary = TickLibrary;
exports.TickList = TickList;
exports.TickListDataProvider = TickListDataProvider;
exports.TickMath = TickMath;
exports.Token = Token;
exports.Trade = Trade;
exports.TradeSDK = TradeSDK;
exports.USDC = USDC;
exports.USDC_TOKEN_ADDRESS = USDC_TOKEN_ADDRESS;
exports.WRAPPED_NATIVE_TOKEN = WRAPPED_NATIVE_TOKEN;
exports.WRAPPED_NATIVE_TOKEN_ADDRESS = WRAPPED_NATIVE_TOKEN_ADDRESS;
exports.ZERO = ZERO;
exports.ZERO_ADDRESS = ZERO_ADDRESS;
exports.checkValidAddress = checkValidAddress;
exports.computePoolAddress = computePoolAddress;
exports.computePriceImpact = computePriceImpact;
exports.encodeRouteToPath = encodeRouteToPath;
exports.encodeSqrtRatioX96 = encodeSqrtRatioX96;
exports.isMint = isMint$1;
exports.isSorted = isSorted;
exports.maxLiquidityForAmounts = maxLiquidityForAmounts;
exports.mostSignificantBit = mostSignificantBit;
exports.nearestUsableTick = nearestUsableTick;
exports.priceToClosestTick = priceToClosestTick;
exports.sortedInsert = sortedInsert;
exports.sqrt = sqrt;
exports.subIn256 = subIn256;
exports.tickToPrice = tickToPrice;
exports.toHex = toHex;
exports.tradeComparator = tradeComparator;
exports.validateAndParseAddress = validateAndParseAddress;
//# sourceMappingURL=sdk-core.cjs.development.js.map
