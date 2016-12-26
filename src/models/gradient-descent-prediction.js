import CostFunction from '../algorithms/cost-function';
import GradientDescent from '../algorithms/gradient-descent';
import Normalizer from '../algorithms/normalize';

export default class GradientDescentPrediction {

    constructor(options) {
        this.alpha = options.alpha || 0.01;
        this.iterations = options.iterations || 400;
        this.normalizeData = options.normalizeData === false ? false : true;
        this.theta = [];
    }

    train(X, y, theta) {

        if (this.normalizeData === true) {
            X = new Normalizer().calculate(X).data;
        }

        let gradientDescent = new GradientDescent();
        let results = gradientDescent.calculate(X, y, theta, this.alpha, this.iterations);

        for (let result of results) {
            this.theta = result.theta;
            this.J = result.J;
        }

        return this;
    }

    predict(inputData) {
        return inputData.transpose().multiply(this.theta);
    }
}