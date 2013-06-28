util 		= require('util')
Command 	= require('./Command.js')

function TempToggleCommand() 
{
  if (!(this instanceof TempToggleCommand)) return new TempToggleCommand()
  console.log("new TempToggleCommand()") 
}

util.inherits(TempToggleCommand,Command)

TempToggleCommand.prototype.execute = function(engine,data){
  
	engine.floor_heat += engine.floor_heat < 10000 ? 100 : -engine.floor_heat 
}

module.exports  = TempToggleCommand