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
import GradientDescentPrediction from '../src/models/gradient-descent-prediction';
import NormalEquation from '../src/algorithms/normal-equation';
import {
    Vector,
    Matrix
} from 'sylvester';


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
        assert.equal(1, result.X.e(1, 1), 'Padded with 1s');
        assert.equal(6.1101, result.X.e(1, 2), 'First value of x');
        assert.equal(17.592, result.y.e(1, 1), 'Second value of x');
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
        assert.equal(1, result.X.e(1, 1), 'Padded with 1s');
        assert.equal(2104, result.X.e(1, 2), 'First value of x');
        assert.equal(3, result.X.e(1, 3), 'Second value of x');
        assert.equal(399900, result.y.e(1, 1), 'Second value of x');
        assert.equal(1, result.y.dimensions().cols, 'Output is one dimension only');
        assert.equal(3, result.theta.dimensions().cols);
        assert.equal(1, result.theta.dimensions().rows);

        testDataMulti.X = result.X;
        testDataMulti.y = result.y;
        testDataMulti.theta = result.theta;
    });

    it('should calculate cost function with single variable', async() => {
        let data = getData();
        let costFunction = new CostFunction();
        let J = costFunction.calculate(data.X, data.y, data.theta);

        assert.equal(32.072733877455654, J, 'Cost function calculation ok')
    });

    it('should calculate cost function with multi variables', async() => {
        let data = getDataMulti();
        let costFunction = new CostFunction();
        let J = costFunction.calculate(data.X, data.y, data.theta);

        assert.equal(65591548106.45744, J, 'Cost function calculation ok')
    });

    it('should calculate normal equation with single variable', async() => {
        let data = getData();
        let normalEquation = new NormalEquation();
        let theta = normalEquation.calculate(data.X, data.y);

        assert.equal(-3.8957808783118466, theta.e(1,1))
        assert.equal(1.1930336441895921, theta.e(2,1))
    });

    it('should calculate normal equation with multiple variables', async() => {
        let data = getDataMulti();
        let normalEquation = new NormalEquation();
        let theta = normalEquation.calculate(data.X, data.y);

        assert.equal(89597.90954279713, theta.e(1,1))
        assert.equal(139.21067401762554, theta.e(2,1))
        assert.equal(-8738.019112328067, theta.e(3,1))
    });

    it('should calculate gradient descent with single feature', async() => {
        let data = getData();
        let gradientDescent = new GradientDescent();
        let J = gradientDescent.calculate(data.X, data.y, data.theta, data.alpha, data.iterations);
        let result;

        for (let iteration of J) {
            //console.log(iteration); // validate value J of cost function
            result = iteration;
        }

        assert.equal(4.483388256587726, result.J, 'Cost function OK');
        assert.equal(-3.6302914394043584, result.theta.e(1, 1), 'theta 1 ok');
        assert.equal(1.1663623503355818, result.theta.e(2, 1), 'theta 2 ok');
    });

    it('should calculate gradient descent with multi variables', async() => {
        let data = getDataMulti();
        let gradientDescent = new GradientDescent();
        let normalizer = new Normalizer();
        let normalized = normalizer.calculate(data.X);
        let J = gradientDescent.calculate(normalized.data, data.y, data.theta, data.alpha, data.iterations);
        let result;

        for (let iteration of J) {
            result = iteration;
            //console.log('J: ' + result.J);
        }
        assert.equal(334302.06399327697, result.theta.e(1, 1), 'theta 1 ok');
        assert.equal(100087.11600584643, result.theta.e(2, 1), 'theta 2 ok');
        assert.equal(3673.548450928256, result.theta.e(3, 1), 'theta 3 ok');
        assert.equal(2108850058.4007058, result.J, 'Cost function OK');
    });

    it('should calculate normalized data with multiple variables', async() => {
        let data = getDataMulti();
        let normalizer = new Normalizer();
        let result = normalizer.calculate(data.X);

        assert.equal(1, result.mu.e(1, 1));
        assert.equal(2000.6808510638298, result.mu.e(2, 1));
        assert.equal(3.1702127659574466, result.mu.e(3, 1));

        assert.equal(0, result.sigma.e(1, 1));
        assert.equal(794.7023535338897, result.sigma.e(2, 1));
        assert.equal(0.7609818867800999, result.sigma.e(3, 1));

        assert.equal(1, result.data.e(1, 1));
        assert.equal(0.13000986907454054, result.data.e(1, 2));
        assert.equal(-0.2236751871685913, result.data.e(1, 3));
    });

    it('should predict single feature data with gradient descent', async() => {
        let data = getData();
        let options = {
            alpha: 0.01,
            iterations: 1500,
            normalizeData: false
        };

        let input1 = Matrix.create([1, 3.5])
        let input2 = Matrix.create([1, 7.0]);

        let model = new GradientDescentPrediction(options);
        let prediction1 = model.predict(input1, data.X, data.y, data.theta);
        let prediction2 = model.predict(input2, data.X, data.y, data.theta);

        assert.equal(4519.767867701776, prediction1.e(1,1) * 10000);
        assert.equal(45342.45012944714, prediction2.e(1,1) * 10000);
    });

    it('should predict multi feature data with gradient descent', async() => {
        let data = getDataMulti();
        let options = {
            alpha: 0.01,
            iterations: 400,
            normalizeData: true
        };

        let input = Matrix.create([1, 1650, 3]);

        let model = new GradientDescentPrediction(options);
        let prediction = model.predict(input, data.X, data.y, data.theta);

        assert.equal(165489064.11899266, prediction.e(1,1)); // this has not converged well
    });
});