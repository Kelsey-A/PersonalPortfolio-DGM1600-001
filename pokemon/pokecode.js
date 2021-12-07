import { removeChildren } from "../utils/index.js"

function getAPIData(url) {
  try {
    return fetch(url).then((data) => data.json())
  } catch (error) {
    console.error(error)
  }
}

function loadPokemon(offset = 0, limit = 49) {
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  ).then(async (data) => {
    console.log(data.results)
    for (const pokemon of data.results) {
      await getAPIData(pokemon.url).then((pokeData) =>
        populatePokeCards(pokeData)
      )
    }
  })
}

const chooseButton = document.querySelector(".choosePokemon")

chooseButton.addEventListener('click', () => {
  removeChildren(pokeGrid)
  let id = prompt('What is the ID of your Pokemon?')
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${id}`).then((chosen) =>
  populatePokeCards(chosen)
  )
})


const pokeGrid = document.querySelector(".pokeGrid")
const loadButton = document.querySelector(".loadPokemon")
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid)
  loadPokemon()
})

const newButton = document.querySelector(".newPokemon")
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your Pokemon?")
  let pokeHeight = prompt("What is the height of your Pokemon?")
  let pokeWeight = prompt("How many kilograms is your Pokemon?")
  let pokeAbilities = prompt(
    "What abilities does your Pokemon have? (use a comma separated list)"
  )

  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities)
  )
  console.log(newPokemon)
  populatePokeCards(newPokemon)
})

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  console.log(tempArray)
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName,
      }
    }
  })
}

const morePokemon = document.querySelector(".morePokemon")
morePokemon.addEventListener("click", () => {
  let startPoint = prompt("Which pokemon ID do you want to start with?")
  let howMany = prompt("How many more pokemon do you want to see?")
  loadPokemon(startPoint, howMany)
})

const grassButton = document.querySelector(".grassButton")
grassButton.addEventListener("click", () => {
  removeChildren(pokeGrid)
})

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement("div")
  pokeScene.className = "scene"
  const pokeCard = document.createElement("div")
  pokeCard.className = "card"
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped")
  })

  const cardFacefront = populateCardFront(singlePokemon)
  const cardFaceback = populateCardBack(singlePokemon)

  pokeCard.appendChild(cardFacefront)
  pokeCard.appendChild(cardFaceback)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement("figure")
  pokeFront.className = "cardFace front"
  const pokeImg = document.createElement("img")
  if (pokemon.id === 9001) {
    pokeImg.src = "../Images/pokeBall.png"
  } else {
    pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  }
  const pokeCaption = document.createElement("figcaption")
  pokeCaption.textContent = `${pokemon.name}`
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)

  typesBackground(pokemon, pokeFront)

  return pokeFront
}

function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name
  let pokeType2 = pokemon.types[1]?.type.name
  if (!pokeType2) {
    card.style.setProperty("background", getPokeTypeColor(pokeType1))
  } else {
    card.style.setProperty(
      "background",
      `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(
        pokeType2
      )})`
    )
  }
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
    const pokeTypes = document.createElement('ol')
  pokemon.types.forEach((pokeType) => {
    let typeItem = document.createElement('li')
    typeItem.textContent = pokeType.type.name
    pokeTypes.appendChild(typeItem)
  })
pokeBack.appendChild(label)
  pokeBack.appendChild(abilityList);
  pokeBack.appendChild(pokeTypes)
  typesBackground(pokemon, pokeBack)
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

function getPokeTypeColor(pokeType) {
  let color
  switch (pokeType) {
    case "grass":
      color = "#00ff00"
      break
    case "fire":
      color = "#ff0000"
      break
    case "water":
      color = "#0000ff"
      break
    case "bug":
      color = "#7fff00"
      break
    case "normal":
      color = "#f5f5dc"
      break
    case "flying":
      color = "#00ffff"
      break
    case "poison":
      color = "#c300ff"
      break
    case "electric":
      color = "#c8ff00"
      break
    case "ghost":
      color = "#735797"
      break
    case "psychic":
      color = "#e96c95"
      break
    case "ground":
      color = "#ceb250"
      break
    case "rock":
      color = "#444444"
      break
    case "ice":
      color = "#96D9D6"
      break
    default:
      color = "#999999"
  }
  return color
}