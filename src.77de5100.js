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
})({"../../src/assetLoader/AssetDefinition.ts":[function(require,module,exports) {
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
},{}],"../../src/assetLoader/Asset.ts":[function(require,module,exports) {
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
},{"./AssetDefinition":"../../src/assetLoader/AssetDefinition.ts"}],"../../src/assetLoader/assetTypes/ImageAsset.ts":[function(require,module,exports) {
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
},{"../Asset":"../../src/assetLoader/Asset.ts","../AssetDefinition":"../../src/assetLoader/AssetDefinition.ts"}],"../../src/assetLoader/assetTypes/SoundAsset.ts":[function(require,module,exports) {
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
},{"../Asset":"../../src/assetLoader/Asset.ts","../AssetDefinition":"../../src/assetLoader/AssetDefinition.ts"}],"../../src/assetLoader/assetTypes/index.ts":[function(require,module,exports) {
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
},{"./ImageAsset":"../../src/assetLoader/assetTypes/ImageAsset.ts","./SoundAsset":"../../src/assetLoader/assetTypes/SoundAsset.ts"}],"../../src/assetLoader/AssetLoader.ts":[function(require,module,exports) {
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
},{"./AssetDefinition":"../../src/assetLoader/AssetDefinition.ts","./assetTypes":"../../src/assetLoader/assetTypes/index.ts"}],"../../src/assetLoader/index.ts":[function(require,module,exports) {
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
},{"./Asset":"../../src/assetLoader/Asset.ts","./AssetDefinition":"../../src/assetLoader/AssetDefinition.ts","./AssetLoader":"../../src/assetLoader/AssetLoader.ts","./assetTypes":"../../src/assetLoader/assetTypes/index.ts"}],"../../src/math/Vector2.ts":[function(require,module,exports) {
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

    this.add = (x, y) => Vector2.of(this.x + x, this.y + (y ?? x));

    this.mul = (x, y) => Vector2.of(this.x * x, this.y * (y ?? x));

    this.div = (x, y) => Vector2.of(this.x / x, this.y / (y ?? x));

    this.pipe = fn => fn(this);

    this.equals = other => this.x === other.x && this.y === other.y;

    this.distance = other => Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));

    this.snapToGrid = size => Vector2.of(Math.round(this.x / size.x) * size.x, Math.round(this.y / size.y) * size.y);

    this.transform = matrix => Vector2.fromDOMPoint(matrix.transformPoint({
      x: this._x,
      y: this._y
    }));
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
},{}],"../../src/inputManager/InputState.ts":[function(require,module,exports) {
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
},{}],"../../src/inputManager/InputManager.ts":[function(require,module,exports) {
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
},{"./InputState":"../../src/inputManager/InputState.ts","../math/Vector2":"../../src/math/Vector2.ts"}],"../../src/engine/Engine.ts":[function(require,module,exports) {
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
    const updateContext = {
      ctx: this.context,
      inputState: inputState,
      tickerState: tickerState,
      canvasSize: this.canvasSize
    };

    for (let scene of this.stack) {
      scene.update(updateContext);
    }

    const drawContext = {
      ctx: this.context,
      tickerState: tickerState,
      canvasSize: this.canvasSize
    };

    for (let scene of this.stack) {
      scene.draw(drawContext);
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
},{"../math/Vector2":"../../src/math/Vector2.ts","../inputManager/InputManager":"../../src/inputManager/InputManager.ts"}],"../../src/entity/Entity.ts":[function(require,module,exports) {
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
},{}],"../../src/entity/TextEntity.ts":[function(require,module,exports) {
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
},{"../../src/entity/Entity":"../../src/entity/Entity.ts"}],"../../src/inputManager/Key.ts":[function(require,module,exports) {
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
},{}],"../../src/scene/Scene.ts":[function(require,module,exports) {
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
},{}],"../../src/ticker/Ticker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ticker = void 0;

class Ticker {}

exports.Ticker = Ticker;
},{}],"../../src/ticker/AnimationFrameTicker.ts":[function(require,module,exports) {
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
},{"./Ticker":"../../src/ticker/Ticker.ts"}],"../../src/widgets/Widget.ts":[function(require,module,exports) {
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
},{}],"../../src/widgets/MousePath.ts":[function(require,module,exports) {
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
},{"./Widget":"../../src/widgets/Widget.ts"}],"../../src/index.ts":[function(require,module,exports) {
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
},{"./assetLoader/index":"../../src/assetLoader/index.ts","./engine/Engine":"../../src/engine/Engine.ts","./entity/Entity":"../../src/entity/Entity.ts","./entity/TextEntity":"../../src/entity/TextEntity.ts","./inputManager/InputManager":"../../src/inputManager/InputManager.ts","./inputManager/InputState":"../../src/inputManager/InputState.ts","./inputManager/Key":"../../src/inputManager/Key.ts","./math/Vector2":"../../src/math/Vector2.ts","./scene/Scene":"../../src/scene/Scene.ts","./ticker/Ticker":"../../src/ticker/Ticker.ts","./ticker/AnimationFrameTicker":"../../src/ticker/AnimationFrameTicker.ts","./widgets/Widget":"../../src/widgets/Widget.ts","./widgets/MousePath":"../../src/widgets/MousePath.ts"}],"scenes/GridScene.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridScene = exports.GridEntity = void 0;

const src_1 = require("../../../src");

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

const invert = v => v.div(100).add(6, 4);

class TrackEntity extends src_1.Entity {
  constructor(path) {
    super();
    this.path = path;
    this.widgets = [];
  }

  update() {}

  draw({
    ctx
  }) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 100;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.moveTo(...this.path[0].pipe(prepare).e);

    for (let point of this.path.slice(1)) {
      ctx.lineTo(...point.pipe(prepare).e);
    }

    ctx.stroke();
  }

}

class CreateTrackEntity extends src_1.Entity {
  constructor() {
    super(...arguments);
    this.widgets = [];
    this.isTracking = false;
    this.startingPoint = null;
    this.nextPoint = null;
    this.path = [];
  }

  update({
    inputState,
    ctx
  }) {
    if (this.isTracking === false && inputState.isJustPressed(src_1.Key.LMB)) {
      const candidate = inputState.mouse.transform(ctx.getTransform().inverse()).snapToGrid(src_1.vec2(100)).pipe(invert);

      if (candidate.x >= 0 && candidate.x <= 12 && candidate.y >= 0 && candidate.y <= 8) {
        this.isTracking = true;
        this.startingPoint = candidate;
        this.path.push(candidate);
      }
    } else if (this.isTracking === true && inputState.isPressed(src_1.Key.LMB)) {
      const candidate = inputState.mouse.transform(ctx.getTransform().inverse()).snapToGrid(src_1.vec2(100)).pipe(invert);

      if (candidate.x >= 0 && candidate.x <= 12 && candidate.y >= 0 && candidate.y <= 8) {
        if (!this.path[this.path.length - 1].equals(candidate) && this.path[this.path.length - 1].distance(candidate) === 1) {
          const index = this.path.findIndex(v => v.equals(candidate));

          if (index === -1) {
            this.nextPoint = candidate;
            this.path.push(candidate);
          } else if (index === this.path.length - 2) {
            this.nextPoint = candidate;
            this.path = this.path.slice(0, index);
            this.path.push(candidate);
          }
        }
      }
    }

    if (this.isTracking === true && inputState.isJustReleased(src_1.Key.LMB)) {
      this.startingPoint = null;
      this.nextPoint = null;
      this.path = [];
      this.isTracking = false;
    }
  }

  draw({
    ctx
  }) {
    if (this.path.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 50;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.moveTo(...this.path[0].pipe(prepare).e);

      for (let point of this.path.slice(1)) {
        ctx.lineTo(...point.pipe(prepare).e);
      }

      ctx.stroke();
    }

    if (this.startingPoint) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(...this.startingPoint.pipe(prepare).e, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    if (this.nextPoint) {
      ctx.fillStyle = 'rgba(0, 255, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(...this.nextPoint.pipe(prepare).e, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
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

  willUpdate({
    ctx,
    canvasSize
  }) {
    ctx.save();
    const half = canvasSize.div(2);
    ctx.translate(half.x, half.y);
  }

  didDraw({
    ctx
  }) {
    ctx.restore();
  }

}

exports.GridScene = GridScene;
},{"../../../src":"../../src/index.ts"}],"index.ts":[function(require,module,exports) {
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
},{"../../src":"../../src/index.ts","./scenes/GridScene":"scenes/GridScene.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42349" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map