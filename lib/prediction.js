'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _machine_learning = require('machine_learning');

var _machine_learning2 = _interopRequireDefault(_machine_learning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prediction = function () {
    function Prediction(data) {
        _classCallCheck(this, Prediction);

        this.data = data;
        this.features = ['listPrice', 'rent', 'livingArea', 'rooms', 'constructionYear', 'soldPrice', 'floor'];
    }

    _createClass(Prediction, [{
        key: 'linearRegression',
        value: function linearRegression() {}
    }]);

    return Prediction;
}();

exports.default = Prediction;