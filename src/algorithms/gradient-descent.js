import math from 'mathjs';
import CostFunction from './cost-function';

export default class GradientDescent {

    * calculate(X, y, theta, alpha, iterations) {

        let m = y.dimensions().rows;
        let costFunction = new CostFunction();

        for (let i = 0; i < iterations; i++) {

            let h = X.multiply(theta);
            let diff = h.subtract(y);
            let derivative = X.transpose().multiply(diff);
            let change = derivative.multiply(alpha / m);
            theta = theta.subtract(change);

            yield {
                theta: theta,
                J: costFunction.calculate(X, y, theta)
            };
        }
    }
}