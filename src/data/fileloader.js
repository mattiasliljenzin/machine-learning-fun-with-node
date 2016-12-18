import fs from 'fs';
import promisify from 'es6-promisify';

export default class PromisedFileLoader {
    
    get(filepath) {
        let readFile = promisify(fs.readFile);
        return readFile(filepath, 'utf-8');
    }
    
}