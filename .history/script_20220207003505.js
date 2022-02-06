window.addEventListener("DOMContentLoaded",()=>{
    const boxes = Array.from(document.querySelectorAll(".box"));
    const playerDisplay = document.querySelector(".display-player");
    const restartButton = document.querySelector("#restart");
    const speacker = document.querySelector(".speacker");

    let field =["","","","","","","","",""];
    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYER0_WON = "PLAYER0_WON";
    const TIE = "TIE";

    const winningConditions =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function handleResultValidation(){
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
        
        if(roundWon){
            finish(currentPlayer ==="X" ?PLAYERX_WON  :  PLAYER0_WON);
            let  isGameActive = false;
            return;  
        }
        if(!field.includes("")){
            finish(TIE); 
        }
      }  
    }

        const finish = (type)=>{
            switch(type){
                case PLAYER0_WON:
                    speacker.innerHTML = `Player <span class = "display-player playerX"> X </span> is turn`;  
                    break;
                case PLAYERX_WON:
                    speacker.innerHTML = `Player <span class = "display-player playerO"> O </span> is turn`;  
                    break; 
                case TIE: 
                speacker.innerHTML = `We have a tie!`;                 
            }
        }
        const isValidActian = (box)=>{
            if(box.innerText === "X" || box.innerText === "0" ){
                return false;
            }
               return true;
        };


        const updateField = (index)=>{
            field[index] = currentPlayer;
        };


        const changePlayer = ()=>{
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer==="X" ? "0" : "X";
            playerDisplay.innerText =  currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`); 
        };


        const userAction = (box, index)=>{
            if(isValidActian(box) && isGameActive){
                box.innerText = currentPlayer;
                box.classList.add(`player${currentPlayer}`);
                updateField(index);  
                handleResultValidation();
                changePlayer();
            }
        };

        const restartField = ()=>{
            field = ["","","","","","","","","",];
            isGameActive = true;
            speacker.classList.add("hide");
           if( currentPlayer ==="0"){
               changePlayer();
           }
           boxes.forEach((box)=>{
               box.innerText = "";
               box.classList.remove("playerX");
               box.classList.remove("player0");
           });
        };     

        boxes.forEach((box,index)=>{
            box.addEventListener("click", ()=>userAction(box, index));
        });

       restartButton.addEventListener("click", restartField);
});