function getApiKey() {
    return apiKeyInput.value;
}

const apiKeyInput = document.getElementById("apiKeyInput");
apiKeyInput.addEventListener('input', function(event) {
    console.log(`[apiKeyInput][EventListener][input] => (event.target.value): "${event.target.value}"`);
    let apiKeyValue= event.target.value;
    createAutoComplete({
        apiKey: apiKeyValue,
        ...autoCompleteConfig,
        root: document.querySelector('#left-autocomplete'),
        onOptionSelect(movie) {
            document.querySelector('.tutorial').classList.add('is-hidden');
            onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
        }
    });
    createAutoComplete({
        apiKey: apiKeyValue,
        ...autoCompleteConfig,
        root: document.querySelector('#right-autocomplete'),
        onOptionSelect(movie) {
            document.querySelector('.tutorial').classList.add('is-hidden');
            onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
        }
    });
});

const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = (movie.Poster === 'N/A') ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
    `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: getApiKey(),
                s: searchTerm
            }
        });
        if (response.data.Error) {
            return [];
        }
        return response.data.Search;                       
    }
};
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
    console.log("summaryElement", summaryElement);
    const leftSummary = document.querySelector('#left-summary')
    console.log("leftSummary", leftSummary);

    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: getApiKey(),
            i: movie.imdbID
        }
    });
    // console.log("[onMovieSelect] => (response.data): ", response.data);
    summaryElement.innerHTML = movieTemplate(response.data);

    if ( side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if ( leftMovie && rightMovie) {
        runComparison();
    }
};

const runComparison = () => {
    console.log("[index.js][runComparision()] =>");

}


const movieTemplate = (movieDetail) => {
    const dollars = (movieDetail.BoxOffice === 'N/A') ? 0 : parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

    // let count = 0;
    // const awards = movieDetail.Awards.split(' ').forEach( (word) => {
    //     const value = parseInt(word);
    //     if ( isNaN(value)) {
    //         return;
    //     } else {
    //         count += value;
    //     }
    // });

    const awards = movieDetail.Awards.split(' ').reduce( (previous, word) => {
        const value = parseInt(word);
        if ( isNaN(value)) {
            return previous;
        } else {
            return previous + value;
        }
    }, 0);

    console.log("movieDetail:", movieDetail);
    console.log("dollars:",     dollars);
    console.log("metascore:",   metascore);
    console.log("imdbRating:",  imdbRating);
    console.log("imdbVotes:",   imdbVotes);
    console.log("awards:",      awards);

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>            
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};