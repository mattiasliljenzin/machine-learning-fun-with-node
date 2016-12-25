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
        iterations: 400,
        alpha: 0.01
    };


    before('should read data into matrices', async() => {
        let controller = new Controller();
        let result = controller.load2('./test/data.txt');

        assert.equal(97, result.rows, '97 rows in a 97x2 matrix');
        assert.equal(2, result.columns, '2 columns in a 97x2 matrix');
        assert.equal(result.rows, result.m, 'm equals number of rows');
        assert.equal(1, result.X.e(1,1), 'Padded with 1s');
        assert.equal(6.1101, result.X.e(1,2), 'First value of x');
        assert.equal(17.592, result.y.e(1,1), 'Second value of x');
        assert.equal(1, result.y.dimensions().cols, 'Output is one dimension only');
        assert.equal(2, result.theta.dimensions().cols);
        assert.equal(1, result.theta.dimensions().rows);

        testData.X = result.X;
        testData.y = result.y;
        testData.theta = result.theta;
    });

    before('should read data into matrices with multiple variables', async() => {
        let controller = new Controller();
        let result = await controller.load2('./test/data-multi.txt');

        assert.equal(47, result.rows, '47 rows in a 47x3 matrix');
        assert.equal(3, result.columns, '3 columns in a 47x3 matrix');
        assert.equal(result.rows, result.m, 'm equals number of rows');
        assert.equal(1, result.X.e(1,1), 'Padded with 1s');
        assert.equal(2104, result.X.e(1,2), 'First value of x');
        assert.equal(3, result.X.e(1,3), 'Second value of x');
        assert.equal(399900, result.y.e(1,1), 'Second value of x');
        assert.equal(1, result.y.dimensions().cols, 'Output is one dimension only');
        assert.equal(3, result.theta.dimensions().cols);
        assert.equal(1, result.theta.dimensions().rows);

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

    it('should calculate gradient descent single', async() => {
        let data = getData();
        let gradientDescent = new GradientDescent();
        let J = gradientDescent.calculate(data.X, data.y, data.theta, data.alpha, data.iterations);
        let result;

        for (var iteration of J) {
            //console.log(iteration); // validate value J of cost function
            result = iteration;
        }
        
        assert.equal(4.483388256587726, result.J, 'Cost function OK');
        assert.equal(-3.6302914394043584, result.theta.e(1,1), 'theta 1 ok');
        assert.equal(1.1663623503355818, result.theta.e(2,1), 'theta 2 ok');
    });

    it('should calculate gradient descent multi', async() => {
        let data = getDataMulti();
        let gradientDescent = new GradientDescent();
        let normalizer = new Normalizer();
        let normalized = normalizer.calculate(data.X);
        let J = gradientDescent.calculate(normalized.data, data.y, data.theta, data.alpha, data.iterations);
        let result;

        for (var iteration of J) {
            //console.log(iteration.J); // validate value J of cost function
            result = iteration;
            //console.log('J: ' + result.J);
        }
        assert.equal(334302.06399327697, result.theta.e(1,1), 'theta 1 ok');
        assert.equal(100087.11600584643, result.theta.e(2,1), 'theta 2 ok');
        assert.equal(3673.548450928256, result.theta.e(3,1), 'theta 3 ok');
        assert.equal(2108850058.4007058, result.J, 'Cost function OK');
    });

    it('should calculate normalized data', async () => {
        let data = getDataMulti();
        let normalizer = new Normalizer();
        let result = normalizer.calculate(data.X);

        assert.equal(1, result.mu.e(1,1));
        assert.equal(2000.6808510638298, result.mu.e(2,1));
        assert.equal(3.1702127659574466, result.mu.e(3,1));

        assert.equal(0, result.sigma.e(1,1));
        assert.equal(794.7023535338897, result.sigma.e(2,1));
        assert.equal(0.7609818867800999, result.sigma.e(3,1));

        assert.equal(1, result.data.e(1,1));
        assert.equal(0.13000986907454054, result.data.e(1,2));
        assert.equal(-0.2236751871685913, result.data.e(1,3));
    });
});