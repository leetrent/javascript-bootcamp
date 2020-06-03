const fetchData = async (searchTerm, apiKey) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });
    
    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};

const onSearchTermInput = async (event) => {
    if (apiKeyInput.value) {
        const movies = await fetchData(event.target.value, apiKeyInput.value);
        console.log(movies);
        for ( let movie of movies) {
            const div = document.createElement('div');
            div.innerHTML = `
                <img src="${movie.Poster}" />
                <h1>${movie.Title}</h1>
            `;
            document.querySelector('#target').appendChild(div);
        }
    }
};

const searchTermInput = document.getElementById("searchTermInput");
searchTermInput.addEventListener( 'input', debounce(onSearchTermInput, 2000) );

