// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/inputManager/InputState.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputState = void 0;
const emptyKeyState = {
  re: false,
  fe: false,
  pressed: false
};

class InputState {
  constructor(keyState, mousePosition) {
    this.keyState = keyState;
    this.mousePosition = mousePosition;
  }

  getKeyState(keyCode) {
    return this.keyState.get(keyCode) ?? emptyKeyState;
  }

  isPressed(keyCode) {
    return this.getKeyState(keyCode).pressed;
  }

  isReleased(keyCode) {
    return !this.getKeyState(keyCode).pressed;
  }

  isJustPressed(keyCode) {
    return this.getKeyState(keyCode).re;
  }

  isJustReleased(keyCode) {
    return this.getKeyState(keyCode).fe;
  }

  get mouse() {
    return this.mousePosition;
  }

}

exports.InputState = InputState;
},{}],"../src/math/Vector2.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vec2 = exports.Vector2 = void 0;

class Vector2 {
  constructor(_x = 0, _y = 0) {
    this._x = _x;
    this._y = _y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  clone() {
    return Vector2.of(this._x, this._y);
  }

  static zero() {
    return new Vector2(0, 0);
  }

  static of(x, y) {
    return new Vector2(x, y ?? x);
  }

}

exports.Vector2 = Vector2;

const vec2 = (x, y) => Vector2.of(x, y);

exports.vec2 = vec2;
},{}],"../src/inputManager/InputManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputManager = void 0;

var _InputState = require("./InputState");

var _Vector = require("../math/Vector2");

class InputManager {
  constructor() {
    this.state = new Map();
    this.mousePosition = (0, _Vector.vec2)(0, 0);
    this.element = null;

    this.handleKeydown = event => {
      const state = this.state.get(event.keyCode);

      if (!state?.pressed) {
        this.state.set(event.keyCode, {
          re: true,
          fe: false,
          pressed: true
        });
      }
    };

    this.handleKeyup = event => {
      this.state.set(event.keyCode, {
        re: false,
        fe: true,
        pressed: false
      });
    };

    this.handleMousedown = event => {
      const state = this.state.get(event.button);

      if (!state?.pressed) {
        this.state.set(event.button, {
          re: true,
          fe: false,
          pressed: true
        });
      }
    };

    this.handleMouseup = event => {
      this.state.set(event.button, {
        re: false,
        fe: true,
        pressed: false
      });
    };

    this.handleMousemove = event => {
      const boundingRect = this.element?.getBoundingClientRect();
      this.mousePosition = (0, _Vector.vec2)(event.clientX - (boundingRect?.left ?? 0), event.clientY - (boundingRect?.top ?? 0));
    };
  }

  getState() {
    return new _InputState.InputState(new Map(this.state.entries()), this.mousePosition.clone());
  }

  processTick() {
    for (let key of this.state.keys()) {
      const state = this.state.get(key);
      this.state.set(key, {
        pressed: state.pressed,
        fe: false,
        re: false
      });
    }
  }

  mount(element) {
    this.element = element;
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
    window.addEventListener('mousedown', this.handleMousedown);
    window.addEventListener('mouseup', this.handleMouseup);
    window.addEventListener('mousemove', this.handleMousemove);
  }

  unmount() {
    this.element = null;
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
    window.removeEventListener('mousedown', this.handleMousedown);
    window.removeEventListener('mouseup', this.handleMouseup);
    window.removeEventListener('mousemove', this.handleMousemove);
  }

}

exports.InputManager = InputManager;
},{"./InputState":"../src/inputManager/InputState.ts","../math/Vector2":"../src/math/Vector2.ts"}],"../src/ticker/Ticker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ticker = void 0;

class Ticker {}

exports.Ticker = Ticker;
},{}],"../src/ticker/AnimationFrameTicker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationFrameTicker = void 0;

var _Ticker = require("./Ticker");

class AnimationFrameTicker extends _Ticker.Ticker {
  constructor() {
    super(...arguments);
    this.listeners = new Set();
    this.afId = null;
    this.frameNumber = 0;
    this.startTimestamp = 0;
    this.lastTimestamp = 0;
  }

  get isRunning() {
    return this.afId !== null;
  }

  start() {
    if (this.afId === null) {
      this.frameNumber = 0;
      this.scheduleNextAnimationFrame();
    }
  }

  stop() {
    if (this.afId !== null) {
      cancelAnimationFrame(this.afId);
      this.afId = null;
    }
  }

  scheduleNextAnimationFrame() {
    this.afId = requestAnimationFrame(this.tick.bind(this));
  }

  tick(currentTimestamp) {
    this.scheduleNextAnimationFrame();

    if (this.frameNumber === 0) {
      this.startTimestamp = currentTimestamp;
      this.lastTimestamp = currentTimestamp;
    }

    const tickerState = {
      frameNumber: this.frameNumber,
      startTimestamp: this.startTimestamp,
      lastTimestamp: this.lastTimestamp,
      currentTimestamp: currentTimestamp,
      delta: currentTimestamp - this.lastTimestamp
    };

    for (let listener of this.listeners) {
      listener(tickerState);
    }

    this.lastTimestamp = currentTimestamp;
    this.frameNumber += 1;
  }

  listen(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

}

exports.AnimationFrameTicker = AnimationFrameTicker;
},{"./Ticker":"../src/ticker/Ticker.ts"}],"../src/entity/Entity.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

class Entity {
  constructor() {
    this.scene = null;
  }

  _mount(scene) {
    this.scene = scene;
  }

  _unmount() {
    this.scene = null;
  }

  _update(context) {
    for (let widget of Object.values(this.widgets)) {
      widget.willUpdate(context);
    }

    this.update(context);

    for (let widget of Object.values(this.widgets)) {
      widget.didUpdate(context);
    }
  }

  _draw(context) {
    for (let widget of Object.values(this.widgets)) {
      widget.willDraw(context);
    }

    this.draw(context);

    for (let widget of Object.values(this.widgets)) {
      widget.didDraw(context);
    }
  }

}

exports.Entity = Entity;
},{}],"../src/inputManager/Key.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKey = isKey;
exports.Key = void 0;
var Key;
exports.Key = Key;

(function (Key) {
  Key[Key["LMB"] = 0] = "LMB";
  Key[Key["MMB"] = 1] = "MMB";
  Key[Key["RMB"] = 2] = "RMB";
  Key[Key["MB3"] = 3] = "MB3";
  Key[Key["MB4"] = 4] = "MB4";
  Key[Key["Backspace"] = 8] = "Backspace";
  Key[Key["Tab"] = 9] = "Tab";
  Key[Key["Enter"] = 13] = "Enter";
  Key[Key["Shift"] = 16] = "Shift";
  Key[Key["Ctrl"] = 17] = "Ctrl";
  Key[Key["Alt"] = 18] = "Alt";
  Key[Key["PauseBreak"] = 19] = "PauseBreak";
  Key[Key["CapsLock"] = 20] = "CapsLock";
  Key[Key["Escape"] = 27] = "Escape";
  Key[Key["Space"] = 32] = "Space";
  Key[Key["PageUp"] = 33] = "PageUp";
  Key[Key["PageDown"] = 34] = "PageDown";
  Key[Key["End"] = 35] = "End";
  Key[Key["Home"] = 36] = "Home";
  Key[Key["LeftArrow"] = 37] = "LeftArrow";
  Key[Key["UpArrow"] = 38] = "UpArrow";
  Key[Key["RightArrow"] = 39] = "RightArrow";
  Key[Key["DownArrow"] = 40] = "DownArrow";
  Key[Key["Insert"] = 45] = "Insert";
  Key[Key["Delete"] = 46] = "Delete";
  Key[Key["Zero"] = 48] = "Zero";
  Key[Key["ClosedParen"] = 48] = "ClosedParen";
  Key[Key["One"] = 49] = "One";
  Key[Key["ExclamationMark"] = 49] = "ExclamationMark";
  Key[Key["Two"] = 50] = "Two";
  Key[Key["AtSign"] = 50] = "AtSign";
  Key[Key["Three"] = 51] = "Three";
  Key[Key["PoundSign"] = 51] = "PoundSign";
  Key[Key["Hash"] = 51] = "Hash";
  Key[Key["Four"] = 52] = "Four";
  Key[Key["DollarSign"] = 52] = "DollarSign";
  Key[Key["Five"] = 53] = "Five";
  Key[Key["PercentSign"] = 53] = "PercentSign";
  Key[Key["Six"] = 54] = "Six";
  Key[Key["Caret"] = 54] = "Caret";
  Key[Key["Hat"] = 54] = "Hat";
  Key[Key["Seven"] = 55] = "Seven";
  Key[Key["Ampersand"] = 55] = "Ampersand";
  Key[Key["Eight"] = 56] = "Eight";
  Key[Key["Star"] = 56] = "Star";
  Key[Key["Asterik"] = 56] = "Asterik";
  Key[Key["Nine"] = 57] = "Nine";
  Key[Key["OpenParen"] = 57] = "OpenParen";
  Key[Key["A"] = 65] = "A";
  Key[Key["B"] = 66] = "B";
  Key[Key["C"] = 67] = "C";
  Key[Key["D"] = 68] = "D";
  Key[Key["E"] = 69] = "E";
  Key[Key["F"] = 70] = "F";
  Key[Key["G"] = 71] = "G";
  Key[Key["H"] = 72] = "H";
  Key[Key["I"] = 73] = "I";
  Key[Key["J"] = 74] = "J";
  Key[Key["K"] = 75] = "K";
  Key[Key["L"] = 76] = "L";
  Key[Key["M"] = 77] = "M";
  Key[Key["N"] = 78] = "N";
  Key[Key["O"] = 79] = "O";
  Key[Key["P"] = 80] = "P";
  Key[Key["Q"] = 81] = "Q";
  Key[Key["R"] = 82] = "R";
  Key[Key["S"] = 83] = "S";
  Key[Key["T"] = 84] = "T";
  Key[Key["U"] = 85] = "U";
  Key[Key["V"] = 86] = "V";
  Key[Key["W"] = 87] = "W";
  Key[Key["X"] = 88] = "X";
  Key[Key["Y"] = 89] = "Y";
  Key[Key["Z"] = 90] = "Z";
  Key[Key["LeftWindowKey"] = 91] = "LeftWindowKey";
  Key[Key["RightWindowKey"] = 92] = "RightWindowKey";
  Key[Key["SelectKey"] = 93] = "SelectKey";
  Key[Key["Numpad0"] = 96] = "Numpad0";
  Key[Key["Numpad1"] = 97] = "Numpad1";
  Key[Key["Numpad2"] = 98] = "Numpad2";
  Key[Key["Numpad3"] = 99] = "Numpad3";
  Key[Key["Numpad4"] = 100] = "Numpad4";
  Key[Key["Numpad5"] = 101] = "Numpad5";
  Key[Key["Numpad6"] = 102] = "Numpad6";
  Key[Key["Numpad7"] = 103] = "Numpad7";
  Key[Key["Numpad8"] = 104] = "Numpad8";
  Key[Key["Numpad9"] = 105] = "Numpad9";
  Key[Key["Multiply"] = 106] = "Multiply";
  Key[Key["Add"] = 107] = "Add";
  Key[Key["Subtract"] = 109] = "Subtract";
  Key[Key["DecimalPoint"] = 110] = "DecimalPoint";
  Key[Key["Divide"] = 111] = "Divide";
  Key[Key["F1"] = 112] = "F1";
  Key[Key["F2"] = 113] = "F2";
  Key[Key["F3"] = 114] = "F3";
  Key[Key["F4"] = 115] = "F4";
  Key[Key["F5"] = 116] = "F5";
  Key[Key["F6"] = 117] = "F6";
  Key[Key["F7"] = 118] = "F7";
  Key[Key["F8"] = 119] = "F8";
  Key[Key["F9"] = 120] = "F9";
  Key[Key["F10"] = 121] = "F10";
  Key[Key["F11"] = 122] = "F11";
  Key[Key["F12"] = 123] = "F12";
  Key[Key["NumLock"] = 144] = "NumLock";
  Key[Key["ScrollLock"] = 145] = "ScrollLock";
  Key[Key["SemiColon"] = 186] = "SemiColon";
  Key[Key["Equals"] = 187] = "Equals";
  Key[Key["Comma"] = 188] = "Comma";
  Key[Key["Dash"] = 189] = "Dash";
  Key[Key["Period"] = 190] = "Period";
  Key[Key["UnderScore"] = 189] = "UnderScore";
  Key[Key["PlusSign"] = 187] = "PlusSign";
  Key[Key["ForwardSlash"] = 191] = "ForwardSlash";
  Key[Key["Tilde"] = 192] = "Tilde";
  Key[Key["GraveAccent"] = 192] = "GraveAccent";
  Key[Key["OpenBracket"] = 219] = "OpenBracket";
  Key[Key["ClosedBracket"] = 221] = "ClosedBracket";
  Key[Key["Quote"] = 222] = "Quote";
})(Key || (exports.Key = Key = {}));

function isKey(keyCode) {
  return keyCode <= Key.Backspace && keyCode >= Key.Quote;
}
},{}],"../src/widgets/Widget.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Widget = void 0;

class Widget {
  willUpdate(_context) {}

  didUpdate(_context) {}

  willDraw(_context) {}

  didDraw(_context) {}

}

exports.Widget = Widget;
},{}],"../src/widgets/MousePath.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MousePathWidget = void 0;

var _Widget = require("./Widget");

class MousePathWidget extends _Widget.Widget {
  constructor(keys) {
    super();
    this.keys = keys;
    this.isTracking = false;
    this.state = [];
    this.shouldNotifyPathStarted = false;
    this.shouldNotifyPathEnded = false;
    this.key = null;
  }

  willUpdate({
    inputState
  }) {
    if (this.isTracking === false) {
      const key = this.keys.find(inputState.isJustPressed.bind(inputState));

      if (key) {
        this.state = [];
        this.isTracking = true;
        this.key = key;
        this.shouldNotifyPathStarted = true;
      }
    }

    if (this.isTracking === true && this.key && inputState.isPressed(this.key)) {
      this.state.push(inputState.mouse.clone());
    }

    if (this.isTracking === true && this.key && inputState.isJustReleased(this.key)) {
      this.isTracking = false;
      this.shouldNotifyPathEnded = true;
    }
  }

  onPathStarted(callback) {
    if (this.shouldNotifyPathStarted) {
      this.shouldNotifyPathStarted = false;
      callback(this.state[0], this.key);
    }
  }

  onPathEnded(callback) {
    if (this.shouldNotifyPathEnded) {
      this.shouldNotifyPathEnded = false;
      const state = this.state;
      this.state = [];
      callback(state, this.key);
    }
  }

}

exports.MousePathWidget = MousePathWidget;
},{"./Widget":"../src/widgets/Widget.ts"}],"node_modules/simplify-js/simplify.js":[function(require,module,exports) {
var define;
/*
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

(function () { 'use strict';

// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance between 2 points
function getSqDist(p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return dx * dx + dy * dy;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {

    var x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {

    var prevPoint = points[0],
        newPoints = [prevPoint],
        point;

    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDist(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point) newPoints.push(point);

    return newPoints;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance,
        index;

    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }

    if (maxSqDist > sqTolerance) {
        if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, sqTolerance) {
    var last = points.length - 1;

    var simplified = [points[0]];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
}

// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {

    if (points.length <= 2) return points;

    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}

// export as AMD module / Node module / browser or worker variable
if (typeof define === 'function' && define.amd) define(function() { return simplify; });
else if (typeof module !== 'undefined') {
    module.exports = simplify;
    module.exports.default = simplify;
} else if (typeof self !== 'undefined') self.simplify = simplify;
else window.simplify = simplify;

})();

},{}],"DrawingEntity.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingEntity = void 0;

const Entity_1 = require("../src/entity/Entity");

const Key_1 = require("../src/inputManager/Key");

const Vector2_1 = require("../src/math/Vector2");

const MousePath_1 = require("../src/widgets/MousePath");

const simplify_js_1 = __importDefault(require("simplify-js"));

function shakey(path, amount = 2) {
  return path.map(point => Vector2_1.vec2(point.x + (Math.random() - 0.5) * amount, point.y + (Math.random() - 0.5) * amount));
}

function distance(a, b) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

class DrawingEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.path = new MousePath_1.MousePathWidget([Key_1.Key.Q, Key_1.Key.W, Key_1.Key.E]);
    this.paths = [];
    this.widgets = [this.path];
  }

  getColor(key) {
    let color;

    switch (key) {
      case Key_1.Key.Q:
        color = 'black';
        break;

      case Key_1.Key.W:
        color = 'darkgreen';
        break;

      case Key_1.Key.E:
        color = 'blue';
        break;
    }

    return color;
  }

  update(_context) {
    this.path.onPathStarted((point, key) => {
      const color = this.getColor(key);
      this.point = [color, point];
    });
    this.path.onPathEnded((path, key) => {
      this.point = null;
      const color = this.getColor(key);
      this.paths.push({
        color: color,
        path: simplify_js_1.default(path, 2).map(point => Vector2_1.vec2(point.x, point.y)),
        closed: distance(path[path.length - 1], path[0]) < 20
      });
    });
  }

  draw({
    ctx
  }) {
    ctx.lineWidth = 2;

    for (let {
      path,
      color,
      closed
    } of this.paths) {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);

      for (let point of shakey(path.slice(1), 4)) {
        ctx.lineTo(point.x, point.y);
      }

      if (closed) {
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }

    if (this.point) {
      ctx.save();
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.fillStyle = this.point[0];
      ctx.arc(this.point[1].x, this.point[1].y, 20, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    if (this.path.isTracking) {
      ctx.strokeStyle = 'red';
      ctx.beginPath();
      ctx.moveTo(this.path.state[0].x, this.path.state[0].y);

      for (let point of shakey(simplify_js_1.default(this.path.state.slice(1), 2), 4)) {
        ctx.lineTo(point.x, point.y);
      }

      ctx.stroke();
    }
  }

}

exports.DrawingEntity = DrawingEntity;
},{"../src/entity/Entity":"../src/entity/Entity.ts","../src/inputManager/Key":"../src/inputManager/Key.ts","../src/math/Vector2":"../src/math/Vector2.ts","../src/widgets/MousePath":"../src/widgets/MousePath.ts","simplify-js":"node_modules/simplify-js/simplify.js"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const InputManager_1 = require("../src/inputManager/InputManager");

const AnimationFrameTicker_1 = require("../src/ticker/AnimationFrameTicker");

const DrawingEntity_1 = require("./DrawingEntity");

const canvas = document.querySelector('#app');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;
const inputManager = new InputManager_1.InputManager();
const ticker = new AnimationFrameTicker_1.AnimationFrameTicker();
inputManager.mount(canvas);
const entity = new DrawingEntity_1.DrawingEntity();
ticker.listen(tickerState => {
  const inputState = inputManager.getState();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  entity._update({
    tickerState,
    inputState
  });

  entity._draw({
    tickerState,
    ctx
  });

  inputManager.processTick();
});
ticker.start();
},{"../src/inputManager/InputManager":"../src/inputManager/InputManager.ts","../src/ticker/AnimationFrameTicker":"../src/ticker/AnimationFrameTicker.ts","./DrawingEntity":"DrawingEntity.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49365" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/example.77de5100.js.map