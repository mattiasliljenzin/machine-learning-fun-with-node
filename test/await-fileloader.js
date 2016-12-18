import fs from 'fs';
import promisify from 'es6-promisify';

export default class AwaitFileLoader {

    constructor(filepath) {
        this.filepath = filepath || './test/data.txt';
    }

    get() {
        let readFile = promisify(fs.readFile);
        return readFile(this.filepath, 'utf-8');
    }
}