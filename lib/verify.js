import chai, { expect, should, assert } from 'chai';
should();
import math from 'mathjs';
import DataSource from './datasource';

describe('data verify step', function () {

        it('should read data into matrices', function (done) {

                var ds = new DataSource();
                ds.load(x => {
                        console.log(x);
                        console.log('hi2u');
                        done();
                });
                // let readToMatrices = (data) => {
                //     let lines = data.split('\n')
                //                     .map(x => x.split(','))
                //                     .filter(x => x.length == 2);
                //     let matrix = math.matrix(lines);

                //     let size = matrix.size();
                //     let rows = size[0];
                //     let columns = size[1];
                //     let m = columns;
                //     let theta = math.zeros(2,1);
                //     let x = matrix.subset(math.index(math.range(0,m),[0]));
                //     let y = matrix.subset(math.index(math.range(0,m),[1]));

                //     console.log(matrix);

                //     console.log(x);
                //     console.log('test')
                //     console.log(y);

                //     assert.equal(97, rows, '97 rows in a 97x2 matrix');
                //     assert.equal(2, columns, '2 columns in a 97x2 matrix');

                //     let h = math.multiply(x, theta);
                //     console.log(h);
                // };

                // let readFile = promisify(fs.readFile);
                // return readFile('./test/data.txt', 'utf-8').then(readToMatrices);
        });
});