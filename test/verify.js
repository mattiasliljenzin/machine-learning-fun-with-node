import chai, {
    expect,
    should,
    assert
} from 'chai';
import math from 'mathjs';
import Controller from '../src/controller';
import CostFunction from '../src/algorithms/cost-function';
import GradientDescent from '../src/algorithms/gradient-descent';
import Normalizer from '../src/algorithms/normalize';

describe('algorithm verifying step', function () {

    const getData = () => Object.assign({}, testData);
    const getDataMulti = () => Object.assign({}, testDataMulti);

    const testData = {
        iterations: 1500,
        alpha: 0.01
    };

    const testDataMulti = {
        iterations: 1500,
        alpha: 0.01
    };


    before('should read data into matrices', async() => {
        let controller = new Controller();
        let result = await controller.load('./test/data.txt');

        assert.equal(97, result.rows, '97 rows in a 97x2 matrix');
        assert.equal(2, result.columns, '2 columns in a 97x2 matrix');
        assert.equal(result.rows, result.m, 'm equals number of rows');
        assert.equal(1, result.X._data[0][0], 'Padded with 1s');
        assert.equal(6.1101, result.X._data[0][1], 'First value of x');
        assert.equal(1, result.y.size()[1], 'Output is one dimension only');

        testData.X = result.X;
        testData.y = result.y;
        testData.theta = result.theta;
    });

    before('should read data into matrices with multiple variables', async() => {
        let controller = new Controller();
        let result = await controller.load('./test/data-multi.txt');

        assert.equal(47, result.rows, '47 rows in a 47x3 matrix');
        assert.equal(3, result.columns, '3 columns in a 47x3 matrix');
        assert.equal(result.rows, result.m, 'm equals number of rows');
        assert.equal(1, result.X._data[0][0], 'Padded with 1s');
        assert.equal(2104, result.X._data[0][1], 'First value of x');
        assert.equal(3, result.X._data[0][2], 'Second value of x');
        assert.equal(1, result.y.size()[1], 'Output is one dimension only');

        testDataMulti.X = result.X;
        testDataMulti.y = result.y;
        testDataMulti.theta = result.theta;
    });

    it('should calculate cost function', async () => {
        let data = getData();
        let costFunction = new CostFunction();
        let J = costFunction.calculate(data.X, data.y, data.theta);

        assert.equal(32.072733877455654, J, 'Cost function calculation ok')
    });

    it('should calculate cost function multi', async () => {
        let data = getDataMulti();
        let costFunction = new CostFunction();
        let J = costFunction.calculate(data.X, data.y, data.theta);

        assert.equal(65591548106.45744, J, 'Cost function calculation ok')
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

    it('should calculate gradient descent multi', async() => {
        let data = getDataMulti();
        let gradientDescent = new GradientDescent();
        let normalizer = new Normalizer();
        let normalized = normalizer.calculate(data.X);
        let J = gradientDescent.calculate(normalized.data, data.y, data.theta, data.alpha, data.iterations);
        let result;

        for (var iteration of J) {
            //console.log(iteration.history); // validate value J of cost function
            result = iteration;
        }

        assert.equal(334302.063993, iteration.theta._data[0], 'theta 1 ok');
        assert.equal(100087.116006, iteration.theta._data[1], 'theta 2 ok');
        assert.equal(3673.548451, iteration.theta._data[2], 'theta 3 ok');
        assert.equal(4.483388256587725, result.J, 'Cost function OK');
    });

    it('should calculate normalized data', async () => {
        let data = getDataMulti();
        let normalizer = new Normalizer();
        let result = normalizer.calculate(data.X);
        assert.fail('not done yet')
    });
});