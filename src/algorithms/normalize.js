import math from 'mathjs';
import {
    Vector
} from 'sylvester';

export default class Normalize {

    calculate(X) {

        let sigma = [];
        let mu = X.mean();
        let columns = X.cols();

        for (let i = 1; i <= columns; i++) {
            let data = [];
            X.col(i).map(m => data.push(m));
            sigma[i - 1] = math.std(data);
        }

        sigma = Vector.create(sigma);

        let normalized = X.map((el, row, col) => {
            let x1 = (el - mu.e(col));
            let s1 = sigma.e(col);

            // dont divide with zero when sigma is 0 (e.g bias vector)
            return s1 === 0 ? el : x1 / s1;
        });

        return {
            data: normalized,
            mu: mu,
            sigma: sigma
        };
    }
}