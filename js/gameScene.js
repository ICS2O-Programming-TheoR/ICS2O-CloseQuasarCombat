/* global Phaser */

//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Mr. Coxall
//Edited by: Theo Rafuse
//Created on: Sep 2020
//Edited on: June 2023
//This is the Game Scene

class GameScene extends Phaser.Scene {
  // create an alien
  createAlien () {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 // this will get a number between 1 and 1920;
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 // this will get a number between 1 and 50;
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign in 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }
  
  constructor () {
    super({ key: "gameScene" })

    this.ship = null
    this.fireMissile = false
    this.score = 0
    this.scoreText = null
    this.highscore = 0
    this.highscoreText = null
    this.highscoreTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" }
    this.scoreTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" }
    this.gameOverTextStyle = { font: "65px Arial", fill: "#ff0000", align: "center" }
  }

  //Sets the color for the background
  init (data) {
    this.cameras.main.setBackgroundColor("#21618C")
  }

  preload () {
    //Message the console indicating that the gamescene is being loaded
    console.log("Game Scene")
    
    //Images
    this.load.image("starBackground", "assets/Bubble-Background.jpg")
    this.load.image("ship", "assets/pixel-spaceship.png")
    this.load.image("missile", "assets/missile.png")
    this.load.image("alien", "assets/pixel-ufo.png")
    //Sound
    this.load.audio("laser", "assets/laser1.wav")
    this.load.audio("explosion", "assets/barrelExploding.wav")
    this.load.audio("bomb", "assets/bomb.wav")
  }

  create (data) {
    //This is the code that puts the background image in the background
    this.background = this.add.image(0, 0, "starBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    //This is the code that puts the score and highscore text in their place
    this.scoreText = this.add.text(10, 10, "Score: " + this.score.toString(), this.scoreTextStyle)
    this.highscoreText = this.add.text(10, 100, "Highscore: " + this.highscore.toString(), this.highscoreTextStyle)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship")

    //create a group for the missiles
    this.missileGroup = this.physics.add.group()

    //create a group for the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    //Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
      alienCollide.destroy()
      missileCollide.destroy()
      this.sound.play("explosion")
      //This is the code that adds a score
      this.score = this.score + 1
      this.scoreText.setText("Score: " + this.score.toString())
      //This is the code that creates aliens on the death of an alien
      this.createAlien()
      this.createAlien()
    }.bind(this))

    // Collisions between ship and aliens
    this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
      this.sound.play('bomb')
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      //This is the code that makes the gameover scene and places it in the middle of the screen
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({ useHandCursor: true })
      
      //Added a highscore functionality
      if (this.highscore < this.score) {
        this.highscore = this.score
      }
      this.score = 0
      this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
    }.bind(this))
  }

  update (time, delta) {
    //The constants that allow the ship to move and shoot
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keyUpObj = this.input.keyboard.addKey("UP")
    const keyDownObj = this.input.keyboard.addKey("DOWN")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    //The code that makes the ship move to the left
    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
        this.ship.x = 1920
      }
    }

    //The code that makes the ship move to the right
    if (keyRightObj.isDown === true) {
      this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 0
      }
    }

    //The code that makes the ship move up
    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y > 1920) {
        this.ship.y = 1920
      }
    }

    //The code that makes the ship move down
    if (keyDownObj.isDown === true) {
      this.ship.y += 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false && this.gameOverText == null) {
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, "missile")
        this.missileGroup.add(aNewMissile)
        this.sound.play("laser")
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) {
        item.destroy()
      }
    })

    //The code that makes the aliens respawn
    this.alienGroup.children.each(function (item) {
      if (item.y > 1080) {
        item.destroy();
        this.createAlien();
      }
    }, this);
  }
}

export default GameScene
