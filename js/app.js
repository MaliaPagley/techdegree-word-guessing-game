const startButton = document.getElementsByClassName("btn__reset")[0];
const qwerty = document.getElementById("qwerty");
const phrase = document.querySelector("#phrase");
const ul = phrase.getElementsByTagName("ul")[0];
const hearts = document.querySelectorAll(".tries");
const keyrows = document.getElementsByClassName("keyrow");
const overlay = document.getElementById("overlay");
let missed = 0;

const phrases = [
  "Dont put all your eggs in one basket",
  "Get a taste of your own medicine",
  "Break a leg",
  "Its not rocket science",
  "A blessing in disguise",
  "Faith over fear"
];

// Removes the overlay once startGame button is pressed
startButton.addEventListener("click",function(){
    overlay.style.display ="none";

});

// Gets a random sentence from the phrases array.
function getRandomPhraseAsArray(arr){
    // Fixing index 
    const lengthIndex = arr.length - 1;
    // Creates a random number using the length of the phrases array
    const randomNumber = Math.floor( Math.random() * lengthIndex)
    // Generates a random phrase from array
    const randomPhrase = arr[randomNumber];
    // Splits random phrase into singular letters
    const letters = randomPhrase.split(''); 

    return letters
}

const resultPhrase = getRandomPhraseAsArray(phrases);
console.log(resultPhrase)


function addPhraseToDisplay(arr){
  arr.forEach(function(e) {
    // Creates list item for each character
    let li = document.createElement("li");
   
    li.textContent = e;

    // Sorts each letter and space to add proper class.
    if(e == " ") {
        li.className = "space";
      } else {
        li.className = "letter";
      }
      // Appending to ul
      ul.appendChild(li);
  });

}

addPhraseToDisplay(resultPhrase);

// ReplacephraseToDisplay will replace the ul inside phrase div by a new ul with a new random phrase.
function replacePhraseToDisplay(arr){
  phrase.innerHTML= " ";
  let newUl = document.createElement("ul");

arr.forEach(function(e){
    let li = document.createElement("li");
    li.textContent = e;
  if (e === " "){
      li.className = "space";
    } else {
      li.className = "letter";
    }
      newUl.appendChild(li);
});
phrase.appendChild(newUl);
}
const letters = document.getElementsByTagName("li");
function checkLetter(button){
// Checks whether the text content of the button clicked is equal to the text content of the li added
  let buttonText = button.textContent;
  let buttonMatch = null; 
  
Array.from(letters).forEach(function(letter){
      if(button.textContent === letter.textContent.toLowerCase()){
      letter.classList.add("show");
        buttonMatch = buttonText;
      }
  });
  return buttonMatch;
}

// Resets the game
function reset (){
  startButton.textContent = "Reset Game";
  startButton.addEventListener("click", () => { 
  replacePhraseToDisplay(getRandomPhraseAsArray(phrases));
    missed = 0;
    for (var i = 0; i < hearts.length;i++){
      hearts[i].style.display = "";
      const heartimage= hearts[i].querySelectorAll("img")[0];
      heartimage.src = "images/liveHeart.png";
    }
  });
  return overlay.style.display
  }

// Click event added to the buttons
qwerty.addEventListener("click",(e) => {
if (e.target.tagName== "BUTTON"){
  const button = e.target;
  checkLetter(button);
  if (checkLetter(button) == null){
    missed += 1;
    const heartimage= hearts[missed-1].querySelectorAll("img")[0];
    heartimage.src="images/lostHeart.png";
  }
  button.disabled = true;
}
checkWin();
});

//This function will check whether the game has been won or lost
function checkWin(){
let title = document.querySelectorAll(".title")[0];
var letterCount = document.querySelectorAll(".letter");
var showCount = document.querySelectorAll(".show");
letterCount = letterCount.length;
showCount = showCount.length;
    if(letterCount == showCount){
  overlay.style.display = "";
  overlay.className= "win";
      title.textContent= "You win!"
  reset();
}
    if (missed >= 5) {
  overlay.style.display = "";
  overlay.className = "lose";
   title.textContent = "Game over!";
  reset();
  }
}