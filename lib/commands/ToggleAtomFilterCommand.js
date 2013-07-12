util 		= require('util')
Command 	= require('./Command.js')

function ToggleAtomFilterCommand() 
{
  if (!(this instanceof ToggleAtomFilterCommand)) return new ToggleAtomFilterCommand()
  console.log("new ToggleAtomFilterCommand()") 
}

util.inherits(ToggleAtomFilterCommand,Command)

ToggleAtomFilterCommand.prototype.execute = function(engine,data){
  
	engine.atom_filter ++
	if(engine.atom_filter>2)
		engine.atom_filter=-1
}

module.exports  = ToggleAtomFilterCommand