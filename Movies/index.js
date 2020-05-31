
const fetchData = async (searchTerm, apiKey) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });
    console.log(response.data);
};


const searchTermInput = document.getElementById("searchTermInput");

searchTermInput.addEventListener('input', (event) => {
    console.log(`apiKeyInput.value: "${apiKeyInput.value}"`);
    console.log(`event.target.value: "${event.target.value}"`);
    if (apiKeyInput.value) {
        fetchData(event.target.value, apiKeyInput.value);
    }

});