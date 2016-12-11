import chai, { expect, should} from 'chai';
should();
import chaiAsPromised from "chai-as-promised";
import 'babel-polyfill';
chai.use(chaiAsPromised);
import fs from 'fs';
import promisify from 'es6-promisify';
import math from 'mathjs';

describe('data verify step', function () {

    it('should read data into matrices', function () {
        
        let readToMatrices = (data) => {
            let lines = data.split('\n');
            let matrix = math.matrix(lines);
            console.log(matrix)
            
            lines.forEach((line, index) => {
                //console.log(index);
            });

        };

        let readFile = promisify(fs.readFile);
        return readFile('./test/data.txt', 'utf-8').then(readToMatrices);
    });


});