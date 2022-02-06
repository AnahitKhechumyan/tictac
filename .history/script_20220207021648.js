window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const restartButton = document.querySelector('#restart');
    const speacker = document.querySelector('.speacker');

    let field = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

 const isValidAction = (box) => {
    if (box.innerText === 'X' || box.innerText === 'O'){
        return false;
    }

    return true;
};

const updateField =  (index) => {
    field[index] = currentPlayer;
 }

 const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const finish = (type) => {
    switch(type){
       case PLAYERO_WON:
        speacker.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
       case PLAYERX_WON:
        speacker.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
       case TIE:
        speacker.innerText = 'TIE';
        }
        speacker.classList.remove('hide');
};

function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i<=7; i++){
        const winCondition = winningConditions[i]; 
        if(field[winCondition[0]] === "" || field[winCondition[1]] === "" || field[winCondition[2]] === ""){
            continue;
        }
        if( field[winCondition[0]]=== field[winCondition[1]] && field[winCondition[1]] === field[winCondition[2]]){
            roundWon = true;
            break;
        }
    }
  
    if (roundWon) {
      finish(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }
    if (!field.includes("")) finish(TIE);
      }
      const userAction = (box, index) => {
        if (isValidAction(box) && isGameActive) {
          box.innerText = currentPlayer;
          box.classList.add(`player${currentPlayer}`);
          updateField(index);
          handleResultValidation();
          changePlayer();
        }
      };

      boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    const restartField = () => {
        field = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        speacker.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }
    restartButton.addEventListener('click', restartField);
  });

  
        
         