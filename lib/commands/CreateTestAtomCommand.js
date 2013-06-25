

util 		= require('util')
Command 	= require('./Command.js')
//MoveAtom 	= require('./../MoveAtom.js')
function CreateTestAtomCommand() 
{
  if (!(this instanceof CreateTestAtomCommand)) return new CreateTestAtomCommand()
  console.log("new CreateTestAtomCommand()") 
}

util.inherits(CreateTestAtomCommand,Command)

CreateTestAtomCommand.prototype.execute = function(engine,data){
  console.log("CreateTestAtomCommand.execute()",engine,data) 
  /*var numAtoms=!isNaN(data) ? parseInt(data) : 10
  var p0=engine.game.controls.target().avatar.position
  var p1,val
  var m=engine.model
  
  var a=new MoveAtom()
  engine.addAtom(a)	  
*/
	//this.engine.xoff+=3
	engine.drawmode=!engine.drawmode
}

module.exports  = CreateTestAtomCommand