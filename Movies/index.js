
const fetchData = async (searchTerm, apiKey) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: apiKey,
            s: searchTerm
        }
    });
    console.log(response.data);
};

const debounce = (func, delay=1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout( () => {
            func.apply(null, args);
        }, delay);
    };
};

const onSearchTermInput = (event) => {
    if (apiKeyInput.value) {
        fetchData(event.target.value, apiKeyInput.value);
    }
};

const searchTermInput = document.getElementById("searchTermInput");
searchTermInput.addEventListener( 'input', debounce(onSearchTermInput, 2000) );

// let timeoutId;
// const onSearchTermInput = event => {
//     if (apiKeyInput.value) {
//         console.log(`timeoutId: ${timeoutId}`)
//         if (timeoutId) {
//             console.log(`Clearing timeout: ${timeoutId}`);
//             clearTimeout(timeoutId);
//         }
//         timeoutId = setTimeout( () => {
//             fetchData(event.target.value, apiKeyInput.value);
//         }, 1000);
//     }
// };

