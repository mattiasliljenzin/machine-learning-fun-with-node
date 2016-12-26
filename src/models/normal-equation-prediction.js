import CostFunction from '../algorithms/cost-function';
import NormalEquation from '../algorithms/normal-equation';
import Normalizer from '../algorithms/normalize';

export default class NormalEquationPrediction {

    constructor(options) {
        this.normalizeData = options.normalizeData === false ? false : true,
        this.theta = [];
        this.features = ['listPrice', 'rent', 'livingArea', 'rooms', 'constructionYear', 'soldPrice', 'floor'];
    }

    train(X, y, theta) {

        if (this.normalizeData === true) {
            X = new Normalizer().calculate(X).data;
        }

        this.theta = new NormalEquation().calculate(X, y);
    }

    predict(inputData) {
        console.log(this.theta);
        return inputData.transpose().multiply(this.theta);
    }
}