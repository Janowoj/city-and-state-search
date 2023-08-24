const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// creating an array from the endpoint
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
        return `
                <li>
                    <span class="name">${place.city}, ${place.state}</span>
                    <span class="name">${place.population}</span>
                </li>`
        // we have to join the array to get a string
    }).join("");

    // ul with class suggestions
    suggestions.innerHTML = html;

}

const searchInput = document.querySelector("input.search");
const suggestions = document.querySelector(".suggestions");

// method addEventListener for listening to changes on input
// change event only fires when You go out of the input

searchInput.addEventListener("change", displayPlaces);

// keyup event fires when You release the key
searchInput.addEventListener("keyup", displayPlaces);