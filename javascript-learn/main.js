let variable = "name"
let var2 = 33
let var3 = var2

function testfunction(value) {
    console.log(value * 3)
}

function returnfunc(parameter) {
    return parameter + 4
}
function noreturn(parameter) {
    parameter
}

// function areaofcircle(radius) {
//     let result
//     result = Math.PI(Math.pow(radius, 2))
//     return result
// }


function calculateCircumference(radius) {
    return 2 * Math.PI * radius;
}




console.log( noreturn(4))

let test3 = 5
let test5 = 30
let result = 0

function dostuff(parameter1,parameter2){
    result = parameter1 + calculateCircumference(parameter2)
}



dostuff(test3,test5)

console.log(result)