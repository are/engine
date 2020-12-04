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
})({"hnz3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetDefinition = exports.AssetType = void 0;
var AssetType;
exports.AssetType = AssetType;

(function (AssetType) {
  AssetType[AssetType["image"] = 0] = "image";
  AssetType[AssetType["sound"] = 1] = "sound";
})(AssetType || (exports.AssetType = AssetType = {}));

class AssetDefinition {
  constructor(type, source) {
    this.type = type;
    this.source = source;
  }

}

exports.AssetDefinition = AssetDefinition;
},{}],"MAfq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Asset = void 0;

var _AssetDefinition = require("./AssetDefinition");

class Asset {
  constructor(definition) {
    this.definition = definition;
  }

  static image(source) {
    return new _AssetDefinition.AssetDefinition(_AssetDefinition.AssetType.image, source);
  }

  static sound(source) {
    return new _AssetDefinition.AssetDefinition(_AssetDefinition.AssetType.sound, source);
  }

}

exports.Asset = Asset;
},{"./AssetDefinition":"hnz3"}],"Book":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageAsset = void 0;

var _Asset = require("../Asset");

var _AssetDefinition = require("../AssetDefinition");

class ImageAsset extends _Asset.Asset {
  constructor(definition, image) {
    super(definition);
    this.image = image;
    this.type = _AssetDefinition.AssetType.image;
  }

}

exports.ImageAsset = ImageAsset;
},{"../Asset":"MAfq","../AssetDefinition":"hnz3"}],"nMdM":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoundAsset = void 0;

var _Asset = require("../Asset");

var _AssetDefinition = require("../AssetDefinition");

class SoundAsset extends _Asset.Asset {
  constructor(definition, audio) {
    super(definition);
    this.audio = audio;
    this.type = _AssetDefinition.AssetType.image;
  }

}

exports.SoundAsset = SoundAsset;
},{"../Asset":"MAfq","../AssetDefinition":"hnz3"}],"Vdsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ImageAsset = require("./ImageAsset");

Object.keys(_ImageAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ImageAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ImageAsset[key];
    }
  });
});

var _SoundAsset = require("./SoundAsset");

Object.keys(_SoundAsset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SoundAsset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SoundAsset[key];
    }
  });
});
},{"./ImageAsset":"Book","./SoundAsset":"nMdM"}],"lA61":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetLoader = exports.AssetMap = void 0;

var _AssetDefinition = require("./AssetDefinition");

var _assetTypes = require("./assetTypes");

class AssetMap {
  constructor(map) {
    this.map = map;
  }

  get(name) {
    return this.map[name];
  }

}

exports.AssetMap = AssetMap;

class AssetLoader {
  constructor() {
    this.cache = new Map();
  }

  async loadAssetMap(assetMap, onProgress = () => {}) {
    const totalAmount = Object.keys(assetMap).length;
    let currentAmount = 0;

    const updateProgress = () => {
      currentAmount += 1;
      onProgress(currentAmount / totalAmount);
    };

    onProgress(0);
    return new AssetMap(Object.fromEntries(await Promise.all(Object.entries(assetMap).map(([name, assetDef]) => {
      return this.loadAsset(assetDef).then(asset => {
        updateProgress();
        return [name, asset];
      });
    }))));
  }

  async loadAsset(assetDefinition) {
    let asset = null;
    const assetMap = this.cache.get(assetDefinition.source) ?? new Map();

    if (assetMap.has(assetDefinition.type)) {
      asset = assetMap.get(assetDefinition.type);
    }

    if (asset !== null) {
      return asset;
    }

    switch (assetDefinition.type) {
      case _AssetDefinition.AssetType.image:
        asset = await this.loadImageAsset(assetDefinition);
        break;

      case _AssetDefinition.AssetType.sound:
        asset = await this.loadSoundAsset(assetDefinition);
        break;

      default:
        throw new Error(`Unknown asset type: '${assetDefinition.type}'`);
    }

    assetMap.set(assetDefinition.type, asset);
    this.cache.set(assetDefinition.source, assetMap);
    return asset;
  }

  loadImageAsset(assetDefinition) {
    const imageElement = new Image();
    return new Promise((resolve, reject) => {
      imageElement.addEventListener('error', reject, {
        once: true
      });
      imageElement.addEventListener('load', () => {
        resolve(new _assetTypes.ImageAsset(assetDefinition, imageElement));
      }, {
        once: true
      });
      imageElement.src = assetDefinition.source;
    });
  }

  loadSoundAsset(assetDefinition) {
    const soundElement = new Audio();
    return new Promise((resolve, reject) => {
      soundElement.addEventListener('error', reject, {
        once: true
      });
      soundElement.addEventListener('canplaythrough', () => {
        resolve(new _assetTypes.SoundAsset(assetDefinition, soundElement));
      }, {
        once: true
      });
      soundElement.src = assetDefinition.source;
    });
  }

}

exports.AssetLoader = AssetLoader;
},{"./AssetDefinition":"hnz3","./assetTypes":"Vdsx"}],"VSoi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Asset = require("./Asset");

Object.keys(_Asset).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Asset[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Asset[key];
    }
  });
});

var _AssetDefinition = require("./AssetDefinition");

Object.keys(_AssetDefinition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AssetDefinition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AssetDefinition[key];
    }
  });
});

var _AssetLoader = require("./AssetLoader");

Object.keys(_AssetLoader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AssetLoader[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AssetLoader[key];
    }
  });
});

var _assetTypes = require("./assetTypes");

Object.keys(_assetTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _assetTypes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assetTypes[key];
    }
  });
});
},{"./Asset":"MAfq","./AssetDefinition":"hnz3","./AssetLoader":"lA61","./assetTypes":"Vdsx"}],"huun":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vec2 = exports.Vector2 = void 0;

class Vector2 {
  constructor(_x = 0, _y = 0) {
    this._x = _x;
    this._y = _y;

    this.clone = () => Vector2.of(this.x, this.y);

    this.simpleProduct = () => this.x * this.y;

    this.asStride = index => Vector2.of(index % this.x, (index - index % this.x) / this.x);

    this.mul = (x, y) => Vector2.of(this.x * x, this.y * (y ?? x));

    this.pipe = fn => fn(this);

    this.equals = other => this.x === other.x && this.y === other.y;

    this.distance = other => Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));

    this.snapToGrid = size => Vector2.of(Math.round(this.x / size.x) * size.x, Math.round(this.y / size.y) * size.y);

    this.transform = matrix => Vector2.fromDOMPoint(matrix.transformPoint({
      x: this._x,
      y: this._y
    }));

    this.floor = () => Vector2.of(Math.floor(this._x), Math.floor(this._y));
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get e() {
    return [this._x, this._y];
  }

  get o() {
    return {
      x: this._x,
      y: this._y
    };
  }

  static from({
    x,
    y
  }) {
    return Vector2.of(x, y);
  }

  add(x, y) {
    if (x instanceof Vector2) {
      return Vector2.of(this._x + x._x, this._y + x._y);
    }

    return Vector2.of(this._x + x, this._y + (y ?? x));
  }

  div(x, y) {
    if (x instanceof Vector2) {
      return Vector2.of(this._x / x._x, this._y / x._y);
    }

    return Vector2.of(this._x / x, this._y / (y ?? x));
  }

  static fromDOMPoint(point) {
    return new Vector2(point.x, point.y);
  }

  static zero() {
    return new Vector2(0, 0);
  }

  static of(x, y) {
    return new Vector2(x, y ?? x);
  }

}

exports.Vector2 = Vector2;

const vec2 = (x, y) => Vector2.of(x, y ?? x);

exports.vec2 = vec2;
},{}],"CA2L":[function(require,module,exports) {
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
},{}],"cx2N":[function(require,module,exports) {
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
},{"./InputState":"CA2L","../math/Vector2":"huun"}],"mnx3":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Engine = void 0;

var _Vector = require("../math/Vector2");

var _InputManager = require("../inputManager/InputManager");

class Engine {
  constructor({
    canvas,
    size,
    ticker
  }) {
    this.input = new _InputManager.InputManager();
    this.scenes = new Map();
    this.stack = [];
    this.ticker = ticker;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.resize(size);
    this.input.mount(canvas);
    ticker.listen(this.tick.bind(this));
    window.addEventListener('resize', () => {
      this.resize((0, _Vector.vec2)(window.innerWidth, window.innerHeight));
    });
  }

  registerScene(name, Constructor) {
    this.scenes.set(name, Constructor);
  }

  getScene(name) {
    const Scene = this.scenes.get(name);

    if (!Scene) {
      throw new Error(`Requested to mount unregistered scene '${name}'`);
    }

    return new Scene();
  }

  pushScene(name) {
    const scene = this.getScene(name);
    this.stack.unshift(scene);
    scene.mount();
  }

  resize(newSize) {
    this.canvasSize = newSize;
    this.canvas.width = newSize.x;
    this.canvas.height = newSize.y;
  }

  tick(tickerState) {
    this.context.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);
    const inputState = this.input.getState();
    let updateContext = {
      matrix: this.context.getTransform(),
      inputState: inputState,
      tickerState: tickerState,
      canvasSize: this.canvasSize
    };
    let drawContext = {
      ctx: this.context,
      tickerState: tickerState,
      canvasSize: this.canvasSize
    };

    for (let scene of this.stack) {
      scene.prepare(updateContext, drawContext);
    }

    for (let scene of this.stack) {
      scene.update(updateContext);
    }

    for (let scene of this.stack) {
      scene.draw(drawContext);
    }

    for (let scene of this.stack) {
      scene.cleanup(updateContext, drawContext);
    }

    this.input.processTick();
  }

  start() {
    this.ticker.start();
  }

  stop() {
    this.ticker.stop();
  }

}

exports.Engine = Engine;
},{"../math/Vector2":"huun","../inputManager/InputManager":"cx2N"}],"H2cD":[function(require,module,exports) {
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
},{}],"m6zO":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextEntity = void 0;

var _Entity = require("../../src/entity/Entity");

class TextEntity extends _Entity.Entity {
  constructor(options) {
    super();
    this.options = options;
    this.widgets = [];
  }

  update() {}

  draw({
    ctx
  }) {
    const {
      font,
      style,
      horizontal,
      vertical,
      position,
      text
    } = this.options;
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = style;
    ctx.textAlign = horizontal ?? 'center';
    ctx.textBaseline = vertical ?? 'middle';
    ctx.fillText(text, position.x, position.y);
    ctx.restore();
  }

}

exports.TextEntity = TextEntity;
},{"../../src/entity/Entity":"H2cD"}],"oaWb":[function(require,module,exports) {
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
},{}],"mohF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scene = void 0;

class Scene {
  constructor() {
    this.entities = new Set();
  }

  add(entity) {
    this.entities.add(entity);
  }

  addAll(entities) {
    for (let entity of entities) {
      this.entities.add(entity);
    }
  }

  remove(entity) {
    this.entities.delete(entity);
  }

  willMount() {}

  didUnmount() {}

  prepare(_updateContext, _drawContext) {}

  cleanup(_updateContext, _drawContext) {}

  willUpdate(_context) {}

  didUpdate(_context) {}

  willDraw(_context) {}

  didDraw(_context) {}

  update(context) {
    this.willUpdate(context);

    for (let entity of this.entities) {
      entity._update(context);
    }

    this.didUpdate(context);
  }

  draw(context) {
    this.willDraw(context);

    for (let entity of this.entities) {
      context.ctx.save();

      entity._draw(context);

      context.ctx.restore();
    }

    this.didDraw(context);
  }

  mount() {
    this.willMount();

    for (let entity of this.entities) {
      entity._mount(this);
    }
  }

  unmount() {
    for (let entity of this.entities) {
      entity._unmount();
    }

    this.entities.clear();
    this.didUnmount();
  }

}

exports.Scene = Scene;
},{}],"PcY8":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ticker = void 0;

class Ticker {}

exports.Ticker = Ticker;
},{}],"dBYq":[function(require,module,exports) {
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
},{"./Ticker":"PcY8"}],"ur7p":[function(require,module,exports) {
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
},{}],"NTlZ":[function(require,module,exports) {
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
},{"./Widget":"ur7p"}],"WdSo":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("./assetLoader/index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});

var _Engine = require("./engine/Engine");

Object.keys(_Engine).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Engine[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Engine[key];
    }
  });
});

var _Entity = require("./entity/Entity");

Object.keys(_Entity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Entity[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Entity[key];
    }
  });
});

var _TextEntity = require("./entity/TextEntity");

Object.keys(_TextEntity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TextEntity[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TextEntity[key];
    }
  });
});

var _InputManager = require("./inputManager/InputManager");

Object.keys(_InputManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputManager[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InputManager[key];
    }
  });
});

var _InputState = require("./inputManager/InputState");

Object.keys(_InputState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InputState[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InputState[key];
    }
  });
});

var _Key = require("./inputManager/Key");

Object.keys(_Key).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Key[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Key[key];
    }
  });
});

var _Vector = require("./math/Vector2");

Object.keys(_Vector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Vector[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Vector[key];
    }
  });
});

var _Scene = require("./scene/Scene");

Object.keys(_Scene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Scene[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Scene[key];
    }
  });
});

var _Ticker = require("./ticker/Ticker");

Object.keys(_Ticker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Ticker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Ticker[key];
    }
  });
});

var _AnimationFrameTicker = require("./ticker/AnimationFrameTicker");

Object.keys(_AnimationFrameTicker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AnimationFrameTicker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AnimationFrameTicker[key];
    }
  });
});

var _Widget = require("./widgets/Widget");

Object.keys(_Widget).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Widget[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Widget[key];
    }
  });
});

var _MousePath = require("./widgets/MousePath");

Object.keys(_MousePath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MousePath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MousePath[key];
    }
  });
});
},{"./assetLoader/index":"VSoi","./engine/Engine":"mnx3","./entity/Entity":"H2cD","./entity/TextEntity":"m6zO","./inputManager/InputManager":"cx2N","./inputManager/InputState":"CA2L","./inputManager/Key":"oaWb","./math/Vector2":"huun","./scene/Scene":"mohF","./ticker/Ticker":"PcY8","./ticker/AnimationFrameTicker":"dBYq","./widgets/Widget":"ur7p","./widgets/MousePath":"NTlZ"}],"pBGv":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"MxHY":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.removeAll = exports.remove = exports.now = exports.nextId = exports.getAll = exports.add = exports.VERSION = exports.Tween = exports.Sequence = exports.Interpolation = exports.Group = exports.Easing = exports.default = void 0;

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
var Easing = {
  Linear: {
    None: function (amount) {
      return amount;
    }
  },
  Quadratic: {
    In: function (amount) {
      return amount * amount;
    },
    Out: function (amount) {
      return amount * (2 - amount);
    },
    InOut: function (amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount;
      }

      return -0.5 * (--amount * (amount - 2) - 1);
    }
  },
  Cubic: {
    In: function (amount) {
      return amount * amount * amount;
    },
    Out: function (amount) {
      return --amount * amount * amount + 1;
    },
    InOut: function (amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount;
      }

      return 0.5 * ((amount -= 2) * amount * amount + 2);
    }
  },
  Quartic: {
    In: function (amount) {
      return amount * amount * amount * amount;
    },
    Out: function (amount) {
      return 1 - --amount * amount * amount * amount;
    },
    InOut: function (amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount;
      }

      return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
    }
  },
  Quintic: {
    In: function (amount) {
      return amount * amount * amount * amount * amount;
    },
    Out: function (amount) {
      return --amount * amount * amount * amount * amount + 1;
    },
    InOut: function (amount) {
      if ((amount *= 2) < 1) {
        return 0.5 * amount * amount * amount * amount * amount;
      }

      return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
    }
  },
  Sinusoidal: {
    In: function (amount) {
      return 1 - Math.cos(amount * Math.PI / 2);
    },
    Out: function (amount) {
      return Math.sin(amount * Math.PI / 2);
    },
    InOut: function (amount) {
      return 0.5 * (1 - Math.cos(Math.PI * amount));
    }
  },
  Exponential: {
    In: function (amount) {
      return amount === 0 ? 0 : Math.pow(1024, amount - 1);
    },
    Out: function (amount) {
      return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
    },
    InOut: function (amount) {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      if ((amount *= 2) < 1) {
        return 0.5 * Math.pow(1024, amount - 1);
      }

      return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
    }
  },
  Circular: {
    In: function (amount) {
      return 1 - Math.sqrt(1 - amount * amount);
    },
    Out: function (amount) {
      return Math.sqrt(1 - --amount * amount);
    },
    InOut: function (amount) {
      if ((amount *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
      }

      return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
    }
  },
  Elastic: {
    In: function (amount) {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
    },
    Out: function (amount) {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function (amount) {
      if (amount === 0) {
        return 0;
      }

      if (amount === 1) {
        return 1;
      }

      amount *= 2;

      if (amount < 1) {
        return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
      }

      return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
    }
  },
  Back: {
    In: function (amount) {
      var s = 1.70158;
      return amount * amount * ((s + 1) * amount - s);
    },
    Out: function (amount) {
      var s = 1.70158;
      return --amount * amount * ((s + 1) * amount + s) + 1;
    },
    InOut: function (amount) {
      var s = 1.70158 * 1.525;

      if ((amount *= 2) < 1) {
        return 0.5 * (amount * amount * ((s + 1) * amount - s));
      }

      return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
    }
  },
  Bounce: {
    In: function (amount) {
      return 1 - Easing.Bounce.Out(1 - amount);
    },
    Out: function (amount) {
      if (amount < 1 / 2.75) {
        return 7.5625 * amount * amount;
      } else if (amount < 2 / 2.75) {
        return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
      } else if (amount < 2.5 / 2.75) {
        return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
      } else {
        return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
      }
    },
    InOut: function (amount) {
      if (amount < 0.5) {
        return Easing.Bounce.In(amount * 2) * 0.5;
      }

      return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
    }
  }
};
exports.Easing = Easing;
var now; // Include a performance.now polyfill.
// In node.js, use process.hrtime.
// eslint-disable-next-line
// @ts-ignore

if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
  now = function () {
    // eslint-disable-next-line
    // @ts-ignore
    var time = process.hrtime(); // Convert [seconds, nanoseconds] to milliseconds.

    return time[0] * 1000 + time[1] / 1000000;
  };
} // In a browser, use self.performance.now if it is available.
else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    now = self.performance.now.bind(self.performance);
  } // Use Date.now if it is available.
  else if (Date.now !== undefined) {
      now = Date.now;
    } // Otherwise, use 'new Date().getTime()'.
    else {
        now = function () {
          return new Date().getTime();
        };
      }

var now$1 = now;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tween
 */

exports.now = now$1;

var Group =
/** @class */
function () {
  function Group() {
    this._tweens = {};
    this._tweensAddedDuringUpdate = {};
  }

  Group.prototype.getAll = function () {
    var _this = this;

    return Object.keys(this._tweens).map(function (tweenId) {
      return _this._tweens[tweenId];
    });
  };

  Group.prototype.removeAll = function () {
    this._tweens = {};
  };

  Group.prototype.add = function (tween) {
    this._tweens[tween.getId()] = tween;
    this._tweensAddedDuringUpdate[tween.getId()] = tween;
  };

  Group.prototype.remove = function (tween) {
    delete this._tweens[tween.getId()];
    delete this._tweensAddedDuringUpdate[tween.getId()];
  };

  Group.prototype.update = function (time, preserve) {
    if (time === void 0) {
      time = now$1();
    }

    if (preserve === void 0) {
      preserve = false;
    }

    var tweenIds = Object.keys(this._tweens);

    if (tweenIds.length === 0) {
      return false;
    } // Tweens are updated in "batches". If you add a new tween during an
    // update, then the new tween will be updated in the next batch.
    // If you remove a tween during an update, it may or may not be updated.
    // However, if the removed tween was added during the current batch,
    // then it will not be updated.


    while (tweenIds.length > 0) {
      this._tweensAddedDuringUpdate = {};

      for (var i = 0; i < tweenIds.length; i++) {
        var tween = this._tweens[tweenIds[i]];
        var autoStart = !preserve;

        if (tween && tween.update(time, autoStart) === false && !preserve) {
          delete this._tweens[tweenIds[i]];
        }
      }

      tweenIds = Object.keys(this._tweensAddedDuringUpdate);
    }

    return true;
  };

  return Group;
}();
/**
 *
 */


exports.Group = Group;
var Interpolation = {
  Linear: function (v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.Linear;

    if (k < 0) {
      return fn(v[0], v[1], f);
    }

    if (k > 1) {
      return fn(v[m], v[m - 1], m - f);
    }

    return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
  },
  Bezier: function (v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Interpolation.Utils.Bernstein;

    for (var i = 0; i <= n; i++) {
      b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }

    return b;
  },
  CatmullRom: function (v, k) {
    var m = v.length - 1;
    var f = m * k;
    var i = Math.floor(f);
    var fn = Interpolation.Utils.CatmullRom;

    if (v[0] === v[m]) {
      if (k < 0) {
        i = Math.floor(f = m * (1 + k));
      }

      return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
    } else {
      if (k < 0) {
        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
      }

      if (k > 1) {
        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
      }

      return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
    }
  },
  Utils: {
    Linear: function (p0, p1, t) {
      return (p1 - p0) * t + p0;
    },
    Bernstein: function (n, i) {
      var fc = Interpolation.Utils.Factorial;
      return fc(n) / fc(i) / fc(n - i);
    },
    Factorial: function () {
      var a = [1];
      return function (n) {
        var s = 1;

        if (a[n]) {
          return a[n];
        }

        for (var i = n; i > 1; i--) {
          s *= i;
        }

        a[n] = s;
        return s;
      };
    }(),
    CatmullRom: function (p0, p1, p2, p3, t) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      var t2 = t * t;
      var t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
    }
  }
};
/**
 * Utils
 */

exports.Interpolation = Interpolation;

var Sequence =
/** @class */
function () {
  function Sequence() {}

  Sequence.nextId = function () {
    return Sequence._nextId++;
  };

  Sequence._nextId = 0;
  return Sequence;
}();

exports.Sequence = Sequence;
var mainGroup = new Group();
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var Tween =
/** @class */
function () {
  function Tween(_object, _group) {
    if (_group === void 0) {
      _group = mainGroup;
    }

    this._object = _object;
    this._group = _group;
    this._isPaused = false;
    this._pauseStart = 0;
    this._valuesStart = {};
    this._valuesEnd = {};
    this._valuesStartRepeat = {};
    this._duration = 1000;
    this._initialRepeat = 0;
    this._repeat = 0;
    this._yoyo = false;
    this._isPlaying = false;
    this._reversed = false;
    this._delayTime = 0;
    this._startTime = 0;
    this._easingFunction = Easing.Linear.None;
    this._interpolationFunction = Interpolation.Linear;
    this._chainedTweens = [];
    this._onStartCallbackFired = false;
    this._id = Sequence.nextId();
    this._isChainStopped = false;
    this._goToEnd = false;
  }

  Tween.prototype.getId = function () {
    return this._id;
  };

  Tween.prototype.isPlaying = function () {
    return this._isPlaying;
  };

  Tween.prototype.isPaused = function () {
    return this._isPaused;
  };

  Tween.prototype.to = function (properties, duration) {
    // TODO? restore this, then update the 07_dynamic_to example to set fox
    // tween's to on each update. That way the behavior is opt-in (there's
    // currently no opt-out).
    // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
    this._valuesEnd = Object.create(properties);

    if (duration !== undefined) {
      this._duration = duration;
    }

    return this;
  };

  Tween.prototype.duration = function (d) {
    this._duration = d;
    return this;
  };

  Tween.prototype.start = function (time) {
    if (this._isPlaying) {
      return this;
    } // eslint-disable-next-line


    this._group && this._group.add(this);
    this._repeat = this._initialRepeat;

    if (this._reversed) {
      // If we were reversed (f.e. using the yoyo feature) then we need to
      // flip the tween direction back to forward.
      this._reversed = false;

      for (var property in this._valuesStartRepeat) {
        this._swapEndStartRepeatValues(property);

        this._valuesStart[property] = this._valuesStartRepeat[property];
      }
    }

    this._isPlaying = true;
    this._isPaused = false;
    this._onStartCallbackFired = false;
    this._isChainStopped = false;
    this._startTime = time !== undefined ? typeof time === 'string' ? now$1() + parseFloat(time) : time : now$1();
    this._startTime += this._delayTime;

    this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);

    return this;
  };

  Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
    for (var property in _valuesEnd) {
      var startValue = _object[property];
      var startValueIsArray = Array.isArray(startValue);
      var propType = startValueIsArray ? 'array' : typeof startValue;
      var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]); // If `to()` specifies a property that doesn't exist in the source object,
      // we should not set that property in the object

      if (propType === 'undefined' || propType === 'function') {
        continue;
      } // Check if an Array was provided as property value


      if (isInterpolationList) {
        var endValues = _valuesEnd[property];

        if (endValues.length === 0) {
          continue;
        } // handle an array of relative values


        endValues = endValues.map(this._handleRelativeValue.bind(this, startValue)); // Create a local copy of the Array with the start value at the front

        _valuesEnd[property] = [startValue].concat(endValues);
      } // handle the deepness of the values


      if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
        _valuesStart[property] = startValueIsArray ? [] : {}; // eslint-disable-next-line

        for (var prop in startValue) {
          // eslint-disable-next-line
          // @ts-ignore FIXME?
          _valuesStart[property][prop] = startValue[prop];
        }

        _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
        // eslint-disable-next-line
        // @ts-ignore FIXME?

        this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
      } else {
        // Save the starting value, but only once.
        if (typeof _valuesStart[property] === 'undefined') {
          _valuesStart[property] = startValue;
        }

        if (!startValueIsArray) {
          // eslint-disable-next-line
          // @ts-ignore FIXME?
          _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
        }

        if (isInterpolationList) {
          // eslint-disable-next-line
          // @ts-ignore FIXME?
          _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
        } else {
          _valuesStartRepeat[property] = _valuesStart[property] || 0;
        }
      }
    }
  };

  Tween.prototype.stop = function () {
    if (!this._isChainStopped) {
      this._isChainStopped = true;
      this.stopChainedTweens();
    }

    if (!this._isPlaying) {
      return this;
    } // eslint-disable-next-line


    this._group && this._group.remove(this);
    this._isPlaying = false;
    this._isPaused = false;

    if (this._onStopCallback) {
      this._onStopCallback(this._object);
    }

    return this;
  };

  Tween.prototype.end = function () {
    this._goToEnd = true;
    this.update(Infinity);
    return this;
  };

  Tween.prototype.pause = function (time) {
    if (time === void 0) {
      time = now$1();
    }

    if (this._isPaused || !this._isPlaying) {
      return this;
    }

    this._isPaused = true;
    this._pauseStart = time; // eslint-disable-next-line

    this._group && this._group.remove(this);
    return this;
  };

  Tween.prototype.resume = function (time) {
    if (time === void 0) {
      time = now$1();
    }

    if (!this._isPaused || !this._isPlaying) {
      return this;
    }

    this._isPaused = false;
    this._startTime += time - this._pauseStart;
    this._pauseStart = 0; // eslint-disable-next-line

    this._group && this._group.add(this);
    return this;
  };

  Tween.prototype.stopChainedTweens = function () {
    for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
      this._chainedTweens[i].stop();
    }

    return this;
  };

  Tween.prototype.group = function (group) {
    this._group = group;
    return this;
  };

  Tween.prototype.delay = function (amount) {
    this._delayTime = amount;
    return this;
  };

  Tween.prototype.repeat = function (times) {
    this._initialRepeat = times;
    this._repeat = times;
    return this;
  };

  Tween.prototype.repeatDelay = function (amount) {
    this._repeatDelayTime = amount;
    return this;
  };

  Tween.prototype.yoyo = function (yoyo) {
    this._yoyo = yoyo;
    return this;
  };

  Tween.prototype.easing = function (easingFunction) {
    this._easingFunction = easingFunction;
    return this;
  };

  Tween.prototype.interpolation = function (interpolationFunction) {
    this._interpolationFunction = interpolationFunction;
    return this;
  };

  Tween.prototype.chain = function () {
    var tweens = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      tweens[_i] = arguments[_i];
    }

    this._chainedTweens = tweens;
    return this;
  };

  Tween.prototype.onStart = function (callback) {
    this._onStartCallback = callback;
    return this;
  };

  Tween.prototype.onUpdate = function (callback) {
    this._onUpdateCallback = callback;
    return this;
  };

  Tween.prototype.onRepeat = function (callback) {
    this._onRepeatCallback = callback;
    return this;
  };

  Tween.prototype.onComplete = function (callback) {
    this._onCompleteCallback = callback;
    return this;
  };

  Tween.prototype.onStop = function (callback) {
    this._onStopCallback = callback;
    return this;
  };
  /**
   * @returns true if the tween is still playing after the update, false
   * otherwise (calling update on a paused tween still returns true because
   * it is still playing, just paused).
   */


  Tween.prototype.update = function (time, autoStart) {
    if (time === void 0) {
      time = now$1();
    }

    if (autoStart === void 0) {
      autoStart = true;
    }

    if (this._isPaused) return true;
    var property;
    var elapsed;
    var endTime = this._startTime + this._duration;

    if (!this._goToEnd && !this._isPlaying) {
      if (time > endTime) return false;
      if (autoStart) this.start(time);
    }

    this._goToEnd = false;

    if (time < this._startTime) {
      return true;
    }

    if (this._onStartCallbackFired === false) {
      if (this._onStartCallback) {
        this._onStartCallback(this._object);
      }

      this._onStartCallbackFired = true;
    }

    elapsed = (time - this._startTime) / this._duration;
    elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;

    var value = this._easingFunction(elapsed); // properties transformations


    this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);

    if (this._onUpdateCallback) {
      this._onUpdateCallback(this._object, elapsed);
    }

    if (elapsed === 1) {
      if (this._repeat > 0) {
        if (isFinite(this._repeat)) {
          this._repeat--;
        } // Reassign starting values, restart by making startTime = now


        for (property in this._valuesStartRepeat) {
          if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
            this._valuesStartRepeat[property] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
          }

          if (this._yoyo) {
            this._swapEndStartRepeatValues(property);
          }

          this._valuesStart[property] = this._valuesStartRepeat[property];
        }

        if (this._yoyo) {
          this._reversed = !this._reversed;
        }

        if (this._repeatDelayTime !== undefined) {
          this._startTime = time + this._repeatDelayTime;
        } else {
          this._startTime = time + this._delayTime;
        }

        if (this._onRepeatCallback) {
          this._onRepeatCallback(this._object);
        }

        return true;
      } else {
        if (this._onCompleteCallback) {
          this._onCompleteCallback(this._object);
        }

        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
          // Make the chained tweens start exactly at the time they should,
          // even if the `update()` method was called way past the duration of the tween
          this._chainedTweens[i].start(this._startTime + this._duration);
        }

        this._isPlaying = false;
        return false;
      }
    }

    return true;
  };

  Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
    for (var property in _valuesEnd) {
      // Don't update properties that do not exist in the source object
      if (_valuesStart[property] === undefined) {
        continue;
      }

      var start = _valuesStart[property] || 0;
      var end = _valuesEnd[property];
      var startIsArray = Array.isArray(_object[property]);
      var endIsArray = Array.isArray(end);
      var isInterpolationList = !startIsArray && endIsArray;

      if (isInterpolationList) {
        _object[property] = this._interpolationFunction(end, value);
      } else if (typeof end === 'object' && end) {
        // eslint-disable-next-line
        // @ts-ignore FIXME?
        this._updateProperties(_object[property], start, end, value);
      } else {
        // Parses relative end values with start as base (e.g.: +10, -3)
        end = this._handleRelativeValue(start, end); // Protect against non numeric properties.

        if (typeof end === 'number') {
          // eslint-disable-next-line
          // @ts-ignore FIXME?
          _object[property] = start + (end - start) * value;
        }
      }
    }
  };

  Tween.prototype._handleRelativeValue = function (start, end) {
    if (typeof end !== 'string') {
      return end;
    }

    if (end.charAt(0) === '+' || end.charAt(0) === '-') {
      return start + parseFloat(end);
    } else {
      return parseFloat(end);
    }
  };

  Tween.prototype._swapEndStartRepeatValues = function (property) {
    var tmp = this._valuesStartRepeat[property];
    var endValue = this._valuesEnd[property];

    if (typeof endValue === 'string') {
      this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
    } else {
      this._valuesStartRepeat[property] = this._valuesEnd[property];
    }

    this._valuesEnd[property] = tmp;
  };

  return Tween;
}();

exports.Tween = Tween;
var VERSION = '18.6.4';
/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

exports.VERSION = VERSION;
var nextId = Sequence.nextId;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tweens.
 */

exports.nextId = nextId;
var TWEEN = mainGroup; // This is the best way to export things in a way that's compatible with both ES
// Modules and CommonJS, without build hacks, and so as not to break the
// existing API.
// https://github.com/rollup/rollup/issues/1961#issuecomment-423037881

var getAll = TWEEN.getAll.bind(TWEEN);
exports.getAll = getAll;
var removeAll = TWEEN.removeAll.bind(TWEEN);
exports.removeAll = removeAll;
var add = TWEEN.add.bind(TWEEN);
exports.add = add;
var remove = TWEEN.remove.bind(TWEEN);
exports.remove = remove;
var update = TWEEN.update.bind(TWEEN);
exports.update = update;
var _exports = {
  Easing: Easing,
  Group: Group,
  Interpolation: Interpolation,
  now: now$1,
  Sequence: Sequence,
  nextId: nextId,
  Tween: Tween,
  VERSION: VERSION,
  getAll: getAll,
  removeAll: removeAll,
  add: add,
  remove: remove,
  update: update
};
var _default = _exports;
exports.default = _default;
},{"process":"pBGv"}],"QTEq":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedValueWidget = void 0;

const src_1 = require("../../../src");

const tween_js_1 = require("@tweenjs/tween.js");

class AnimatedValueWidget extends src_1.Widget {
  constructor(state) {
    super();
    this.state = state;
    this.group = new tween_js_1.Group();
    this.state = state;
  }

  set(newState) {
    this.group.removeAll();

    for (let tween of this.group.getAll()) {
      tween.stop().stopChainedTweens();
    }

    this.state = newState;
  }

  update(newState, time) {
    this.group.removeAll();

    for (let tween of this.group.getAll()) {
      tween.stop().stopChainedTweens();
    }

    this.tween = new tween_js_1.Tween(this.state, this.group).easing(tween_js_1.Easing.Quadratic.Out).to(newState, time).start().onComplete(result => {
      this.state = result;
      this.tween = null;
    }).onStop(result => {
      this.state = newState;
      this.tween = null;
    });
    return this.tween;
  }

  willUpdate({
    tickerState
  }) {
    this.group.update(tickerState.currentTimestamp);
  }

}

exports.AnimatedValueWidget = AnimatedValueWidget;
},{"../../../src":"WdSo","@tweenjs/tween.js":"MxHY"}],"BusB":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackingPathOnGridWidget = void 0;

const src_1 = require("../../../src");

class TrackingPathOnGridWidget extends src_1.Widget {
  constructor(gridSize, tileSize) {
    super();
    this.gridSize = gridSize;
    this.tileSize = tileSize;
    this.isTracking = false;
    this.startPoint = null;
    this.endPoint = null;
    this.path = [];
    this.shouldNotifyPathStart = false;
    this.shouldNotifyPathUpdated = false;
    this.shouldNotifyPathEnd = false;
  }

  willUpdate(context) {
    const {
      inputState
    } = context;

    if (this.isTracking === false && inputState.isJustPressed(src_1.Key.LMB)) {
      return this.handlePathStart(context);
    } else if (this.isTracking === true && inputState.isPressed(src_1.Key.LMB)) {
      return this.handlePath(context);
    } else if (this.isTracking === true && inputState.isJustReleased(src_1.Key.LMB)) {
      return this.handlePathEnd(context);
    }
  }

  whenPathStarts(callback) {
    if (this.shouldNotifyPathStart) {
      this.shouldNotifyPathStart = false;
      callback();
    }
  }

  whenPathEnds(callback) {
    if (this.shouldNotifyPathEnd) {
      this.shouldNotifyPathEnd = false;
      callback();
    }
  }

  whenPathUpdates(callback) {
    if (this.shouldNotifyPathUpdated) {
      this.shouldNotifyPathUpdated = false;
      callback();
    }
  }

  clear() {
    this.isTracking = false;
    this.path = [];
    this.startPoint = null;
    this.endPoint = null;
  }

  handlePathStart({
    inputState,
    matrix
  }) {
    const candidate = this.transformMousePosition(inputState.mouse, matrix);

    if (this.isPointContainedInTheGrid(candidate)) {
      this.isTracking = true;
      this.path = [candidate];
      this.startPoint = candidate;
      this.shouldNotifyPathStart = true;
    }
  }

  handlePath({
    inputState,
    matrix
  }) {
    const candidate = this.transformMousePosition(inputState.mouse, matrix);

    if (this.isPointContainedInTheGrid(candidate) && !this.lastPathPoint.equals(candidate) && this.lastPathPoint.distance(candidate) === 1) {
      const index = this.path.findIndex(candidate.equals, candidate);
      const isPenultimate = index === this.path.length - 2;

      if (isPenultimate && index !== -1) {
        this.path = this.path.slice(0, index);
      }

      if (index === -1 || isPenultimate) {
        this.endPoint = candidate;
        this.path.push(candidate);
        this.shouldNotifyPathUpdated = true;
      }
    }
  }

  handlePathEnd(_context) {
    this.isTracking = false;
    this.shouldNotifyPathEnd = true;
  }

  get lastPathPoint() {
    return this.path[this.path.length - 1];
  }

  isPointContainedInTheGrid(point) {
    return point.x >= 0 && point.x < this.gridSize.x && point.y >= 0 && point.y < this.gridSize.y;
  }

  transformMousePosition(initial, matrix) {
    return initial.transform(matrix.inverse()).snapToGrid(this.tileSize).div(this.tileSize).add(this.gridSize.div(2).floor());
  }

}

exports.TrackingPathOnGridWidget = TrackingPathOnGridWidget;
},{"../../../src":"WdSo"}],"ZPkJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridScene = exports.GridEntity = void 0;

const src_1 = require("../../../src");

const AnimationWidget_1 = require("../widgets/AnimationWidget");

const PathOnGridWidget_1 = require("../widgets/PathOnGridWidget");

class GridEntity extends src_1.Entity {
  constructor(position) {
    super();
    this.position = position;
    this.widgets = [];
  }

  update() {}

  draw({
    ctx
  }) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

}

exports.GridEntity = GridEntity;

const prepare = v => v.add(-6, -4).mul(100);

class CreateTrackEntity extends src_1.Entity {
  constructor() {
    super(...arguments);
    this.trackWidget = new PathOnGridWidget_1.TrackingPathOnGridWidget(src_1.vec2(13, 9), src_1.vec2(100));
    this.tween = new AnimationWidget_1.AnimatedValueWidget({
      size: 0
    });
    this.lastPoint = new AnimationWidget_1.AnimatedValueWidget({
      x: 0,
      y: 0
    });
    this.widgets = [this.trackWidget, this.tween, this.lastPoint];
    this.path = [];
  }

  update({
    inputState,
    matrix
  }) {
    this.trackWidget.whenPathStarts(() => {
      console.log('tarl');
      this.lastPoint.set(this.trackWidget.path[0].o);
    });
    this.trackWidget.whenPathUpdates(() => {
      const oldPath = this.path;
      const newPath = this.trackWidget.path.slice(0);

      if (newPath.length > 1) {
        this.tween.update({
          size: 26
        }, 250);

        if (oldPath.length > newPath.length) {
          this.lastPoint.set(oldPath[oldPath.length - 1].o);
          this.lastPoint.update(newPath[newPath.length - 1].o, 50).onComplete(() => {
            this.path = newPath;
          }).onStop(() => {
            this.path = newPath;
          });
        } else if (oldPath.length < newPath.length) {
          this.path = newPath;
          this.lastPoint.set(newPath[newPath.length - 2].o);
          this.lastPoint.update(newPath[newPath.length - 1].o, 150);
        }
      }
    });
    this.trackWidget.whenPathEnds(() => {
      this.tween.update({
        size: 0
      }, 150).onComplete(() => {
        this.trackWidget.clear();
        this.path = [];
      });
    });
  }

  draw({
    ctx
  }) {
    if (this.path.length > 1) {
      const path = this.path.slice(0, this.path.length - 1);
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = this.tween.state.size * 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(...path[0].pipe(prepare).e);

      for (let point of path.slice(1)) {
        ctx.lineTo(...point.pipe(prepare).e);
      }

      const lastPoint = src_1.Vector2.from(this.lastPoint.state).pipe(prepare);
      ctx.lineTo(...lastPoint.e);
      ctx.stroke();
    }
  }

}

class GridScene extends src_1.Scene {
  constructor() {
    super(...arguments);
    this.gridSize = 100;
    this.grid = [];
    this.size = src_1.vec2(13, 9);
  }

  willMount() {
    for (let i = 0; i < this.size.simpleProduct(); i++) {
      const position = this.size.asStride(i).pipe(prepare);
      const entity = new GridEntity(position);
      this.grid.push(entity);
    }

    this.addAll(this.grid);
    this.add(new CreateTrackEntity());
  }

  prepare(updateContext, {
    ctx,
    canvasSize
  }) {
    ctx.save();
    const half = canvasSize.div(2);
    ctx.translate(half.x, half.y);
    updateContext.matrix = ctx.getTransform();
  }

  cleanup(updateContext, {
    ctx
  }) {
    ctx.restore();
    updateContext.matrix = ctx.getTransform();
  }

}

exports.GridScene = GridScene;
},{"../../../src":"WdSo","../widgets/AnimationWidget":"QTEq","../widgets/PathOnGridWidget":"BusB"}],"QCba":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const src_1 = require("../../src");

const GridScene_1 = require("./scenes/GridScene");

const canvas = document.querySelector('#app');
const engine = new src_1.Engine({
  canvas: canvas,
  size: src_1.vec2(window.innerWidth, window.innerHeight),
  ticker: new src_1.AnimationFrameTicker()
});
engine.registerScene('grid', GridScene_1.GridScene);
engine.start();
engine.pushScene('grid');
},{"../../src":"WdSo","./scenes/GridScene":"ZPkJ"}]},{},["QCba"], null)
//# sourceMappingURL=/engine/example/dist/src.8e541c7a.js.map