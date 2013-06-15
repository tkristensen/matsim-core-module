// __dirname is the current working directory, we pass it in to
// the textures module and receive back the path from here to where
// the textures are located

var textures = "http://commondatastorage.googleapis.com/voxeltextures/"
var texturePath = './node_modules/painterly-textures/textures/';//require('painterly-textures')("./")

console.log(texturePath)
var toolbar = require('toolbar')
var opts = {
		texturePath: '.'+texturePath,
    materials: [
    'crate',
    'alphatex0',
    'panorama0',
    'panorama1',
    'panorama2',
    'panorama3',
    'grass', 'brick', 'dirt', 'obsidian'],
		//texturePath: texturePath,
		 generate: function(x,y,z) {
//|| y==2 && Math.random()>.5
    		return y==0;//( (z<20 && y<20 && x % 100==0) || y==1 ) ? Math.floor(Math.random() * 4) + 1 : 0// sphere world
  		},
	}


var highlight 	= require('voxel-highlight')
var player 		= require('voxel-player')
var voxel 		= require('voxel')
var extend 		= require('extend')
var fly 		= require('voxel-fly')
var walk 		= require('voxel-walk')
var game 		= require('voxel-engine')(opts)
//game.materials.load(['grass', 'dirt', 'grass_dirt','brick', 'dirt'])


window.game = game // for debugging
game.appendTo("#container")

var createPlayer = player(game)

// create the player from a minecraft skin file and tell the
// game to use it as the main player
var avatar = createPlayer(opts.playerSkin || 'player.png')
avatar.possess()
avatar.yaw.position.set(2, 14, 4)

var makeFly = fly(game)
var target 	= game.controls.target()
game.flyer 	= makeFly(target)




var simengine = require('./').SimEngine(game)
simengine.init()
simengine.play(32)

var hudview=require("./lib/SimHUDView.js")(game,opts,simengine,toolbar)
toolbar('.bar-tab').on('select', function(selected) {
  simengine.command(selected);
})