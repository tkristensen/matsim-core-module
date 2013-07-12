util 		= require('util')
Command 	= require('./Command.js')

function TempToggleCommand() 
{
  if (!(this instanceof TempToggleCommand)) return new TempToggleCommand()
  console.log("new TempToggleCommand()") 
}

util.inherits(TempToggleCommand,Command)

TempToggleCommand.prototype.execute = function(engine,data){
  if(engine.floor_heat==0)
  	engine.floor_heat=100
  else engine.floor_heat *= 1.2
	if(engine.floor_heat>3000)
		engine.floor_heat=0
}

module.exports  = TempToggleCommand