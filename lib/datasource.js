function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import math from 'mathjs';
import FileLoader from './await-fileloader';

export default class DataSource {
    constructor() {}

    load(cb) {
        return _asyncToGenerator(function* () {
            let fileloader = new FileLoader();

            let data = yield fileloader.get();
            let lines = data.split('\n').map(function (x) {
                return x.split(',');
            }).filter(function (x) {
                return x.length == 2;
            });

            cb(math.matrix(lines));
        })();
    }
}