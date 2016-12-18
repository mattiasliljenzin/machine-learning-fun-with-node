import FileDataSource from './data/datasource';
import MatrixTransformer from './transformers/matrix-transformer';

export default class Controller {
    
    async load(path) {
        let source = new FileDataSource();
        let transformer = new MatrixTransformer();
        let data = await source.get(path);

        return transformer.transform(data);
    }

}