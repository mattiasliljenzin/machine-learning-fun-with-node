import math from 'mathjs';
import {
    Vector
} from 'sylvester';

export default class Normalize {

    calculate(X) {

        let sigma = [];
        let mu = X.mean();

        for (let i = 1; i <= X.cols(); i++) {
            let data = [];
            X.col(i).map(m => data.push(m));
            sigma[i - 1] = math.std(data);
        }

        sigma = Vector.create(sigma);

        let normalized = X.map((el, row, col) => {
            let x1 = (el - mu.e(col));
            let s1 = sigma.e(col);

            // bias feature messing up result if doing vectorization
            // if sigma or mean is 0 then bias value returns as NaN
            // return input value instead since there is no variation 
            return s1 === 0 ? el : x1 / s1;
        });

        return {
            data: normalized,
            mu: mu,
            sigma: sigma
        };
    }
}