
const fetchData = async (searchTerm, apiKey) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });
    console.log(response.data);
};



// searchTermInput.addEventListener('input', (event) => {
//     console.log(`apiKeyInput.value: "${apiKeyInput.value}"`);
//     console.log(`event.target.value: "${event.target.value}"`);
//     if (apiKeyInput.value) {
//         fetchData(event.target.value, apiKeyInput.value);
//     }
// });

let timeoutId;
const onSearchTermInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    if (apiKeyInput.value) {
        timeoutId = setTimeout( () => {
            fetchData(event.target.value, apiKeyInput.value);
        }, 1000);
    }
};

const searchTermInput = document.getElementById("searchTermInput");
searchTermInput.addEventListener('input', onSearchTermInput);

