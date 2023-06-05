/* global Phaser */

//Copyright (c) 2020 Mr. Coxall All rights reserved
//
//Created by: Mr. Coxall
//Edited by: Theo Rafuse
//Created on: Sep 2020
//Edited on: June 2023
//This is the Game Scene

class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: "gameScene" })
  }

  init (data) {
    this.cameras.main.setBackgroundColor("#21618C")
  }

  preload () {
    console.log("Game Scene")
  }

  create (data) {
  }

  update (time, delta) {
  }
}

export default GameScene
