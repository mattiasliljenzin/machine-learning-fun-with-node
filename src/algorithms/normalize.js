import math from 'mathjs';

export default class Normalize {
    
    calculate(X) {
        let mu = math.mean(X);
        let sigma = math.std(X);
        let diff = math.subtract(X, mu);
        let normalizedX = math.dotDivide(diff, sigma);

        return {
            data: normalizedX,
            mu: mu,
            sigma: sigma
        };
    }
}