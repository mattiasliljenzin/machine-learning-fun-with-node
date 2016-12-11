import booli from './booli-connect';
import HousingData from './housing-data';
import Prediction from './prediction';


console.log('starting...');

extract(data => {
	load(data, data => {
		transform(data, () => {
			console.log('')
			console.log('Done!');
			console.log('-----');
		});
	})
});


function extract(cb) {

	console.log('');
	console.log('extracting data...');
	console.log('------------------')

	booli.query((status, data) => {
		console.log('status response: ' + status);
		console.log('listing total hits: ' + data.totalCount);
		console.log('listing result hits: ' + data.count);
		cb(data);
	});	
}

function load(data, cb) {

	console.log('');
	console.log('loading data...');
	console.log('----------------')

	let hits = new Array();

	for(let listing of data.sold) {
		hits.push(new HousingData(listing));
	}

	cb(hits);
}

function transform(data, cb) {
	console.log('');
	console.log('transforming data...');
	console.log('--------------------')

	let prediction = new Prediction(data);
	prediction.linearRegression();

	cb();
}