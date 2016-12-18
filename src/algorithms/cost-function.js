import math from 'mathjs';

export default class CostFunction {

    calculate(X, y, theta)
    { 
        let m = y.size()[0];
        let h = math.multiply(X, theta);
        let diff = math.subtract(h, y);
        let sqrErrors = math.dotPow(diff, 2);
        let J = 1 / (2 * m) * math.sum(sqrErrors);
        
        return J;
    }

}