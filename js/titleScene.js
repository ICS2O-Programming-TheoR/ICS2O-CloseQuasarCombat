/* global Phaser */

//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Mr. Coxall
//Edited by: Theo Rafuse
//Created on: Sep 2020
//Edited on: June 2023
//This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: "140px Trebuchet", fill: "#f8bc04", align: "center" }
  }

  //This is the color of the background
  init (data) {
    this.cameras.main.setBackgroundColor("#21618C")
  }

  preload () {
    //Message the console indicating that the titlescene is being loaded
    console.log("Title Scene")
    //Load the background image used for the titlescene
    this.load.image("titleSceneBackground", "assets/quasar.jpg")
  }

  create (data) {
    //This is the code that places the background image in the center
    this.titleSceneBackgroundImage = this.add
      .sprite(0, 0, "titleSceneBackground")
      .setScale(2.75)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2

    //This is the code that places the titlescene text at the bottom of the screen
    this.titleSceneText = this.add
    .text(1920 / 2, (1080 / 2) + 350, "Close Quasar Combat", this.titleSceneTextStyle)
    .setOrigin(0.5)
  }

  //This is the code to transition from the titleScene to the menuScene
  update (time, delta) {
    //It is coded to transition after 4.5 seconds
    if (time > 4500) {
      this.scene.switch("menuScene")
    }
  }
}

export default TitleScene
