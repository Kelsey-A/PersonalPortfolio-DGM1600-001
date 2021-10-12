import { films } from '../data/films.js'

let filmList = document.querySelector('#filmList')

filmList.textContent = 'This is my content. Here is some more content.'

let myImg = document.createElement('img')
myImg.src = 'https//starwars-visualguide.com/assets/img/films/1.jpg'

filmList.appendChild(myImg)

let titleList = document.createElement('ol')
filmList.appendChild(titleList)

for (let i = 0; i < films.length; i++) {
    console.log(films[i].title);
    let listItem = document.createElement['li']
    listItem.textContent = films[i].title
    titleList.appendChild(listItem)
}