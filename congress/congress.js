import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const members = [...senators, ...representatives] //spread operator is the modern way to combine arrays

const Button = document.querySelector('.button')

const senatorDiv = document.querySelector('.senators')
const loyaltyHeading = document.querySelector('.mostLoyal')
const seniorityHeading = document.querySelector('.seniority')



const representativesButton = document.querySelector('#representativesButton')
representativesButton.addEventListener ('click', () => populateSenatorDiv(Reps))
const Reps = simplifiedMembers().reduce((acc, senator) => {
    if(senator.senRep === 'Rep.') {
        acc.push(senator)
    }
    return acc
}, [])

const senatorButton = document.querySelector('#senatorButton')
senatorButton.addEventListener ('click', () => populateSenatorDiv(Sens))
const Sens = simplifiedMembers().reduce((acc, senator) => {
    if(senator.senRep === 'Sen.') {
        acc.push(senator)
    }
    return acc
}, [])

const republicanButton = document.querySelector('#republicanButton')
republicanButton.addEventListener('click', () => {
    populateSenatorDiv(rParty)
})
const rParty = simplifiedMembers().reduce((acc, senator) => {
    if(senator.party === 'R') {
        acc.push(senator)
    }
    return acc
}, [])

const democratsButton = document.querySelector('#democratsButton')
democratsButton.addEventListener ('click', () => populateSenatorDiv(dParty))
const dParty = simplifiedMembers().reduce((acc, senator) => {
    if(senator.party === 'D') {
        acc.push(senator)
    }
    return acc
}, [])

function simplifiedMembers(chamberFilter) {
        const filteredArray = members.filter((member) => 
        chamberFilter ? member.short_title === chamberFilter : member)
return filteredArray.map(member => {
    let  middleName = member.middle_name ? ` ${member.middle_name} ` : ` `
    return {
        id: member.id,
        name: `${member.first_name}${middleName}${member.last_name}`,
        party: member.party,
        gender: member.gender,
        seniority: +member.seniority,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-100px.jpeg`,
        missedVotesPct: member.missed_votes_pct,
        loyaltyPct: member.votes_with_party_pct,
        senRep: member.short_title,
    }
})
}

function populateSenatorDiv(simpleSenators) {
    removeChildren(senatorDiv)

    simpleSenators.forEach((member) => {
        const senFigure = document.createElement('figure')
        const figImg = document.createElement('img')
        const figCaption = document.createElement('figcaption')

        figImg.src = member.imgURL
        figCaption.textContent = member.name

        senFigure. appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

// const filterSenators = (prop, value) => simplifiedMembers().filter(senator => senators[prop] === value)

const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => 
acc.seniority > senator.seniority ? acc : senator,
)
    seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name} who has been in congress for ${mostSeniorMember.seniority} years.`
 //acc is an accumulator 

const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
    if(senator.loyaltyPct === 100) {
        acc.push(senator)
    }
    return acc
}, [])

const cowardList = document.createElement('ul')

const spineless = mostLoyal.map(coward => {
    let listItem = document.createElement('li')
    listItem.textContent = coward.name
    cowardList.appendChild(listItem)
})

loyaltyHeading.appendChild(cowardList)

populateSenatorDiv(simplifiedMembers())