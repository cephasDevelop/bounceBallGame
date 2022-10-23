//--------------------------------------------------
function removeBlock(idx) {
    allBlocks.splice(idx, 1);
    let theBlocks = Array.from(document.querySelectorAll('.block'));
    theBlocks[idx].classList.remove('block');
    if (theBlocks.length == 0) { 
        clearInterval(ballTimer);
        document.removeEventListener('keydown', moveUser);
    }
}
function blockCollisions() {
    for (let i = 0; i < allBlocks.length; i++) {
                
        if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == 1) {
            if (
                (
                    ((ball.y + ballDimension >= allBlocks[i].bottomLeft[1]) &&
                        (allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y + ballDimension)
                    )
                    // ||
                    // (ball.y >= allBlocks[i].bottomLeft[1] && allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y)
                )
                &&
                (ball.x + ballDimension == allBlocks.bottomLeft[0])
            ) {
                ball.moveSecondQuadrant().move();
                moveBall();
                removeBlock(i);
            }
            else if (
                (
                    ((ball.x + ballDimension >= allBlocks[i].bottomLeft[0]) &&
                        (allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x + ballDimension))
                    // ||
                    // (ball.x >= allBlocks[i].bottomLeft[0] && allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x)
                ) &&
                (ball.y + ballDimension == allBlocks.bottomLeft[1])
            ) {
                ball.moveFourthQuadrant().move();
                moveBall();
                removeBlock(i);
            }
        }// first case ended
        if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == -1) {
            if (
                (
                    ((ball.y + ballDimension >= allBlocks[i].bottomLeft[1]) &&
                        (allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y + ballDimension))
                    // ||
                    // (ball.y >= allBlocks[i].bottomLeft[1] && allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y)
                ) &&
                (ball.x + ballDimension == allBlocks.bottomLeft[0] + blockDim.width)
            ) {
                ball.moveFourthQuadrant().move();
                moveBall();
                removeBlock(i);
            }
            else if (
                (
                    ((ball.x + ballDimension >= allBlocks[i].bottomLeft[0]) &&
                        (allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x + ballDimension))
                    // ||
                    // (ball.x >= allBlocks[i].bottomLeft[0] && allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x)
                ) &&
                (ball.y == allBlocks.bottomLeft[1] + blockDim.height)
            ) {
                ball.moveSecondQuadrant().move();
                // ball.move();
                moveBall();
                removeBlock(i);
            }
        }// second case ended
        if (ball.arrMotion[0] == -1 && ball.arrMotion[1] == 1) {
            if (
                (
                    ((ball.y + ballDimension >= allBlocks[i].bottomLeft[1]) &&
                        (allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y + ballDimension))
                    // ||
                    // (ball.y >= allBlocks[i].bottomLeft[1] && allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y)
                ) &&
                (ball.x == allBlocks.bottomLeft[0] + blockDim.width)
            ) {
                ball.moveFirstQuadrant().move();
                moveBall();
                removeBlock(i);
            }
            else if (
                (
                    ((ball.x + ballDimension >= allBlocks[i].bottomLeft[0]) &&
                        (allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x + ballDimension))
                    // ||
                    // (ball.x >= allBlocks[i].bottomLeft[0] && allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x)
                ) &&
                (ball.y + ballDimension == allBlocks.bottomLeft[1])
            ) {
                ball.moveThirdQuadrant().move();
                moveBall();
                removeBlock(i);
            }
        }// third case ended
        if (ball.arrMotion[0] == 1 && ball.arrMotion[1] == -1) {
            if (
                (
                    ((ball.y + ballDimension >= allBlocks[i].bottomLeft[1]) &&
                        (allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y + ballDimension))
                    // ||
                    // (ball.y >= allBlocks[i].bottomLeft[1] && allBlocks[i].bottomLeft[1] + blockDim.height >= ball.y)
                ) &&
                (ball.x + ballDimension == allBlocks.bottomLeft[0])
            ) {
                ball.moveThirdQuadrant().move();
                moveBall();
                removeBlock(i);
            }
            else if (
                (
                    ((ball.x + ballDimension >= allBlocks[i].bottomLeft[0]) &&
                        (allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x + ballDimension))
                    // ||
                    // (ball.x >= allBlocks[i].bottomLeft[0] && allBlocks[i].bottomLeft[0] + blockDim.width >= ball.x)
                ) &&
                (ball.y == allBlocks.bottomLeft[1] + blockDim.height)
            ) {
                ball.moveFirstQuadrant().move();
                moveBall();
                removeBlock(i);
            }
        }// fourth case ended   
    }
}