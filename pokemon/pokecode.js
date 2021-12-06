import{ removeChildren } from '../utils/index.js'

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json());
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
    
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data.results);
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      );
    }
  });
}

function choosePokemon(id = id) {
    
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  ).then(async (data) => {
    console.log(data.results);
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      );
    }
  });
}

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
    removeChildren(pokeGrid)
    loadPokemon()
})

const chooseButton = document.querySelector(".choosePokemon");
chooseButton.addEventListener("click", () => {
    removeChildren(pokeGrid)
    choosePokemon()
})

chooseButton.addEventListener('click', () => {
  let id = prompt('What is the ID of your Pokemon?')
  let chosenPokemon = new Chosen(id)
  populatePokeCards(chosenPokemon)
})

const newButton = document.querySelector('.newPokemon')
newButton.addEventListener('click', () => {
    let pokeName = prompt('What is the name of your Pokemon?')
    let pokeHeight = prompt('What is the height of your Pokemon?')
    let pokeWeight = prompt('How many kilograms is your Pokemon?')
    let PokeAbilities = prompt('What abilities does your Pokemon have? (use a comma separated list)')
    let newPokemon = new Pokemon(pokeName, pokeHeight, pokeWeight, getAbilitiesArray (PokeAbilities))
    console.log(newPokemon)
    populatePokeCards(newPokemon)
})

function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((abilityName) => {
        return {
            ability: {
                name: abilityName
            }
        }
    })
}

const morePokemon = document.querySelector ('.morePokemon')
morePokemon.addEventListener('click', () => {
    let startPoint = prompt('Which pokemon ID do you want to start with?')
    let howMany = prompt('How many more pokemon do you want to see?')
    loadPokemon(startPoint, howMany)
})

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped")
  })

  const cardFacefront = populateCardFront(singlePokemon);
  const cardFaceback = populateCardBack(singlePokemon);

  pokeCard.appendChild(cardFacefront);
  pokeCard.appendChild(cardFaceback);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  if(pokemon.id === 9001) {
      pokeImg.src = '../Images/pokeBall.png'
  } else {
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  }
  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = `${pokemon.id} ${pokemon.name}`
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);
  return pokeFront;
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities:";
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul");
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);
  return pokeBack;
}

class Pokemon {
    constructor(name, height, weight, abilities) {
        this.id = 9001,
        this.name = name,
        this.height = height,
        this.weight = weight,
        this.abilities = abilities
    }
}

class Chosen {
  constructor(id) {
    this.id = id
  }
}

