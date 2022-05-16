const blockWidth = 50 ;
const blockHeight = 25 ;

const playerBlockHeight = 10; 
var playerBlockWidth = 250 ;

const playerMovement = 14 ;

const areaWidth = 1240  ;
const areaHeight = 500 ;

const ballDiameter = 20 ;

const blockGap = 5 ;
const rowGap = 5 ;

const initialBlock = 20 ;

var interval = 30 ;

var timeId ;
// console.log("timeId : " + timeId);
const playArea = document.querySelector(".play-area") ;
const playerBlock = document.querySelector(".player-block") ;
const ball = document.querySelector(".ball") ;
const scoreDiv = document.querySelector(".score") ;
const winAudio = document.querySelector(".win-audio") ;
const loseAudio = document.querySelector(".lose-audio") ;
const collideAudio = document.querySelector(".collide") ;
const startBtn = document.querySelector(".start") ;
const stopBtn = document.querySelector(".stop") ;
const leftArrow = document.querySelector(".left") ;
const rightArrow = document.querySelector(".right") ;

// console.log(leftArrow,rightArrow);

const playerStart = [(areaWidth-playerBlockWidth)/2,20] ;// console.log(playerStart);
var playerCoordinates = [playerStart[0],playerStart[1]] ;

const ballStart = [(areaWidth-ballDiameter)/2,30] ;
var ballCoordinates = [ballStart[0],ballStart[1]] ; 

const rand = Math.random() + 3 ;

const a = Math.random() ;
const angle = Math.random()*15+45 ;
const tan = Math.tan(angle*Math.PI/180);

var yDirection = rand ;
var xDirection =  yDirection*tan;

if(a>=0.5){
    xDirection *= -1 ;
}
// console.log(`angle => ${angle}`);
// console.log(`tan => ${Math.tan(angle*Math.PI/180)}`);
// console.log(xDirection,yDirection);
// console.log(parseInt(scoreDiv.innerHTML));

class Block{
    // a,b ==> x,y ==> left , bottom
    constructor(a,b){
        this.bottomLeft = [a,b] ;
        this.bottomRight = [a+blockWidth,b];
        this.topLeft = [a,b+blockHeight] ;
        this.topRight = [a+blockWidth,b+blockHeight] ;
    }
}


// const a = new Block(1,2) ;

// console.log(a.topRight);

var blocks =   [new Block(initialBlock,430),
                new Block(initialBlock+(blockGap+blockWidth)*1,430),
                new Block(initialBlock+(blockGap+blockWidth)*2,430),
                new Block(initialBlock+(blockGap+blockWidth)*3,430),
                new Block(initialBlock+(blockGap+blockWidth)*4,430),
                new Block(initialBlock+(blockGap+blockWidth)*5,430),
                new Block(initialBlock+(blockGap+blockWidth)*6,430),
                new Block(initialBlock+(blockGap+blockWidth)*7,430),
                new Block(initialBlock+(blockGap+blockWidth)*8,430),
                new Block(initialBlock+(blockGap+blockWidth)*9,430),
                new Block(initialBlock+(blockGap+blockWidth)*10,430),
                new Block(initialBlock+(blockGap+blockWidth)*11,430),
                new Block(initialBlock+(blockGap+blockWidth)*12,430),
                new Block(initialBlock+(blockGap+blockWidth)*13,430),
                new Block(initialBlock+(blockGap+blockWidth)*14,430),
                new Block(initialBlock+(blockGap+blockWidth)*15,430),
                new Block(initialBlock+(blockGap+blockWidth)*16,430),
                new Block(initialBlock+(blockGap+blockWidth)*17,430),
                new Block(initialBlock+(blockGap+blockWidth)*18,430),
                new Block(initialBlock+(blockGap+blockWidth)*19,430),
                new Block(initialBlock+(blockGap+blockWidth)*20,430),
                new Block(initialBlock+(blockGap+blockWidth)*21,430),


                new Block(initialBlock,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*1,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*2,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*3,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*4,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*5,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*6,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*7,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*8,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*9,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*10,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*11,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*12,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*13,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*14,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*15,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*16,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*17,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*18,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*19,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*20,430-rowGap-blockHeight),
                new Block(initialBlock+(blockGap+blockWidth)*21,430-rowGap-blockHeight),


                new Block(initialBlock,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*1,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*2,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*3,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*4,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*5,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*6,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*7,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*8,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*9,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*10,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*11,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*12,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*13,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*14,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*15,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*16,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*17,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*18,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*19,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*20,430-(rowGap+blockHeight)*2),
                new Block(initialBlock+(blockGap+blockWidth)*21,430-(rowGap+blockHeight)*2)
]


const maxScore = blocks.length ;
const numberOfBlocks = blocks.length ;
// console.log(numberOfBlocks);
// console.log(maxScore);
for(let i = 0;i<blocks.length;i++){

    // console.log(blocks[i]);
    const b = document.createElement('div') ;
    b.classList.add("block") ;
    b.style.left = blocks[i].bottomLeft[0]+"px" ;
    b.style.bottom = blocks[i].bottomLeft[1]+"px" ;
    playArea.appendChild(b) ;
}

const blocksInHtml = Array.from(document.querySelectorAll(".block")) ;
// console.log(blocksInHtml);

function drawPlayer(){
    playerBlock.style.left = playerCoordinates[0] + "px";
    playerBlock.style.bottom =  playerCoordinates[1] + "px";
}

function drawBall(){
    ball.style.left = ballCoordinates[0] + "px";
    ball.style.bottom = ballCoordinates[1] + "px";
}

function movePlayer(e){
    // console.log(e.key);
    // console.log(playerCoordinates);
    if(e.key=="ArrowLeft"){
        if(playerCoordinates[0]-playerMovement>0){
            playerCoordinates[0] -= playerMovement ;
        }
    }

    else if(e.key=="ArrowRight"){
        if(playerCoordinates[0]+playerMovement<areaWidth-playerBlockWidth){
            playerCoordinates[0] += playerMovement ;
        }
    }

    drawPlayer();
}

function movePlayerLeft(){
    if(playerCoordinates[0]>0){
        playerCoordinates[0] -= 14 ;
    }
    drawPlayer();
}

function movePlayerRight(){
    if(playerCoordinates[0]<areaWidth-playerBlockWidth){
        playerCoordinates[0] += 14 ;
    }
    drawPlayer();
}


function moveBall(){
    // console.log("ball moving");

    //collision with target blocks

    for(let i = 0;i<blocks.length;i++){

        if( ballCoordinates[0]+ballDiameter>=blocks[i].bottomLeft[0] && 
            ballCoordinates[0]<=blocks[i].bottomLeft[0]+blockWidth   &&
            ballCoordinates[1]<=blocks[i].bottomLeft[1]+blockHeight  &&
            ballCoordinates[1]+ballDiameter>=blocks[i].bottomLeft[1] ){


                if(ballCoordinates[1]+ballDiameter>=blocks[i].bottomLeft[1]+blockHeight && blocks[i].bottomLeft[1]==430){
                    console.log("Hit on top");
                    yDirection *= -1 ;
                }
                // console.log(`collided with block ${i}`);
                blocksInHtml[i].classList.remove("block") ;

                scoreDiv.innerHTML ++ ;
                blocks.splice(i,1) ;
                blocksInHtml.splice(i,1) ;

                if(scoreDiv.innerHTML==="33"){
                    interval = 20 ;
                    clearInterval(timeId) ;
                    timeId = setInterval(moveBall,interval) ;
                }

                if(scoreDiv.innerHTML==="60"){
                    interval = 15 ;
                    clearInterval(timeId) ;
                    timeId = setInterval(moveBall,interval) ;
                }
                
                if(parseInt(scoreDiv.innerHTML)===maxScore){
                    scoreDiv.innerHTML = "You Won !" ;
                    winAudio.currentTime = 0 ;
                    winAudio.volume = 0.5 ;
                    winAudio.play() ;
                    clearInterval(timeId) ;
                    document.removeEventListener("keydown",movePlayer) ;
                    startBtn.removeEventListener("click",startGame) ;
                    stopBtn.removeEventListener("click",stopGame) ;
                }
                else{
                    collideAudio.currentTime = 0;
                    collideAudio.volume = 0.5 ;
                    collideAudio.play();
                }
            }
    }



    //collision with player
    if( ballCoordinates[0]+ballDiameter>=playerCoordinates[0]  &&
        ballCoordinates[0]<=playerCoordinates[0]+playerBlockWidth    &&
        ballCoordinates[1]<=playerCoordinates[1] + playerBlockHeight &&
        ballCoordinates[1]+ballDiameter>=playerCoordinates[1]  && yDirection<0)
        {   
            yDirection *= -1 ;
        }

    //collision with right wall 
    if(ballCoordinates[0]+ballDiameter>=areaWidth){
        // console.log("Collided with right wall");
        xDirection *= -1 ;
    }

    //collision with left wall
    if(ballCoordinates[0]<=0){
        // console.log("Collided with left wall");
        xDirection *= -1 ;
    }

    //collision with top wall
    if(ballCoordinates[1]+ballDiameter>=areaHeight){
        // console.log("Collided with top wall");
        yDirection *= -1 ;
    }

    //collision with bottom wall
    if(ballCoordinates[1]<=0){
        // console.log("Collided with bottom wall");
        clearInterval(timeId) ;
        document.removeEventListener("keydown",movePlayer) ;
        startBtn.removeEventListener("click",startGame) ;
        stopBtn.removeEventListener("click",stopGame) ;
        // timeId = undefined ;
        scoreDiv.innerText += " You Lost ! Refresh to Play Again" ;
        loseAudio.currentTime = 0 ;
        loseAudio.volume = 0.5 ;
        loseAudio.play() ;

    }

    ballCoordinates[0]+=xDirection ;
    ballCoordinates[1]+=yDirection ;

    drawBall();
}


drawPlayer();
drawBall();

startBtn.addEventListener("click",startGame) ;

stopBtn.addEventListener("click",stopGame) ;

function startGame(){
    document.addEventListener("keydown",movePlayer) ;
    if(timeId==undefined){
        timeId = setInterval(moveBall,interval);
    }
    else{
        clearInterval(timeId) ;
        timeId = setInterval(moveBall,interval);
    }
    console.log(interval);
    startBtn.style.backgroundColor = "green" ;
    stopBtn.style.backgroundColor = "#08f" ;
    leftArrow.addEventListener("click",movePlayerLeft) ;
    rightArrow.addEventListener("click",movePlayerRight) ;
}

function stopGame(){
    clearInterval(timeId) ;
    document.removeEventListener("keydown",movePlayer) ;
    leftArrow.removeEventListener("click",movePlayerLeft) ;
    rightArrow.removeEventListener("click",movePlayerRight) ;
    startBtn.style.backgroundColor = "#08f" ;
    stopBtn.style.backgroundColor = "green" ;
}