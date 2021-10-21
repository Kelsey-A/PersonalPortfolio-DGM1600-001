import { people } from '../data/people.js'


const header = document.createElement('header')
const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
header.appendChild(maleButton)
header.appendChild(femaleButton)
mainBody.appendChild(header)

const mainContent = document.querySelector('#main')

document.body.insertBefore(header)

const maleCharacters = people.filter(person => person.gender === 'male')

const femaleCharacters = people.filter(person => person.gender === 'female')


console.log(maleCharacters)

people.forEach((element, index) => {
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')

    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${index+1}.jpg`
    const charCaption = document.createElement('figcaption')
    charCaption.textContent = element.name
   
    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)
    mainContent.appendChild(charFigure)
})
