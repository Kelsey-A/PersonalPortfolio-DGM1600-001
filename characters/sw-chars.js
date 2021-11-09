import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const mainContent = document.querySelector('#main')

const header = document.createElement('header')
const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'

populateDOM(people)

maleButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'

femaleButton.addEventListener ('click', () => populateDOM(femaleCharacters))

const otherButton = document.createElement('button')
otherButton.textContent = 'Other Characters'

otherButton.addEventListener ('click', () => populateDOM(otherCharacters))

const allButton = document.createElement('button')
allButton.textContent = 'All Characters'

allButton.addEventListener ('click', () => populateDOM(people))

const bestButton = document.createElement('button')
bestButton.textContent = 'Best Character'

bestButton.addEventListener ('click', () =>  {

})


header.appendChild(maleButton)
header.appendChild(femaleButton)
header.appendChild(otherButton)
header.appendChild(allButton)
header.appendChild(bestButton)

document.body.insertBefore(header, mainContent)

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter((person) => {
    if (person.gender === 'hermaphrodite' || person.gender === 'n/a' || person.gender === 'none') {
    return person
    }
})
const allCharacters = people.filter(person => person.gender)


function populateDOM(characters) {

removeChildren(mainContent)


characters.forEach((element) => {
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')
    const charNum = getLastNumber(element.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    
    const charCaption = document.createElement('figcaption')
    charCaption.textContent = element.name

    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)
    mainContent.appendChild(charFigure)
})
}

