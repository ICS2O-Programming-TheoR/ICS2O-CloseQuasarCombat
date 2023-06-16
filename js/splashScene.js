/* global Phaser */

//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Mr. Coxall
//Edited by: Theo Rafuse
//Created on: Sep 2020
//Edited on: June 2023
//This is the Splash Scene

class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: "splashScene" })

    this.splashSceneBackgroundImage = null
  }

  //This is the color of the background in the beginning of the game
  init(data) {
    this.cameras.main.setBackgroundColor("#21618C")
  }

  preload() {
    //Message the console indicating that the splashscene is being loaded
    console.log("Splash Scene")
    //Load the image "splashSceneImage" for the background
    this.load.image("splashSceneBackground", "./assets/splashSceneImage.png")
  }

  create(data) {
    //This is the code that places the image in the center
    this.splashSceneBackgroundImage = this.add.sprite(0, 0, "splashSceneBackground")
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
  }

  //This is the code to transition from the splashScene to the titleScene
  update(time, delta) {
    //It is coded to transition after 3 seconds
    if (time > 3000) {
      this.scene.switch("titleScene")
    }
  }
}

export default SplashScene
