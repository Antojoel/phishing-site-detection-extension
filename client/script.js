// let quote = document.querySelector("#quote");
// let author = document.querySelector("#author");

// let api_url = "http://quotable.io/random";
// const currentUrl = window.location.href;


// fetch(api_url)
// 	.then(res => res.json())
// 	.then(data => {
// 		quote.innerHTML = currentUrl
// 		author.innerHTML = "-" + data.author;
// 	});


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const activeTab = tabs[0];
  
	if (activeTab) {
	  const currentUrl = activeTab.url;
	  quote.innerHTML = currentUrl;
  
	  const postData = {
		url: currentUrl
	  };
  
	  fetch('http://127.0.0.1:5001/predict', {
		method: 'POST', // Set the method to POST
		headers: {
		  'Content-Type': 'application/json' // Set the content type header
		},
		body: JSON.stringify(postData) // Stringify the data to send in the body
	  })
		.then(response => response.json()) // Parse the JSON response
		.then(data => {
		  if (data.result) {
			author.innerHTML = `<b>${data.result}</b>`; // Use bold formatting for visibility
		  } else {
			author.innerHTML = 'Result unavailable'; // Handle the case where no result is returned
		  }
		})
		.catch(error => {
		  console.error('Error fetching prediction:', error);
		  author.innerHTML = 'Error: Could not fetch prediction'; // Inform the user of an error
		});
	} else {
	  console.error("Failed to get active tab");
	}
  });