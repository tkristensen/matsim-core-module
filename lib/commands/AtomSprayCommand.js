util 		= require('util')
Command 	= require('./Command.js')

function AtomSprayCommand() 
{
  if (!(this instanceof AtomSprayCommand)) return new AtomSprayCommand()
  console.log("new AtomSprayCommand()") 
}

util.inherits(AtomSprayCommand,Command)

AtomSprayCommand.prototype.execute = function(engine,data){
  console.log("AtomSprayCommand.execute()",engine,data) 
  var numAtoms=!isNaN(data) ? parseInt(data) : 10
  var p0=engine.game.controls.target().avatar.position
  var p1,val
  var m=engine.model
  	for (var x= 6; x >= 0; x--){
		for (var z = 6; z >= 0; z--){
    		for (var y = engine.dim; y >= engine.dim-6; y--){
			    p1=[
			      Math.floor(p0.x+x),
			      Math.floor(p0.y+y),
			      Math.floor(p0.z+z)
			    ];
			    val=Math.floor(Math.random()*numAtoms)
 
			    //var dirs=[dircts.WEST,dircts.EAST,dircts.NORTH,dircts.SOUTH]
			    //console.log("create",p1,game.setBlock(p1, val))
			    //console.log("created",p1,game.getBlock(p1))
			    
			   	if(m.isEmptyAtP(p1))
			   		engine.addAtom( engine.getAtom(p1) )			    
  			}
  		}
	}
			  


}

module.exports  = AtomSprayCommand