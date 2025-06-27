let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

let btns= ["yellow","red","purple","blue"];

let h2= document.querySelector("h2");
let h3= document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game is started");
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    }, 300);

}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 300);

}
function levelUp(){
    level++;
    h2.innerText=`Level ${level}`;

    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    // console.log(randomBtn);
    // console.log(randomColor);
    gameSequence.push(randomColor);
    gameFlash(randomBtn);
}

function CheckAns(idx){
    // let idx=level-1;
    if(userSequence[idx]===gameSequence[idx]){

        if(userSequence.length===gameSequence.length){
            console.log("correct");
            userSequence=[];
            setTimeout(function(){
                levelUp();
            }, 1000);
        }
    }else{
        h2.innerHTML=`Game Over, Your Score Was <b> ${level}</b> <br>Press Any Key to Restart`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
        let highScore = level;
        if(highScore > localStorage.getItem("highScore")){  
            localStorage.setItem("highScore", highScore);
        }
        h3.innerHTML=`High Score: <b>${localStorage.getItem("highScore")}</b>`;
        reset();
    }
}
function btnpress(){
    let btn=this;
    userFlash(btn);

    userColor= btn.getAttribute("id");
    userSequence.push(userColor);

    CheckAns(userSequence.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    gameSequence = [];
    userSequence = [];
    level = 0;
    started = false;
    // h2.innerText="Press Any Key to Start";
}