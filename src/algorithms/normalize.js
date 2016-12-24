import math from 'mathjs';

export default class Normalize {

    calculate(X) {

        // Do column by column due to some lack of vectorization support (i.e mean, std)

        let size = X.size();
        let rows = size[0];
        let columns = size[1];

        let mu = [];
        let sigma = [];
        let xnorm = [];
        let normalizedX = [];

        for (var i = 0; i < columns; i++) {
            let subset = X.subset(math.index(math.range(0, rows), i));
            mu[i] = math.mean(subset);
            sigma[i] = math.std(subset);
            xnorm[i] = math.subtract(subset, mu[i]);
            normalizedX[i] = math.dotDivide(xnorm[i], sigma[i]);
        }

        return {
            data: normalizedX,
            mu: mu,
            sigma: sigma
        };
    }
}