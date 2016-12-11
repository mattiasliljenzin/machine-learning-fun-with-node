"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HousingData = function () {
    function HousingData(source) {
        _classCallCheck(this, HousingData);

        this.source = source;
    }

    _createClass(HousingData, [{
        key: "getFeatures",
        value: regeneratorRuntime.mark(function getFeatures(features) {
            var i,
                arg,
                prop,
                _args = arguments;
            return regeneratorRuntime.wrap(function getFeatures$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i < _args.length)) {
                                _context.next = 10;
                                break;
                            }

                            arg = _args[i];
                            prop = this.source[arg];

                            if (!prop) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 7;
                            return prop;

                        case 7:
                            i++;
                            _context.next = 1;
                            break;

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, getFeatures, this);
        })
    }]);

    return HousingData;
}();

exports.default = HousingData;