import math from 'mathjs';

export default class CostFunction {

    calculate(X, y, theta)
    { 
        let m = y.dimensions().rows;
        let h = X.multiply(theta);
        let diff = h.subtract(y);
        let sqrErrors = diff.elementMultiply(diff);

        return 1 / (2 * m) * sqrErrors.sum();
    }

}