import math from 'mathjs';
import {
    Vector,
    Matrix
} from 'sylvester';

export default class MatrixTransformer {

    transform(data) {

        let size = data.size();
        let rows = size[0];
        let columns = size[1];
        let m = rows;

        let x = data.subset(math.index(math.range(0, m), math.range(0, columns - 1)));
        let y = data.subset(math.index(math.range(0, m), columns - 1));
        let X = math.concat(math.ones(m, 1), x);
        let theta = math.zeros(columns, 1);

        return {
            theta: theta,
            X: X,
            x: x,
            y: y,
            m: m,
            rows: rows,
            columns: columns,
            size: size
        }
    }

    transform2(data) {

        let rows = data.dimensions().rows;
        let columns = data.dimensions().cols;
        let x = data.slice(1, rows, 1, columns - 1);
        let y = data.slice(1, rows, columns, columns);
        let X = Vector.One(rows).transpose().augment(x);
        let theta = Vector.Zero(columns);

        return {
            rows: rows,
            columns: columns,
            y: y,
            x: x,
            X: X,
            m: rows,
            size: [rows, columns],
            theta: theta
        };
    }
}