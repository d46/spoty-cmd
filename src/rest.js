const got = require('got');

// got('https://api.spotify.com/v1/search?q=muse&type=track', {
// 	headers: {
// 		Accept: "application/json",
// 		Authorization: "Bearer BQBy1OrngK0ThY4oq_lrY5LdMNdughDq4_sM8By7cyXXDhstDajZSeTkJu0awwXCqM0WaDu1KTp1iWQqAhLPrIWXnXeOo3ltZme79da5uVIw3nNVw0-YnyoV_HcdyOfKwyjagKuNc9-jyzhk-ayanhLl8QBzGZlbstX2HUq9f-gNwoUUxX0y_ig"
// 	},
// })
// 	.then(response => {
// 		console.log(response);
// 	})
// 	.catch(error => {
// 		console.log(error.response.body);
// 	});

got('https://api.spotify.com/v1/search?q=muse&type=track', {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: "Bearer BQBy1OrngK0ThY4oq_lrY5LdMNdughDq4_sM8By7cyXXDhstDajZSeTkJu0awwXCqM0WaDu1KTp1iWQqAhLPrIWXnXeOo3ltZme79da5uVIw3nNVw0-YnyoV_HcdyOfKwyjagKuNc9-jyzhk-ayanhLl8QBzGZlbstX2HUq9f-gNwoUUxX0y_ig"
	},
	method: 'PUT',
	body: JSON.stringify({"context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr", "offset": {"position": 5}})
})
	.then(response => {
		console.log(response);
	})
	.catch(error => {
		console.log(error);
	});
