
const fetchData = async (searchTerm, apiKey) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });
    console.log(response.data);
};

let timeoutId;
const onSearchTermInput = event => {
    if (apiKeyInput.value) {
        console.log(`timeoutId: ${timeoutId}`)
        if (timeoutId) {
            console.log(`Clearing timeout: ${timeoutId}`);
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout( () => {
            fetchData(event.target.value, apiKeyInput.value);
        }, 1000);
    }
};

const searchTermInput = document.getElementById("searchTermInput");
searchTermInput.addEventListener('input', onSearchTermInput);

