import ML from 'machine_learning';
import CostFunction from '../algorithms/cost-function';
import GradientDescent from '../algorithms/gradient-descent';
import Normalizer from '../algorithms/normalize';

export default class GradientDescentPrediction {

    constructor(options) {

        this.alpha = options.alpha || 0.01;
        this.iterations = options.iterations || 400;
        this.normalizeData = options.normalizeData || true;

        this.features = ['listPrice', 'rent', 'livingArea', 'rooms', 'constructionYear', 'soldPrice', 'floor'];
    }

    predict(inputData, X, y, theta) {

        let gradientDescent = new GradientDescent();

        if (this.normalizeData === true) {
            X = new Normalizer().calculate(X).data;
        }

        let calculations = gradientDescent.calculate(X, y, theta, this.alpha, this.iterations);
        let result;

        for (let calculation of calculations) {
            result = calculation;
        }

        return inputData.transpose().multiply(result.theta);
    }
}