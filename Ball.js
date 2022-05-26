const INITIAL_VELOCITY = 0.025 // velocity constant
const VELOCITY_INCREASE = 0.00001

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }

  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x")) // take the value from our css and converted that into a javascript number that we can use.
  }

  set x(value) {
    this.ballElem.style.setProperty("--x", value)
  }
  // y position 
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }

  set y(value) {
    this.ballElem.style.setProperty("--y", value)
  }

  rect() {
    return this.ballElem.getBoundingClientRect() // make it bounce off the top and bottom of our screen called on line 52
  }

  reset() {
    this.x = 50 //initial values in the middle of the screen
    this.y = 50
    this.direction = { x: 0 }
   // The reason for a while loop is to make the ball mover far enough to the left and right
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI) // get a randome number between 0 and 2 PI, 2 PI is the equivalent of 360. With radians we can use cosine and sine to determine the x and the y direction.
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    //console.log(this.direction)
    this.velocity = INITIAL_VELOCITY // specify velocity
  }

  update(delta, paddleRects) { // passing the paddle rectangles
    this.x += this.direction.x * this.velocity * delta // add the direction we are going on our x value
    this.y += this.direction.y * this.velocity * delta
    this.velocity += VELOCITY_INCREASE * delta // this will increase the velocity every time it hits the wall.
    const rect = this.rect()

    if (rect.bottom >= window.innerHeight || rect.top <= 0) { // if the bottom of our rectabgle is greater or equal to window inner heigh that means that we've gone past the bottom of our screen or rec.top is less or equal to zero means we've gone off the top screen.
      this.direction.y *= -1// we are flipping the y direction so when it hits the top of the screen it moves downwards and bottom move upwards.
    }

    if (paddleRects.some(r => isCollision(r, rect))) { // this loops through all of the diff paddle rectangles if any of them return true for the collision function is going to return true for the whole thing.
      this.direction.x *= -1
    }
  }
}
// Function that gives us a random number between 0 and 1
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min // using max minus min to make sure that it scales with the value to be within our range and add the min making sure the minimum is the lowest number we can get
}
// checking for a collision with any of the paddles if so swap the x direction 
function isCollision(rect1, rect2) { // taking in rect 1 and rect 2
  return (
    rect1.left <= rect2.right && // checking if the left side is less that or equal to the right side of the rect 2 
    rect1.right >= rect2.left && // check all the side of rect 1 if right side is greater than or equal to the left side of rect 2
    rect1.top <= rect2.bottom && // top is less than or equal to rect two 
    rect1.bottom >= rect2.top // rect bottom is greater than or equal to rect2 top
  )
}