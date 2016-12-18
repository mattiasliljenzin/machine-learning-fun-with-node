import math from 'mathjs';

export default class MatrixTransformer {

    transform(data) {

        let size = data.size();
        let rows = size[0];
        let columns = size[1];
        let m = rows;

        let x = data.subset(math.index(math.range(0, m), 0));
        let y = data.subset(math.index(math.range(0, m), 1));

        let X = math.concat(math.ones(m, 1), x);
        let theta = math.zeros(2, 1);

        return {
            theta: theta,
            X: X,
            x: x,
            y: y,
            m: m,
            rows: rows,
            columns: columns,
            size:size
        }

    }
}