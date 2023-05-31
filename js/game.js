/* global Phaser */

//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Mr. Coxall
//Edited by: Theo Rafuse
//Created on: Sep 2020
//Edited on: June 2023
//This is the Phaser3 configuration file

//scene import statements
import SplashScene from "./splashScene.js"

//create the new scenes
const splashScene = new SplashScene()

/**
* Start Phaser Game.
*/
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  //set background color
  backgroundColor: "#b7b7a4",
  scale: {
    mode: Phaser.Scale.FIT,
    //we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
}

const game = new Phaser.Game(config)
//console.log(game)

//load scenes
//Note: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)

//the start scene
game.scene.start("splashScene")