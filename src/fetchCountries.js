export { fetchCountries };

function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`)
        .then(response => {
             if (!response.ok) {
                 throw new Error(response.status);
            };
            return response.json();
        });
}