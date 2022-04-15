//Function for computer play that will randomly return one of three values
function computerPlay(){
    //Create array that will hold three strings
    const play = ['rock', 'paper', 'scissors'];
    //generate random integer, 0, 1, or 2
    //random() returns number between 0 and 1, which we multiply by three, and then use floor() to limit convert it to an integer
    let randomNumber = Math.floor(Math.random() * 3);
    //use random number to pull from the play array
    return play[randomNumber];
}

//Takes two parameters and play a round
function playRound(playerSelection, computerSelection){  
    //ends function returns tie
    if (playerSelection == computerSelection){
        // Array is [playerSelection, computerSelection, result, playerPoints, computerPoints]
        let roundResults = [playerSelection, computerSelection, 'Tied', 0, 0];
        //console.log(roundResults);
        return roundResults;
    }
    //lists the three losing plays
    if ((playerSelection == 'rock' && computerSelection == 'paper') || 
        (playerSelection == 'paper' && computerSelection == 'scissors')||
        (playerSelection == 'scissors' && computerSelection == 'rock')){
        // Array is [playerSelection, computerSelection, result, playerPoints, computerPoints]
        let roundResults = [playerSelection, computerSelection, `Lose`, 0, 1];
        //console.log(roundResults);
        return roundResults;
    }
    //all remaining plays must be winners, declares player wins
    // Array is [playerSelection, computerSelection, result, playerPoints, computerPoints]
    let roundResults = [playerSelection, computerSelection, `Win`, 1, 0];
    //console.log(roundResults);
    return roundResults;
}

//defines global variables for tracking score
let playerPoints = 0;
let computerPoints = 0;

//buttons to provide player selection
const rock = document.querySelector('#rock');
rock.addEventListener('click', () => {
    playedButton("rock")
});
    
const paper = document.querySelector('#paper');
paper.addEventListener('click', () => {
    playedButton("paper")
})

const scissors = document.querySelector('#scissors');
scissors.addEventListener('click', () => {
    playedButton("scissors")
})

const reset = document.querySelector('#reset');
reset.addEventListener('click', resetGame)

function resetGame(){
    resetPoints;
    const result = document.querySelector('#results'); 
    //while loop to remove all children
    while (result.firstChild){
        result.removeChild(result.firstChild)
    }  
}

function resetPoints(){
    playerPoints = 0; 
    computerPoints = 0;
}

//Function for three buttons, makes a play, calls announceResult function to put put result to page, awards points depending
//on winner. Calls checkWinner function to see if there is a winner and resets the score 
function playedButton(play){
    let roundResults = (playRound(play, computerPlay()));
    //Pushes winner to the page
    announceResult(roundResults);
    //awards points based on winner
    if(roundResults[3] === 1){playerPoints++}
    if(roundResults[4] === 1){computerPoints++}
    //after each button is pressed, checkWinner looks to see if either has 3 points
    checkWinner(playerPoints, computerPoints)
}

//Prints out round results after making a play
function announceResult(roundResults){
    //logs the play to the console
    console.log(`You ${roundResults[2]}. You played ${roundResults[0]} and computer played ${roundResults[1]}`);
    const result = document.querySelector('#results');
    const p = document.createElement('p')
    p.classList.add('results');
    //adds the round result to the page
    p.textContent = `You ${roundResults[2]}. You played ${roundResults[0]} and computer played ${roundResults[1]}`;
    result.appendChild(p)
}

//function called by buttons to check points, push winner and score text to html
function checkWinner(playerPoints, computerPoints){    
    const result = document.querySelector('#results');
    const p = document.createElement('p')
    if(playerPoints >= 3){
        p.textContent = `Player wins with ${playerPoints} points to Computer's ${computerPoints} points.`
        console.log(`Player wins with ${playerPoints} points to Computer's ${computerPoints} points.`);
        resetPoints();
    } 
    if(computerPoints >= 3){
        p.textContent = `Computer wins with ${computerPoints} points to Player's ${playerPoints} points.`
        console.log(`Computer wins with ${computerPoints} points to Player's ${playerPoints} points.`);
        resetPoints();
    }
    result.appendChild(p);   
}