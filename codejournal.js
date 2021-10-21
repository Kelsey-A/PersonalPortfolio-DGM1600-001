var name; //global

let foo; //a declared variable that can be changed

//const bar; // a declared variable that cannot be changed - short for 'constant'

const ANSWER = 42 // const is declared and initialized with the value 42

// Strings

let string1 = "Hello World!" // this is a 'string literal' example and the preffered way - this is the way

let string2 = new String("Hello World!") // using a 'constructor

// Number

let myNum = 203859;

let myDecimal = 73.4 // could also call this a 'float'

// Boolean

let myBool = true;

// read as: let myBool be assigned the value true

// Array

let myArray = [] // this is an empty array -  like a set of boxes where different things are placed - the first item in an array is zero

//             0     1      2        3      4
let myArray = [42, "Bob", myBool, ANSWER, true]
// square brackets mean it is an array

let secondElement = myArray2[1] // the second position is at #1 -because zero is one-

//Object

let minObject = {}

const myCar = {
    make: "Chevrolet",
    color: "red",
    year: "1965",
    vin: "324242hv4hvjjv23vhjh"
};

myCar.numDoors = 4;

// objects have curly brackets

//Functions

//they are like little engines that return a value
//they have parentheses that contain arguments

function myFunction() {
    return "My greeting to you...";
}

//Arrow Functions

//basic syntax is () => {}
//or num => 'The Num'

