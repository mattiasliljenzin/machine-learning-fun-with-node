import math from 'mathjs';
import PromisedFileLoader from './promised-fileloader';

export default class MatrixSource {
    constructor() {}

    async get() {
        let fileloader = new PromisedFileLoader();
        let data = await fileloader.get();

        let lines = data.split('\n')
            .map(x => x.split(','))
            .filter(x => x.length == 2);

        return math.matrix(lines);
    }
}