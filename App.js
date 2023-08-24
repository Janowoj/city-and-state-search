const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// creating an array from the endpoint (promise)
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));
console.log(cities);

// function which filters cities and states

function findCitiesAndStates(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex);
    });
};

// function which displays filtered cities when somebody is typing word to the input
// and creates a subset which You can listen to.    

function displayPlaces() {
    // console.log(this.value);
    const matchArray = findCitiesAndStates(this.value, cities);
    console.log(matchArray);
    // method that displays the li with the matching places
    const html = matchArray.map(place => {
        // regex for highlighting the matching places, "gi" stands for "global" and "insensitive", so it matches all the places and is case insensitive
        const regexTwo = new RegExp(this.value, "gi");
        const cityName = place.city.replace(regexTwo, `<span class="highlight">${this.value}</span>`);
        const stateName = place.state.replace(regexTwo, `<span class="highlight>${this.value}</span>`);
        // now can replace the place.city with cityName and stateName:
        return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="name">${numberWithCommas(place.population)}</span>
                </li>
                `;
        // we have to join the array to get a string
    }).join("");

    // ul with class suggestions
    suggestions.innerHTML = html;

}

// function numberWithCommas(x) for adding commas to the population number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const searchInput = document.querySelector("input.search");
const suggestions = document.querySelector(".suggestions");

// method addEventListener for listening to changes on input
// change event only fires when You go out of the input

searchInput.addEventListener("change", displayPlaces);

// keyup event fires when You release the key
searchInput.addEventListener("keyup", displayPlaces);