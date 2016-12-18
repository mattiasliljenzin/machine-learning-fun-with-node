import math from 'mathjs';
import FileLoader from './await-fileloader';

export default class DataSource {
    constructor() {}

    async get() {
        let fileloader = new FileLoader();
        let data = await fileloader.get();

        let lines = data.split('\n')
            .map(x => x.split(','))
            .filter(x => x.length == 2);

        return math.matrix(lines);
    }
}