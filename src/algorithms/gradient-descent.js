import math from 'mathjs';
import CostFunction from './cost-function';

export default class GradientDescent {

    *calculate(X, y, theta, alpha, iterations) {

        let m = y.size()[0];
        let costFunction = new CostFunction();

        for (let i = 0; i < iterations; i++) {
            
            let h = math.multiply(X, theta);
            let diff = math.subtract(h, y);
            let derivative = math.multiply(math.transpose(X), diff);
            let rate = (alpha * (1 / m));
            let change = math.multiply(rate, derivative);
            theta = math.subtract(theta, change);
            
            yield {
                theta: theta,
                J: costFunction.calculate(X, y, theta)
            };
        }   
    }
}