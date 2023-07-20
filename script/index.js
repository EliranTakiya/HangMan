const words = [
    'cat',
    'pizza',
    'apple',
    'truck',
    'pink',
    'army',
    'potato',
    'soccer',
    'cheese',
    'tomato',
    'student',
    'funky',
    'giraffe',
    'dream',
    'snow',
    'round',
    'bread',
    'brown',
    'hotel',
    'friend',
    'shock',
    'door',
    'navy',
    'joker',
    'queen',
    'king',
]
//words to localStorage
localStorage.setItem('words', JSON.stringify(words))

const puzzleWord = document.querySelector('#puzzle');
const myStatus = document.querySelector('#status');
const guessedLetters = document.querySelector('#guessed-letters');
const errorMsg = document.querySelector('#error-message');

class HangMan {
    #word
    #remainingGuesses
    #foundWord
    constructor(word, remainingGuesses) {
        this.#word = word;
        this.#remainingGuesses = remainingGuesses;
        this.guessedLetters = [];
        this.status = 'playing';
        this.#foundWord = word.replace(/[a-z]/g, '*');
        puzzleWord.innerHTML = this.#foundWord;
        this.errorMsg = '';
        this.count = 0;
        this.guessed = [];
        this.score = 0;

    }
    getPuzzled() {
        // a method that returns a string that represents the current state of the puzzle.
        // It should replace the unguessed letters with asterisks (*), and keep the guessed letters and spaces as they are.
        //  For example, if the word is “cat” and the guessed letters are “a” and “t”, it should return “*at”.

        //take #word and split to wordArr
        const wordArr = this.#word.split('');
        //for loop on wordArr
        for (let i = 0; i < wordArr.length; i++) {
            if (!this.guessedLetters.includes(wordArr[i])) {
                //turn that letter to *
                wordArr[i] = '*';
            }
        }
        //return splitted array
        this.#foundWord = wordArr.join('');
        // console.log(this.#foundWord)
        return this.#foundWord;
    }

    makeGuess(guess) {
        let correct = false;
        // a method that takes a single letter as a parameter and updates the game state accordingly.
        // It should check if the guess is unique and valid (a single lowercase letter), and if so add it to the guessedLetters array.
        // It should also decrement the remainingGuesses by one, but only if the letter has not been guessed previously.
        // Finally, it should call another method called calculateStatus() to update the status property based on the current state of the game.

        //check with regex if the letter matches the pattern of lowercase letters and a-z
        if (!guess.match(/^[a-z]$/)) {
            this.errorMsg = 'guess must be lowercase letters'
            return
        };
        //does letter exist in guessedLetters, if it does then return back,if not then push it to guessedLetters
        if (this.guessedLetters.includes(guess)) {
            this.errorMsg = 'already guessed this letter'
            return
        };

        //if valid add to guessedLetters
        this.guessedLetters.push(guess);
        // console.log(this.guessedLetters)


        //for loop on wordArr
        const wordArr = this.#word.split('');
        for (let c = 0; c < wordArr.length; c++) {
            if (wordArr[c] === guess) {
                correct = true;
                console.log(correct)
                break;
            }
        }
        if (correct == false) {
            this.#remainingGuesses--;
        }
        this.calculateStatus();
        this.errorMsg = '';
    }

    changeMan(guess) {
        const wordArr = this.#word.split('');
        console.log(wordArr)
        let found = false;
        for (let j = 0; j < wordArr.length; j++) {
            if (guess === (wordArr[j])) {
                found = true; break;
            }

        } if (found == false) {
            if (!guess.match(/^[a-z]$/)) {
                this.errorMsg = 'guess must be lowercase letters'
                return
            };
            //does letter exist in guessedLetters, if it does then return back,if not then push it to guessedLetters
            if (this.guessed.includes(guess)) {
                this.errorMsg = 'already guessed this letter'
                return
            };
            const image = document.getElementById('man1');
            let source = image.src;
            console.log(source)//http://localhost:3000/asset/hang0.png
            image.src = `/HangMan/asset/hang${this.count}.png`;
            this.count++;
            this.guessed.push(guess)
            return
        }
    }

    calculateStatus() {
        // a method that updates the status property based on the current state of the game.
        // It should check if the player has guessed all the letters in the word, in which case it should set the status to “finished”.
        // It should also check if the player has run out of guesses, in which case it should set the status to “failed”.
        // Otherwise, it should set the status to “playing”.
        if (!this.getPuzzled().includes('*')) {
            return this.status = 'finished';
        }
        if (this.#remainingGuesses === 0) {
            return (this.status = 'failed');

        } else {
            return this.status = 'playing';
        }
    }

    getStatusMessage() {
        // a method that returns a string that represents a message to display to the player based on the status of the game.
        // It should use different messages for each possible status value. For example, if the status is “playing”, it should return something like “Remaining Guesses: 5”.
        // If the status is “failed”, it should return something like “Nice try! The word was cat.”.
        // If the status is “finished”, it should return something like “Great work! You guessed the word!”.
        if (this.status === 'playing') {
            return `remaining guesses: ${this.#remainingGuesses}`;
        } else if (
            this.status === 'failed') {
            //score
                localStorage.removeItem("user_score");
                let myScore = document.getElementById('score');
                myScore.innerHTML = ' game over try again!';
                //score
            return `nice try! the word was ${this.#word}`
        }
        else {
            const image = document.getElementById('man1');
            let source = image.src;
            console.log(source)//http://localhost:3000/asset/hang0.png
            image.src = `/HangMan/asset/nice-job.jpg`;

            const newHeight=document.getElementById('main');
            newHeight.style.height='187px';
             //score
            let myScore = document.getElementById('score');
            myScore.innerHTML = localStorage.getItem('user_score');
            localStorage.setItem('user_score', Number(myScore.innerHTML) + 1)
            myScore.innerHTML = localStorage.getItem('user_score')
            //score
            
            return `great work! you guessed the word: ${this.#foundWord}`
        }
    }
}


function randomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}
const word = randomWord();
const hangMan = new HangMan(word, 7);
//score
let myScore=document.getElementById('score');
myScore.innerHTML=localStorage.getItem('user_score');
//score

// hangMan.makeGuess('f');
// console.log(hangMan.getPuzzled())
// console.log(hangMan.getStatusMessage())
// console.log(hangMan)

// hangMan.makeGuess('t');
// console.log(hangMan.getPuzzled())
// console.log(hangMan.getStatusMessage())
// console.log(hangMan)

// hangMan.makeGuess('c')
// console.log(hangMan.getPuzzled())
// console.log(hangMan.getStatusMessage())
// console.log(hangMan)

// hangMan.makeGuess('a')
// console.log(hangMan.getPuzzled())
// console.log(hangMan.getStatusMessage())
// console.log(hangMan)
//hangMan.makeGuess('a')
//hangMan.makeGuess('a');
// console.log(hangMan.getPuzzled())
// console.log(hangMan.calculateStatus())
// console.log(hangMan.getStatusMessage())


function render() {
    puzzleWord.innerHTML = hangMan.getPuzzled();
    myStatus.innerHTML = hangMan.getStatusMessage();
    guessedLetters.innerHTML = hangMan.guessedLetters.join(', ');
    errorMsg.innerHTML = hangMan.errorMsg;

}



function checkKEY(){
   const a=document.getElementById('a');
a.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const b=document.getElementById('b');
b.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const c=document.getElementById('c');
c.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const d=document.getElementById('d');
d.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const e=document.getElementById('e');
e.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const f=document.getElementById('f');
f.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const g=document.getElementById('g');
g.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const h=document.getElementById('h');
h.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
})
const i=document.getElementById('i');
i.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const j=document.getElementById('j');
j.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const k=document.getElementById('k');
k.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const l=document.getElementById('l');
l.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const m=document.getElementById('m');
m.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const n=document.getElementById('n');
n.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const o=document.getElementById('o');
o.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const p=document.getElementById('p');
p.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const q=document.getElementById('q');
q.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const r=document.getElementById('r');
r.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const s=document.getElementById('s');
s.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const t=document.getElementById('t');
t.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const u=document.getElementById('u');
u.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const v=document.getElementById('v');
v.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const w=document.getElementById('w');
w.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const x=document.getElementById('x');
x.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const y=document.getElementById('y');
y.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 
const z=document.getElementById('z');
z.addEventListener('click',function(e){
if(hangMan.status !== 'playing') return;

    const guess=e.target.innerHTML;
    hangMan.makeGuess(guess)
hangMan.changeMan(guess)
render();
}) 

}
checkKEY();

window.addEventListener('keypress', function ({ key }) {
    if (hangMan.status !== 'playing') return;
    //הכנס ל guess
    const guess = key;
    console.log(key);
    hangMan.makeGuess(guess);
    hangMan.changeMan(guess);
    render();

    // errorMessage(guess);
});


function errorMessage(guess) {
    const error = document.querySelector('#error-message');
    if (!guess.match(/^[a-z]$/)) {
        error.innerHTML = 'please enter only lower case letter a-z';
        error.style.display = 'block';
        setTimeout(function () {
            error.style.display = 'none';
        }, 3000)
    }
    else {
        error.style.display = 'none';
        error.innerHTML = " ";
    }

}

