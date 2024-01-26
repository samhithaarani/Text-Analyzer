const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf',
  headers: {
    'X-RapidAPI-Key': 'a09203a336msh6e3246161e0cc75p151d17jsn1178185c2cc7',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}