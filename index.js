// import { checkBorderCollision } from "./twoFuncs.js";
const grid = document.querySelector(".grid");
const gridDimension = [560,300];

const ballDimension = 20;
const blockDim = {
    width: 100,
    height: 20
};

const MOTION_DIRECTION = {
    firstQuadrant: [1, 1],
    secondQuadrant: [-1, 1],
    thirdQuadrant: [-1, -1],
    fourthQuadrant:[1, -1]
};

class Block{ 
    constructor(xAxis,yAxis) {
        this.bottomLeft = [xAxis,yAxis];
        this.bottomRight = [xAxis+blockDim.width, yAxis];
        this.topLeft = [xAxis, yAxis+blockDim.height];
        this.topRight = [xAxis + blockDim.width, yAxis + blockDim.height];
    }    
}

class User{ 
    constructor(x,y=10) {
        this.x = x;
        this.y = y;
        this.moveLeft = function () { this.x -= 5 };
        this.moveRight = function () { this.x += 5 };
     }
}

const player = new User(230);
class Bouncing{ 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xTwo = this.x + ballDimension;
        this.yTwo = this.y + ballDimension;
        this.xAvg = this.x+ 0.5*ballDimension;
        this.yAvg = this.y+ 0.5*ballDimension;
        this.arrMotion = MOTION_DIRECTION.firstQuadrant;
        this.moveFirstQuadrant = function () {
            this.arrMotion = MOTION_DIRECTION.firstQuadrant
        }
        this.moveSecondQuadrant = function () {
            this.arrMotion = MOTION_DIRECTION.secondQuadrant
        }
        this.moveThirdQuadrant = function () {
            this.arrMotion = MOTION_DIRECTION.thirdQuadrant
        }
        this.moveFourthQuadrant = function () {
            this.arrMotion = MOTION_DIRECTION.fourthQuadrant
        }
        this.move = function () {
            this.x += this.arrMotion[0];
            this.y += this.arrMotion[1];
         }
     }
}

const ball = new Bouncing(270,50);
// const first = new Block(10, 50);
// // console.log(first);

const blockPosition = [
    [10, 270], [120, 270], [230, 270], [340, 270], [450, 270],
    [10, 240], [120, 240], [230, 240], [340, 240], [450, 240],
    [10, 210], [120, 210], [230, 210], [340, 210], [450, 210]
];
const allBlocks = blockPosition.map(val=>new Block(val[0],val[1]));

// create top blocks
function drawTopBlocks() {
    for (let i = 0; i < allBlocks.length; i++){
        let oneTopBlock = document.createElement('div');
        oneTopBlock.classList.add('block');
        oneTopBlock.style.left = `${allBlocks[i].bottomLeft[0]}px`;
        oneTopBlock.style.bottom = `${allBlocks[i].bottomLeft[1]}px`;
        grid.appendChild(oneTopBlock);
    }
}
//------------------------------------------
// -- CALL THE DRAW TOP BLOCKS FUNCTION ----
drawTopBlocks();
//------------------------------------------

// create the user block at the bottom
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = `${player.x}px`;
    user.style.bottom = `${player.y}px`;
}
//---------------------------
//CREATE THE BALL 
const theBall = document.createElement('div');
theBall.classList.add('ball');
moveBall();
grid.appendChild(theBall);

function moveBall() {
    theBall.style.left = `${ball.x}px`;
    theBall.style.bottom = `${ball.y}px`;   
}
//---------------------------------



// MOVE BALL
function bounceBall() {
    ball.move();
    moveBall();
    checkBorderCollision();
    blockCollisions();
    checkGameOver();

}
//-------------------------------------------------------------------------
// CHECKING INDIVIDUAL BLOCKS
function blockCollisions() {
    for (let i = 0; i < allBlocks.length; i++) {
        //  BALL FROM BOTTOM
        
        if (oneBlock(i)) {
            let bbb = allBlocks[i]
            console.log(`the x-axis = ${bbb.bottomLeft[0]}`);
            console.log(`the y-axis = ${bbb.bottomLeft[1]}`);
            removeBlock(i);
            return;
        }
    }
}
function oneBlock(idx) {
    if (// BALL FROTOM
        ((ball.yTwo == allBlocks[idx].bottomLeft[1]) &&
        (ball.xAvg >= allBlocks[idx].bottomLeft[0] && ball.xAvg <= allBlocks[idx].bottomRight[0]))
    ) {
        if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == 1) {
            ball.moveFourthQuadrant();
            ball.move();
        } else if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == 1) {
            ball.moveThirdQuadrant();
            ball.move();
        }
        retuue;
    } else if (// BALL TOP
        (ball.y == allBlocks[idx].bottomLeft[1]) &&
        (ball.xAvg >= allBlocks[idx].bottomLeft[0] && ball.xAvg <= allBlocks[idx].bottomRight[0])
    ) {
        if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == -1) {
            ball.moveFirstQuadrant();
            ball.move();
        } else if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == -1) {
            ball.moveSecondQuadrant();
            ball.move();
        }
        retuue;
    } else if (// BALL EFT
        (ball.xTwo == allBlocks[idx].bottomLeft[0]) &&
        (ball.yAvg >= allBlocks[idx].bottomLeft[1] && ball.yAvg <= allBlocks[idx].topLeft[1])
    ) {
        if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == 1) {
            ball.moveSecondQuadrant();
            ball.move();
        } else if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == -1) {
            ball.moveThirdQuadrant();
            ball.move();
        }
        retuue;
    } else if (// BALL GHT
        (ball.x == allBlocks[idx].bottomRight[0]) &&
        (ball.yAvg >= allBlocks[idx].bottomLeft[1] && ball.yAvg <= allBlocks[idx].topLeft[1])
    ) {
        if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == 1) {
            ball.moveFirstQuadrant();
            ball.move();
        } else if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == 1) {
            ball.moveFirstQuadrant();
            ball.move();
        }
        return true;
    } else { 
        return false;
    }
}

//------------------------------------------------------------------------
// CHECKING FOR BORDER COLLISIONS
function checkBorderCollision() {
    if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == 1) {// DIRECTION [2,2]
        if (// MEET THE RIGHT BORDER
            (ball.x == (gridDimension[0] - ballDimension)) &&
            (ball.y<(gridDimension[1] - ballDimension))
        ) {
            ball.moveSecondQuadrant();
            ball.move();
        } else if (// MEET THE TOP
            (ball.x > 0 && ball.x < (gridDimension[0] - ballDimension)) &&
            (ball.y == (gridDimension[1] - ballDimension))
        ) {
            ball.moveFourthQuadrant();
            ball.move();
        }
        else if (
            (ball.x == (gridDimension[0] - ballDimension)) &&
            (ball.y == (gridDimension[1] - ballDimension))
        ) {
            ball.moveThirdQuadrant();
            ball.move();
        }
    }
    if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == 1) {// DIRECTION [-2,2]
        if (// MEET THE LEFT
            (ball.x == 0 &&
            (ball.y>0 && ball.y<(gridDimension[1] - ballDimension)))
        ) {
            ball.moveFirstQuadrant();
            ball.move();
        } else if (// MEET THE TOP
            (ball.x > 0 && ball.x < (gridDimension[0] - ballDimension)) &&
            (ball.y == (gridDimension[1] - ballDimension))
        ) {
            ball.moveThirdQuadrant();
            ball.move();
        }
        else if (
            (ball.x == 0 &&
            (ball.y == (gridDimension[1] - ballDimension)))
        ) {
            ball.moveFourthQuadrant();
            ball.move();
        }
    }
    if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == -1) {// DIRECTION [-2,-2]
        if (// MEET THE LEFT
            (ball.x == 0 &&
            (ball.y<(gridDimension[1] - ballDimension)))
        ) {
            ball.moveFourthQuadrant();
            ball.move();
        }
        else if (// MEET THE BOTTOM/ USER
            ((ball.x  >= player.x) && (ball.x < player.x+blockDim.width)) &&
            (ball.y == player.y+blockDim.height)
        ) {
            ball.moveSecondQuadrant();
            ball.move();
        }
    }
    if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == -1) {// DIRECTION [2,-2]
        if (// MEET THE RIGHT BORDER
            (ball.x == (gridDimension[0] - ballDimension)) &&
            (ball.y<(gridDimension[1] - ballDimension))
        ) {
            ball.moveThirdQuadrant();
            ball.move();
        }
        else if (// MEET THE BOTTOM/ USER
            ((ball.x  >= player.x) && (ball.x < player.x+blockDim.width)) &&
            (ball.y == player.y+blockDim.height)
        ) {
            ball.moveFirstQuadrant();
            ball.move();
        }
    }
    moveBall();
}
//---------------------------
// REMOVE INDIVIDUAL BLOCKS - 
function removeBlock(idx) {
    allBlocks.splice(idx, 1);
    let theBlocks = Array.from(document.querySelectorAll('.block'));
    theBlocks[idx].classList.remove('block');
    if (theBlocks.length == 0) { 
        clearInterval(ballTimer);
        document.removeEventListener('keydown', moveUser);
    }
}
//--------------------------

//--------------------------
//  CHECK FOR GAME OVER
function checkGameOver() {
    if (ball.y < player.y) {
        clearInterval(ballTimer);
        document.removeEventListener('keydown',moveUser);
    }
}
//-----------------------------


//-----------------------------------
// MOVE USER
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (player.x > 0) player.moveLeft();
            drawUser();
            break;
        case 'ArrowRight':
            if (player.x < 460) player.moveRight();
            drawUser();
            break;
    }
}
//--------------------------------------------


let ballTimer = setInterval(bounceBall,10);
document.addEventListener('keydown', moveUser);


