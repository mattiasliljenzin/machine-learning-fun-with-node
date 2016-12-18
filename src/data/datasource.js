import math from 'mathjs';
import PromisedFileLoader from './fileloader';

export default class FileDataSource {

    async get(filepath) {
        let fileloader = new PromisedFileLoader();
        let data = await fileloader.get(filepath);
        let lines = data
            .split('\n')
            .map(x => x.split(','));
            
        return math.matrix(lines);
    }
}