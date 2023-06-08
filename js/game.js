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
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"

//Our game scenes
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()

//* Game Scene */
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  //set background color
  backgroundColor: "#21618C",
  scale: {
    mode: Phaser.Scale.FIT,
    //we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

const game = new Phaser.Game(config)

//load scenes
//Note: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameScene", gameScene)

//the start scene
game.scene.start("splashScene")
