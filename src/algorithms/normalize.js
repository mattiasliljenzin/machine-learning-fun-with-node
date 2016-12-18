import math from 'mathjs';

export default class Normalize {

    calculate(X) {

        let mu = [];
        let sigma = [];
        let xnorm = [];
        let size = X.size();
        let rows = size[0];
        let columns = size[1];
        console.log(columns);
        for (var i = 0; i < columns; i++) {
            let subset = X.subset(math.index(math.range(0, rows), i));
            mu[i] = math.mean(subset);
            sigma[i] = math.std(subset);
            xnorm[i] = math.subtract(subset, mu[i]);
        }

        mu = math.matrix(mu);
        sigma = math.matrix(sigma);
        console.log(mu);
        console.log(xnorm);
        let diff = math.subtract(xnorm, mu);
        let normalizedX = math.dotDivide(diff, sigma);

        return {
            data: normalizedX,
            mu: mu,
            sigma: sigma
        };
    }
}