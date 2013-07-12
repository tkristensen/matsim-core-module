// __dirname is the current working directory, we pass it in to
// the textures module and receive back the path from here to where
// the textures are located



var periodictabledata   = require('./data/mediumtable.json') //require('./data/default-periodic-table.json')
//require('./data/smalltable.json') 
var textures            = "http://commondatastorage.googleapis.com/voxeltextures/"
var texturePath         = './node_modules/painterly-textures/textures/';//require('painterly-textures')("./")
hsbutil                 = require('./lib/hsbutil.js')
var numElements=0
for(var element in periodictabledata)
{
    numElements++
}
//materials--elements--tempmaterials
var materials               = ['#000000','#FFFFFF', '#FF2200','#00C5FF']
var numMaterials            = materials.length
var matElementsCollection   = hsbutil.colorRange(   
        {h:360,s:100,v:50},
        {h:0,s:100,v:50},
        
        numElements
    )
var numTempMaterials        = 101
var tempmaterials           = hsbutil.colorRange(   
        {h:360,s:100,v:20},{h:360,s:100,v:100},
        
        numTempMaterials
    )

/* {h:360,s:100,v:90},
        {h:204,s:100,v:100},*/
console.log("numElements",numElements)
console.log("AAAA",tempmaterials.length,numTempMaterials)
console.log("BBBB",matElementsCollection.length,numElements)


var matStartIndxElements    = numMaterials+1
var matStartIndxTemp        = numMaterials+numElements+1

console.log("materials.len",materials.length)
console.log("add matElementsCollection",matElementsCollection.length)
materials                   = materials.concat(matElementsCollection)

console.log("materials.len",materials.length)
console.log("add tempmaterials",tempmaterials.length)
materials                   = materials.concat(tempmaterials)
console.log("materials.len",materials.length)

console.log("matElementsCollection.length", matElementsCollection.length    )
console.log("tempmaterials.length",         tempmaterials.length            )

console.log(texturePath)

console.log("FINAL materials.len",materials.length)

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


var worlddim=30

var opts = {
        sim_worlddim          : worlddim,
        periodic_table_data   : periodictabledata,

		texturePath           : '.'+texturePath,
        materialFlatColor     : true,
        palette               : materials,
        materials             : materials,
        numMaterials          : numMaterials,
        numTempMaterials      : numTempMaterials,
        matStartIndxElements  : matStartIndxElements,
        matStartIndxTemp      : matStartIndxTemp,
		generate              : function(x,y,z){
                                    var inside=(x>=-1 && x<=worlddim && z>=-1 && z<=worlddim )
                            		if(y==-1)
                                    {                                        
                                        return inside ? 2 : 1
                                    }else if(z==-3){
                                        if(x==-3){
                                            if(y>=2 && y<numElements+2){
                                              //  console.log("ele@",x,y,z,"=",(matStartIndxElements+y))
                                                return matStartIndxElements+y-2
                                            }else{
                                                return 0
                                            }
                                        }else if(x==-4){
                                            if(y>=2 && y<numTempMaterials+2){
                                                console.log("tmp@",x,y,z,"=",(matStartIndxTemp+y),materials[matStartIndxTemp+y])
                                                return matStartIndxTemp+y+2
                                            }else{
                                                return 0
                                            }
                                        }else{
                                            return 0
                                        }
                                    }else{
                                        return 0
                                    }
                                    return 0
                                }
            //( (z<20 && y<20 && x % 100==0) || y==1 ) ? Math.floor(Math.random() * 4) + 1 : 0// sphere world
  		}
	
/*else if(x==-51){
                                            if(z>=0 && z<numTempMaterials)
                                                return 5+numElements+z
                                            else
                                                return 1
                                        }*/

var UserInputModule         = require("./lib/modules/UserInputModule.js")
var VoxelAvatarModule       = require("./lib/modules/VoxelAvatarModule.js")

var AtomSprayCommand        = require("./lib/commands/AtomSprayCommand.js")
var SpeedToggleCommand      = require("./lib/commands/SpeedToggleCommand.js")
var CreateTestAtomCommand   = require("./lib/commands/CreateTestAtomCommand.js")
var TempToggleCommand       = require("./lib/commands/TempToggleCommand")
var ToggleAtomFilterCommand       = require("./lib/commands/ToggleAtomFilterCommand")

var facadeconfig    ={
    modules:[
        {notification:"userinput",          c:new UserInputModule()        }
        ,{notification:"avatar",            c:new VoxelAvatarModule()        }
    ],
    commands:[
        {notification:"spray_atoms",        c:new AtomSprayCommand()        }
        ,{notification:"speed_toggle",      c:new SpeedToggleCommand()     }
        ,{notification:"create_moveatom",   c:new CreateTestAtomCommand()   }
        ,{notification:"temp_incr",         c:new TempToggleCommand()       }        
        ,{notification:"filter_toggle",         c:new ToggleAtomFilterCommand()       }        
        ]
    }


var voxel 		= require('voxel')
var extend 		= require('extend')
var game 		= require('voxel-engine')(opts)

window.game = game // for debugging
game.appendTo("#container")


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
