import chai, {
    expect,
    should,
    assert
} from 'chai';
import math from 'mathjs';
import FileDataSource from '../src/data/datasource';
import CostFunction from '../src/algorithms/cost-function';
import GradientDescent from '../src/algorithms/gradient-descent';

describe('algorithm verifying step', function () {

    const testData = {
        X: [],
        y: [],
        theta: [],
        iterations: 1500,
        alpha: 0.01
    };

    var getData = () => Object.assign({}, testData);

    before('should read data into matrices', async() => {

        let source = new FileDataSource();
        let data = await source.get('./test/data.txt');

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

        testData.theta = theta;
        testData.X = X;
        testData.y = y;
    });

    it('should calculate cost function', async () => {
        let data = getData();
        let costFunction = new CostFunction();
        let J = costFunction.calculate(data.X, data.y, data.theta);

        assert.equal(32.072733877455654, J, 'Cost function calculation ok')
    });

    it('should calculate gradient descent', async() => {
        let data = getData();
        let gradientDescent = new GradientDescent();
        let J = gradientDescent.calculate(data.X, data.y, data.theta, data.alpha, data.iterations);
        let result;

        for (var iteration of J) {
            //console.log(iteration.history); // validate value J of cost function
            result = iteration;
        }
        
        assert.equal(4.483388256587725, result.J, 'Cost function OK');
        assert.equal(-3.63029143940436, iteration.theta._data[0], 'theta 1 ok');
        assert.equal(1.166362350335582, iteration.theta._data[1], 'theta 2 ok');
    });
});