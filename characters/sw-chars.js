import { people } from '../data/people.js'

const header = document.createElement('header')
const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'

maleButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'

femaleButton.addEventListener ('click', () => populateDOM(femaleCharacters))

header.appendChild(maleButton)
header.appendChild(femaleButton)

const mainContent = document.querySelector('#main')

document.body.insertBefore(header, mainContent)

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter((person) => {
    if (person.gender === 'hermaphrodite' || person.gender === 'n/a' || person.gender === 'none') {
    return person
}

function populateDOM(characters) {
    // clear the page first, then populate
while (mainContent.firstChild) {
    mainContent.removeChild(mainContent.firstChild)
}
people.forEach((element) => {
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

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if(url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
}