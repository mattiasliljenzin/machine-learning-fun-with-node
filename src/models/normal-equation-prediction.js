import CostFunction from '../algorithms/cost-function';
import NormalEquation from '../algorithms/normal-equation';
import Normalizer from '../algorithms/normalize';

export default class NormalEquationPrediction {

    constructor() {
        this.theta = [];
        this.features = ['listPrice', 'rent', 'livingArea', 'rooms', 'constructionYear', 'soldPrice', 'floor'];
    }

    train(X, y, theta) {
        this.theta = new NormalEquation().calculate(X, y);
    }

    predict(inputData) {
        return inputData.transpose().multiply(this.theta);
    }
}