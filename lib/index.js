'use strict';

var _booliConnect = require('./booli-connect');

var _booliConnect2 = _interopRequireDefault(_booliConnect);

var _housingData = require('./housing-data');

var _housingData2 = _interopRequireDefault(_housingData);

var _prediction = require('./prediction');

var _prediction2 = _interopRequireDefault(_prediction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('starting...');

extract(function (data) {
	load(data, function (data) {
		transform(data, function () {
			console.log('');
			console.log('Done!');
			console.log('-----');
		});
	});
});

function extract(cb) {

	console.log('');
	console.log('extracting data...');
	console.log('------------------');

	_booliConnect2.default.query(function (status, data) {
		console.log('status response: ' + status);
		console.log('listing total hits: ' + data.totalCount);
		console.log('listing result hits: ' + data.count);
		cb(data);
	});
}

function load(data, cb) {

	console.log('');
	console.log('loading data...');
	console.log('----------------');

	var hits = new Array();

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = data.sold[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var listing = _step.value;

			hits.push(new _housingData2.default(listing));
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	cb(hits);
}

function transform(data, cb) {
	console.log('');
	console.log('transforming data...');
	console.log('--------------------');

	var prediction = new _prediction2.default(data);
	prediction.linearRegression();

	cb();
}