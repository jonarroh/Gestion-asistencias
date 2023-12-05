const url =
	'https://nimequkltxhtgq5jk226mzytgm0offcj.lambda-url.us-east-1.on.aws/';

const body = [
	{ id: '1', respuesta: 'a' },
	{ id: '2', respuesta: 'b' },
	{ id: '3', respuesta: 'c' }
];

const options = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(body)
};

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'Content-Type': 'application/json'
// 	}
// };
try {
	const response = await fetch(url, options);
	const json = await response.json();
	console.log(json);
} catch (error) {
	console.log(error);
}
