const qwerty = document.querySelectorAll('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const ul = phrase.getElementsByTagName("ul")[0];


const missed = 0;

const phrases = [
    "Dont put all your eggs in one basket",
    "Get a taste of your own medicine",
    "Break a leg",
    "its not rocket science",
    "A blessing in disguise"
];

startButton.addEventListener('click', function(){
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    //Fixing index 
    const lengthIndex = arr.length - 1;
    //Creates a random number using the length of the phrases array
    const randomNumber = Math.floor( Math.random() * lengthIndex)
    //Generates a random phrase from array
    const randomPhrase = arr[randomNumber];
    //Splits random phrase into singular letters
    const letters = randomPhrase.split(''); 
    return letters;
};
//Stores result of getRandomPhraseAsArray function 
let resultPhrase = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
  arr.forEach(function (e){
    //Creates list item for each character
    let li = document.createElement("li")
    
    li.textConetent = e;
    //Sorts each letter and space to put in proper class.
     if (e === " "){
        li.className = "space";
     } else {
        li.className = "letter";
     }
     ul.appendChild(li);
  });
}
addPhraseToDisplay(resultPhrase);



