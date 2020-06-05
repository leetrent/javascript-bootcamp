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
        dropdown.classList.add('is-active');

        for (let movie of movies) {
            const option = document.createElement('a');
            option.classList.add("dropdown-item");
            option.innerHTML = `
                <img src="${movie.Poster}" />
                ${movie.Title}
            `;
            resultsWrapper.appendChild(option);
        }
    }
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a Movie</b></label>
    <input id="searchTermInput" class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const searchTermInput   = document.getElementById("searchTermInput");
const dropdown          = document.querySelector('.dropdown');
const resultsWrapper    = document.querySelector('.results');

searchTermInput.addEventListener( 'input', debounce(onSearchTermInput, 2000) );

