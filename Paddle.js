const SPEED = 0.02 // line 28

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem
    this.reset() // line 23
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    )
  }

  set position(value) {
    this.paddleElem.style.setProperty("--position", value) // this moves the position of the paddle to where you move the mouse on the y axis
  }

  rect() {
    return this.paddleElem.getBoundingClientRect() 
  }

  reset() {
    this.position = 50 //setup position so the paddle always resets at the center of the screen
  }

  update(delta, ballHeight) { // setting the function and make it so the paddle follows where ever the ball is on the screen
    this.position += SPEED * delta * (ballHeight - this.position) // if i leave it on this.position = ballHeight the paddle is going to move exactly where the ball is instantly, so it is impossible to beat the computer, so instead made the computer have a max speed by adding += SPEED
  }
}