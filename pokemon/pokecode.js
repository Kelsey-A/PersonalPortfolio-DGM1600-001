async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

const pokeGrid = document.querySelector('.pokeGrid')

getAPIData(`https://pokeapi.co/api/v2/pokemon/1`)
.then((data) => {
    console.log(data)
    populatePokeCards(data)
})
function populatePokeCards(singlePokemon) {
    const pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    const pokeFront = document.createElement('div')
    pokeFront.classname = 'cardFace front'
    pokeFront.textContent = 'Front'
    const pokeBack = document.createElement('div')
    pokeBack.className = 'cardFace back'
    pokeBack.textContent ='Back'

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}