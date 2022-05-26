// Update loop every frame that passes we are going to be calling a function its going to update the positions and the logic of all the pieces of our game.
import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

// selecting the html elements

const ball = new Ball(document.getElementById("ball")) 
const playerPaddle = new Paddle(document.getElementById("player-paddle")) // player paddel
const computerPaddle = new Paddle(document.getElementById("computer-paddle")) // computer paddel
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime
function update(time) { // function update taking the variable time for how much time has passed since the start of program
  if (lastTime != null) {
    const delta = time - lastTime // we can determen how much time has passed from the old frame to the new frame, we are selecting our time and subtracting it to get our delta.
    //console.log(delta);
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]) // passing both of our paddle rect
    computerPaddle.update(delta, ball.y) // for the computer paddle we are calling the update function passing the delta and also the y position of the ball because the paddle needs to know where the ball is so it can move to that position
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue") // getting the style var from our css 
    )

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01) // set the hue value and multiply by 0.01, slowly changes the hue amount everytime the frame changes.

    if (isLose()) handleLose() // callinf function handleLose Line 38
  }

  lastTime = time // every single time we call update 
  window.requestAnimationFrame(update) // as long as we keep on calling this its going to infenetly loop  
}

function isLose() { // Determine if we lost the game to see if the ball it ouside of bound
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() { // if lost make the ball reset to the center of the screen as well as the paddle.
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) { // if the ball goes away from the right screen the player scores
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1 // taking the player score element and add one more to the text that is in it. 
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1 // cheack if the computer won increment it by one
  }
  ball.reset()
  computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100 // player postion (e.y) is a pixel value window innerHeight alows us to convert it into a value between 0 and 1  and * 100 gives a value of 0 and 100
})

window.requestAnimationFrame(update)