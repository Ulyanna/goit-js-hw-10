import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;
const counriesListEl = document.querySelector('.country-list');
const countryInfoBlock = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onfilterCounriesSearch, DEBOUNCE_DELAY));


function onfilterCounriesSearch(e) {
    const inputValue = e.target.value.trim()

    fetchCountries(inputValue).then(countries => { filterSearch(countries) }).catch(error => {
        if (inputValue !== '') {
            Notiflix.Notify.failure('Oops, there is no country with that name');
          clearDom(counriesListEl)
        }
          
      
    }); 

    if (inputValue === "") {
        clearDom(counriesListEl)
        clearDom(countryInfoBlock)
    }
     e.preventDefault();
}

function filterSearch(countries) {
            if (countries.length >= 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
                clearDom(counriesListEl)
                clearDom(countryInfoBlock)
            
        }
        else if (countries.length >= 2 && countries.length <= 10) {
                renderCountriesList(countries)
                clearDom(countryInfoBlock)
             
        }
        else if (countries.length <= 1) {
            clearDom(counriesListEl);
           renderCountryInfo(countries[0])
            }
    
}
 
function clearDom(el) {
    el.innerHTML = ''
}

function renderCountriesList(countries) {
  const markup = countries
    .map((country) => {
        return `<li class="wrapper">
          <img src = "${country.flags.svg}"  width="50px" height="25px"/>
          <p class="country-name">${country.name.official}</p>
          
        </li>`;
    })
    .join("");
  counriesListEl.innerHTML = markup;
}

function renderCountryInfo(countries) {
const markup =  `<img src="${countries.flags.svg}"width="200px"height="100px"/><h1>${countries.name.official}</h1><p><span>Capital:</span> ${countries.capital}</p><p><span>Population:</span> ${countries.population}</p><p><span>Languages:</span> ${Object.values(countries.languages)}</p>`
   countryInfoBlock.innerHTML = markup;
  
}
