const fetchData = async (searchTerm, apiKey) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });
    console.log(response.data);
};

const onSearchTermInput = (event) => {
    if (apiKeyInput.value) {
        fetchData(event.target.value, apiKeyInput.value);
    }
};

const searchTermInput = document.getElementById("searchTermInput");
searchTermInput.addEventListener( 'input', debounce(onSearchTermInput, 2000) );

