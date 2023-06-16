/* global Phaser */

//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Mr. Coxall
//Edited by: Theo Rafuse
//Created on: Sep 2020
//Edited on: June 2023
//This is the Menu Scene

class MenuScene extends Phaser.Scene {
  constructor () {
    super({ key: "menuScene" })

    this.menuSceneBackgroundImage = null
    this.startButton = null
    this.instructionbutton = null
  }

  //This is the color for the background
  init (data) {
    this.cameras.main.setBackgroundColor("#21618C")
  }

  preload () {
    //Message the console indicating that the menuscene is being loaded
    console.log("Menu Scene")
    //Load the images for the background and the button
    this.load.image("menuSceneBackground", "assets/Black-hole-quasar-merger.jpg")
    this.load.image("startButton", "assets/start-button.png")
  }

  create (data) {
    //This is the code that places the background image in the center
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground')
    this.menuSceneBackgroundImage.x = 1920 / 2
    this.menuSceneBackgroundImage.y = 1080 / 2

    //This is the code that places the button image in the center
    this.startButton = this.add.sprite(1920 / 2, (1080 / 2), 'startButton')
    //This is the code that makes the button interactive
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton("game"))
  }

  update (time, delta) {
  }

  //This is the code to transition from the menuScene to the gameScene
  clickButton (value) {
    //It is coded to transition after interacting with the button
      this.scene.start('gameScene')
  }
}

export default MenuScene
