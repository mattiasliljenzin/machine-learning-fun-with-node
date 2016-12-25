import FileDataSource from './data/datasource';
import FileDataSource2 from './data/datasource2';
import MatrixTransformer from './transformers/matrix-transformer';

export default class Controller {
    
    async load(path) {
        let source = new FileDataSource();
        let transformer = new MatrixTransformer();
        let data = await source.get(path);

        return transformer.transform(data);
    }

    load2(path) {
        let source = new FileDataSource2();
        let transformer = new MatrixTransformer();
        let data = source.get(path);

        return transformer.transform2(data);
    }

}