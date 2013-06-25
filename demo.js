// __dirname is the current working directory, we pass it in to
// the textures module and receive back the path from here to where
// the textures are located



var periodictabledata=require('./data/default-periodic-table.json')

var textures = "http://commondatastorage.googleapis.com/voxeltextures/"
var texturePath = './node_modules/painterly-textures/textures/';//require('painterly-textures')("./")
hsbutil            = require('./lib/hsbutil.js')
var numElements=0
for(var element in periodictabledata)
{
    numElements++
}
//blue->green->darkbrown
var materials=['#000000','#FFFFFF',
    '#FF2200','#00C5FF']
    var ccc=hsbutil.colorRange(   
        {h:0,s:100,v:50},
        {h:360,s:100,v:50},
        numElements
    )
var tempmaterials=hsbutil.colorRange(   
        {h:140,s:100,v:90},
        {h:360,s:100,v:90},
        numElements
    )
/*
    hsbutil.colorRange(   
        {h:0,s:100,v:Math.random()*100},
        {h:90,s:100,v:Math.random()*100},
        5
    ).concat(hsbutil.colorRange(   
        {h:90,s:100,v:Math.random()*100},
        {h:270,s:100,v:Math.random()*100},
        10
    )).concat(hsbutil.colorRange(   
        {h:270,s:100,v:Math.random()*100},
        {h:360,s:100,v:Math.random()*100},
        5
    ))
  */  /*hsbutil.colorRange(
   
    {h:210,s:90,v:100},
    {h:131,s:78,v:34},
    15
    ).concat(hsbutil.colorRange(
      {h:131,s:78,v:34},
      {h:43,s:40,v:25},    
    5
      ))*/
    ccc=ccc.reverse()
materials= materials.concat(ccc)
materials= materials.concat(tempmaterials)

console.log("materials",materials)

console.log(texturePath)
var worlddim=30

var opts = {
        sim_worlddim:worlddim,
        periodic_table_data:periodictabledata,

		texturePath: '.'+texturePath,
        materialFlatColor :true,
        palette:materials,
        materials: materials,
		//texturePath: texturePath,
		 generate: function(x,y,z) {
//|| y==2 && Math.random()>.5
            var inside=(x>=-1 && x<=worlddim && z>=-1 && z<=worlddim )
    		if(y==-1)
            {
                return inside ? 2 : 1

            }
            //( (z<20 && y<20 && x % 100==0) || y==1 ) ? Math.floor(Math.random() * 4) + 1 : 0// sphere world
  		},
	}

var UserInputModule=require("./lib/UserInputModule.js")
var AtomSprayCommand=require("./lib/commands/AtomSprayCommand.js")
var SpeedToggleCommand=require("./lib/commands/SpeedToggleCommand.js")
var CreateTestAtomCommand=require("./lib/commands/CreateTestAtomCommand.js")

var facadeconfig    ={
    modules:[
        {notification:"userinput",c:new UserInputModule()}
    ],
    commands:[
        {notification:"spray_atoms",c:new AtomSprayCommand()},
        {notification:"speed_toggle",c:new SpeedToggleCommand()}
        ,{notification:"create_moveatom",c:new CreateTestAtomCommand()},
    ]
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
avatar.yaw.position.set(-10, 14, -10)

var makeFly = fly(game)
var target 	= game.controls.target()
game.flyer 	= makeFly(target)




var SimEngine = require('./lib/SimEngine.js').engine
var simengine
try{
    simengine=new SimEngine(game,opts,facadeconfig)
}catch(e){
    console.log("ENGINE ERR",e)
}

if(simengine){
    simengine.play(32)
    console.log("READY")
}else{
    console.log("FAILED TO START")
}
