const movementDisplay = document.querySelector('#movement')
const statusDisplay = document.querySelector('#status')
const canvas = document.querySelector('canvas')

//get the rendering context from the canvas
const ctx = canvas.getContext('2d')
//set the canvas's resolution to be the same as the window
canvas.setAttribute('height', getComputedStyle(canvas)['height'])
canvas.setAttribute('width', getComputedStyle(canvas)['width'])


// //set context properties
// ctx.fillStyle = 'green'
// //invoke context methods to render things
// //ctx.fillRect(x, y, width, height)
// ctx.fillRect(10, 10, 80, 20)

// ctx.strokeStyle = 'purple'
// ctx.lineWidth = 2
// ctx.strokeRect(10, 10, 100, 20)

// function drawBox(x, y, width, height, color){
//     ctx.fillStyle = color
//     ctx.fillRect(x, y, width, height)
// }

// // drawBox(10, 10, 100, 100, 'purple')
// canvas.addEventListener('click', e =>{
//     console.log(e.offsetX, e.offsetY)
//     drawBox(e.offsetX, e.offsetY, 50, 50, 'blue')
// })

class Crawler {
    constructor(x, y, width, height, color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}

// const myCrawler = new Crawler(20, 20, 45, 45, 'green')
// myCrawler.render()

//define game objects
const hero = new Crawler(10, 335, 40, 40, 'green')
const ogreA = new Crawler(260, 270, 80, 20, 'blue')
const ogreB = new Crawler(365, 310, 80, 20, 'blue')
const ogreC = new Crawler(0, 0, 800, 184, 'black')
const ogreF = new Crawler(450, 350, 80, 40, 'black')

const ogreG = new Crawler(610, 320, 120, 64, 'black')

const ogreD = new Crawler(690, 210, 40, 40, 'yellow')
const ogreE = new Crawler(530, 290, 80, 20, 'blue')
const ogre = new Crawler(130, 335, 80, 40, 'blue')
let blah = (topX, topY, leftX, leftY, rightX, rightY) => {
    ctx.beginPath();
    ctx.moveTo(topX, topY);
    ctx.lineTo(leftX, leftY);
    ctx.lineTo(rightX, rightY);
    ctx.fillStyle = 'red'
    ctx.fill();
}


const bullet = []
const shrekBullets = []

// const ogreShootInterval = setInterval(() => {
//     shrekBullets.push(new Crawler(ogre.x, ogre.y, 10, 10, 'blue'))
// }, 1000)

//define movement handler function

function movementHandler(e) {
    // console.log(e.key)
    const speed = 10 // how many pixels the hero moves
if(hero.alive){
    switch (e.key){
        case('w'):
            hero.y -= speed
            if(hero.y < 0){
                hero.y = 0
            }
            //move the hero up
            break
        case('s'):
            hero.y += speed
            if(hero.y + hero.height > canvas.height){
                hero.y = canvas.height - hero.height
            }
            //move the hero down
            break
        case('a'):
            hero.x -= speed
            if(hero.x < 0){
                hero.x = 0
            }
            //move hero left
            break
        case('d'):
            hero.x += speed
            if(hero.x  + hero.width > canvas.width){
                hero.x = canvas.width - hero.width
            }
            //move the hero right
        // case('e'):
        
        //     bullet.push(new Crawler(hero.x + hero.width, hero.y, 10, 10, 'black'))
        //     console.log('working')
        //     break
    }
}
}

document.addEventListener('keypress', movementHandler)

//define a collition detection algorithm
function detectHit(objectOne, objectTwo){
    // AABB -- axis aligned bounding box collision detection
    const Left = objectOne.x + objectOne.width >= objectTwo.x

    const Right = objectOne.x <= objectTwo.x + objectTwo.width 

    const Top = objectOne.y + objectOne.height >= objectTwo.y

    const Bottom = objectOne.y <= objectTwo.y + objectTwo.height
    // console.log(objectTwoBottom, objectTwoLeft, objectTwoRight, objectTwoTop)

    if(Right && Left && Bottom && Top){
        return true
    } else {
        return false
    }
}


function endGame(){
    ogre.alive = false
    clearInterval(ogreShootInterval)
    // statusDisplay.innerText = 'Oops'
}

//define gameplay loop
const gameLoopInterval = setInterval(gameLoop, 60)

function gameLoop(){
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // do the business logic of our game (check for collisions)


    if(detectHit(hero, ogre)){
        endGame()
    }
    // render all of the game pieces
    if(hero.alive){
        hero.render()
        
    }
   blah(110, 335, 90, 375, 130, 375)
   blah(230, 335, 210, 375, 250, 375)
   blah(270, 335, 250, 375, 290, 375)
   blah(400, 225, 380, 185, 420, 185)
   blah(470, 310, 450, 350, 490, 350)
   blah(510, 310, 490, 350, 530, 350)

   blah(630, 280, 610, 320, 650, 320)
   blah(710, 280, 690, 320, 730, 320)
   blah(670, 280, 650, 320, 690, 320)
   


    ogreA.render()
    ogreB.render()
    ogreC.render()
    ogreD.render()
    ogreE.render()
    ogreF.render()
    ogreG.render()

    
    if(ogre.alive){
        ogre.render()
    }

    for(let i = 0; i < bullet.length; i++){
        bullet[i].x += 30
        bullet[i].render()
        if(detectHit(bullet[i], ogre)){
            endGame()
        }
    }
   

    for(let i = 0; i < shrekBullets.length; i++){
        shrekBullets[i].x -= 30
        shrekBullets[i].render()
        if(detectHit(shrekBullets[i], hero)){
            hero.alive = false
            statusDisplay.innerText = 'Oh No! Our hero has perished!'
        }
    }
  
}