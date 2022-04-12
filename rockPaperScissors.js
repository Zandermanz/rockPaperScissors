//Create function for computer play that will randomly return one of three values
function computerPlay(){
    //Create array that will hold three strings
    const play = ['rock', 'paper', 'scissors'];
    //generate random integer, 0, 1, or 2
    //random() returns number between 0 and 1, which we multiply by three, and then use floor() to limit convert it to an integer
    let randomNumber = Math.floor(Math.random() * 3);
    //use random number to pull from the play array
    return play[randomNumber];
}

//takes two parameters to play a round
function playRound(playerSelection, computerSelection){
    //converts selection strings to lowercase to make code case in-sensitive
    playerSelection = playerSelection.toLowerCase();
    //error checker, only executes code if it fits into one of the three values
    if (playerSelection !== 'rock' && playerSelection !== 'paper' && playerSelection !== 'scissors') {
        //returns array, no points to either side
        let roundResults = [playerSelection, computerSelection, `played an invalid entry`, 0, 0];
        return roundResults;
    }   
    //ends function returns tie
    if (playerSelection == computerSelection){
        // Array is [playerSelection, computerSelection, result, playerPoints, computerPoints]
        let roundResults = [playerSelection, computerSelection, 'Tied', 0, 0];
        return roundResults;
    }
    //lists the three losing plays
    if ((playerSelection == 'rock' && computerSelection == 'paper') || 
        (playerSelection == 'paper' && computerSelection == 'scissors')||
        (playerSelection == 'scissors' && computerSelection == 'rock')){
        // Array is [playerSelection, computerSelection, result, playerPoints, computerPoints]
        let roundResults = [playerSelection, computerSelection, `Lose`, 0, 1];
        return roundResults;
    }
    //all remaining plays must be winners, declares player wins
    // Array is [playerSelection, computerSelection, result, playerPoints, computerPoints]
    let roundResults = [playerSelection, computerSelection, `Win`, 1, 0];
    return roundResults;
}

//function to provide player selection - not quite working yet. Think the issue is the program is steaming ahead when I want it to wait for user selection
function selection(){
    const rock = document.querySelector('#rock');
    rock.addEventListener('click', () => {
        console.log("rock");
        return 'rock';
    })
    const paper = document.querySelector('#paper');
    paper.addEventListener('click', ()=> {
        console.log("paper");
        return 'paper';
    })
    const scissors = document.querySelector('#scissors');
    scissors.addEventListener('click', () => {
        console.log("scissors")
        return 'scissors';
    })
}

function game(){
    //sets initial score count before loop
    let playerPoints = 0;
    let computerPoints = 0;
    console.log(`Here we go. Best of 5 Wins!`)
    //Plays 5 rounds
    for (let i=0; i<5; i++){
        //prompts user for input
        let playerSelection = selection();
        //puts result of the round into roundResults array
        let roundResults = (playRound(playerSelection, computerPlay()));
        //console.log(roundResults);
        console.log(`You ${roundResults[2]}. You played ${roundResults[0]} and computer played ${roundResults[1]}`);
        //receive each element of the playRound array into it's holder and store
        playerPoints = playerPoints + roundResults [3];
        computerPoints = computerPoints + roundResults [4];
        //if the round result it a tie, subtracts an iterator so it doesn't count against the amount of rounds played
        if(roundResults[2] == `Tied` || `played an invalid entry`) i--;
        if(computerPoints === 3 || playerPoints === 3) {break}
    }
    // announce a winner
    if (playerPoints > computerPoints){
        console.log(`You Win this Round ${playerPoints} to ${computerPoints}`);
    } else if(playerPoints < computerPoints)
        {console.log(`Computer Wins this round ${computerPoints} to ${playerPoints}`);
    //tie is not currently possible
    } else if(playerPoints == computerPoints){
        console.log(`This round's a tie!`)}; 
}

//The Play button
const play = document.querySelector('#play');
//calls the game function when user presses play
play.addEventListener('click', game);


