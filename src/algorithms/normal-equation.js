import math from 'mathjs';
import sylvester from 'sylvester';

export default class NormalEquation {

    calculate(X, y)
    { 
        console.log('rly');
        return X.transpose()
                .multiply(X)
                .inverse()
                .multiply(X.transpose()
                .multiply(y));
    }

}