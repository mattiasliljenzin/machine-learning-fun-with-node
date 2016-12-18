import ML from 'machine_learning';

export default class Prediction {
    constructor(data) {
        this.data = data;
        this.features = ['listPrice', 'rent', 'livingArea', 'rooms', 'constructionYear', 'soldPrice', 'floor'];
    }

    linearRegression() {}
}