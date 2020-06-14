const createAutoComplete = ({
    apiKey,
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData}) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="searchTermInput" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;
    const searchTermInput   = root.querySelector(".searchTermInput");
    const dropdown          = root.querySelector('.dropdown');
    const resultsWrapper    = root.querySelector('.results');

    const onSearchTermInput = async (event) => {
        if (apiKey) {
            const items = await fetchData(event.target.value, apiKey);
            if ( !items.length ) {
                dropdown.classList.remove('is-active');
                return;
            }
            resultsWrapper.innerHTML = '';
            dropdown.classList.add('is-active');
            for (let item of items) {
                const option = document.createElement('a');
                
                option.classList.add("dropdown-item");
                option.innerHTML = renderOption(item);
                option.addEventListener('click', () => {
                    dropdown.classList.remove('is-active');
                    searchTermInput.value = inputValue(item);
                    onOptionSelect(item);
                });
                resultsWrapper.appendChild(option);
            }
        }
    };

    searchTermInput.addEventListener( 'input', debounce(onSearchTermInput, 2000) );

    document.addEventListener('click', event => {
        if ( !root.contains(event.target) ) {
            dropdown.classList.remove('is-active');
        }
    });
};