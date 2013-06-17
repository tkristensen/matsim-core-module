// __dirname is the current working directory, we pass it in to
// the textures module and receive back the path from here to where
// the textures are located

var textures = "http://commondatastorage.googleapis.com/voxeltextures/"
var texturePath = './node_modules/painterly-textures/textures/';//require('painterly-textures')("./")

console.log(texturePath)
var toolbar = require('toolbar')
var opts = {
		texturePath: '.'+texturePath,
        materialFlatColor :true,
    materials: [
    
    //'alphatex0',
    '#445566','#1133CC',
    '#00C5FF','#FFC500',
    
    '#FFFFFF',
    '#ECECFF',
    '#CCCCFF',
    '#999999',
    '#666666',
    '#333333',    
    '#222222',    
    '#111111',    
    '#000000'
    ],
		//texturePath: texturePath,
		 generate: function(x,y,z) {
//|| y==2 && Math.random()>.5
            var inside=(x>0 && x<100 && z>0 && z<100 )
    		if(y==-1)
            {
                return inside ? 2 : 1

            }else if((y>-1 && y<5) && (x==0 || x==100 || z==0 || z==100)){

            }
            //( (z<20 && y<20 && x % 100==0) || y==1 ) ? Math.floor(Math.random() * 4) + 1 : 0// sphere world
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