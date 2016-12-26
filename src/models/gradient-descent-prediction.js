import CostFunction from '../algorithms/cost-function';
import GradientDescent from '../algorithms/gradient-descent';
import Normalizer from '../algorithms/normalize';

export default class GradientDescentPrediction {

    constructor(options) {
        this.alpha = options.alpha || 0.01;
        this.iterations = options.iterations || 400;
        this.normalizeData = options.normalizeData === false ? false : true,
        this.theta = [];
        this.features = ['listPrice', 'rent', 'livingArea', 'rooms', 'constructionYear', 'soldPrice', 'floor'];
    }

    train(X, y, theta) {

        if (this.normalizeData === true) {
            X = new Normalizer().calculate(X).data;
        }

        let gradientDescent = new GradientDescent();
        let calculations = gradientDescent.calculate(X, y, theta, this.alpha, this.iterations);

        for (let calculation of calculations) {
            this.theta = calculation.theta;
            this.J = calculation.J;
        }
    }

    predict(inputData) {
        return inputData.transpose().multiply(this.theta);
    }
}