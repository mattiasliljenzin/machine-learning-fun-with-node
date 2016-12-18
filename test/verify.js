import chai, { expect, should, assert } from 'chai';
import math from 'mathjs';
import MatrixSource from './matrixsource';

describe('algorithm verifying step', function () {

    it('should read data into matrices and calculate the value of cost function J', async function () {

        let ds = new MatrixSource();
        let data = await ds.get();
        let size = data.size();

        let rows = size[0];
        let columns = size[1];
        let m = rows;

        assert.equal(97, rows, '97 rows in a 97x2 matrix');
        assert.equal(2, columns, '2 columns in a 97x2 matrix');
        assert.equal(rows, m, 'm equals number of rows');

        let x = data.subset(math.index(math.range(0, m), 0));
        let y = data.subset(math.index(math.range(0, m), 1));

        let X = math.concat(math.ones(m, 1), x);
        assert.equal(1, X._data[0][0], 'Padded with 1s');
        assert.equal(6.1101, X._data[0][1], 'First value of x');

        let theta = math.zeros(2, 1);
        let h = math.multiply(X, theta);
        assert.equal(true, h._data.filter(f => f == 0).length == m);

        let diff = math.subtract(h, y);
        let sqrErrors = math.dotPow(diff, 2);
        let J = 1 / (2 * m) * math.sum(sqrErrors);
        assert.equal(32.072733877455654, J, 'Cost function calculation ok')
        console.log(J);
    });


});