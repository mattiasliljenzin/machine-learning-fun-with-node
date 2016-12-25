import { Vector, Matrix } from 'sylvester';
import PromisedFileLoader from './fileloader';

export default class FileDataSource2 {

    get(filepath) {
        return Matrix.loadFile(filepath).map(parseFloat);
    }
}