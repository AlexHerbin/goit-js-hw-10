import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries} from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const refs = {
    inputEl: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}

refs.inputEl.addEventListener('input', debounce(onSearch,DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault();
    const country = refs.inputEl.value.trim();

    if (!country) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = ''; 
        return
    };
   
    fetchCountries(country)
    .then(renderCountryList)
    .catch(onError)
}


function renderCountryList(countries) {

    if (countries.length > 10) {
        refs.countryList.innerHTML = '';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }

    if (countries.length >= 2 && countries.length <= 10) {
        refs.countryInfo.innerHTML = '';
        const markupCountryList = countries
            .map( (country)  => {
                return `<li class ='country-item'><img class ='country-item__img' src='${country.flags.svg}' alt='${country.name}' width='25' hight='25'><span class="country-item__name">${country.name}</span></li>`;
            })
            .join('');
        refs.countryList.innerHTML = markupCountryList; 
    }
    
    if (countries.length === 1) {
        refs.countryList.innerHTML = '';
        const markupCountryInfo = countries
            .map((country) => {
                return `<div>
                    <div class='country-info__block'>
                        <img src='${country.flags.svg}' alt='${country.name}' width = '60'>
                        <span class='country-info__name'>${country.name}</span>
                    </div>      
                    <p>Capital: ${country.capital}</p>
                    <p>Population: ${country.population}</p>
                    <p>Languages: ${Object.values(country.languages[0])}</p>
                    </div>`;
            })
            .join('');
        refs.countryInfo.innerHTML = markupCountryInfo;
    }
    
};

function onError(error) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    Notiflix.Notify.failure("Oops, there is no country with that name");
}