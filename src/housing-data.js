
export default class HousingData {
    constructor(source) {
        this.source = source;
    }

    * getFeatures(features) {
        for (let i = 0; i < arguments.length; i++) {
            let arg = arguments[i];
            let prop = this.source[arg];

            if(prop) {
                yield prop;
            }
        }
    }
}