util 		= require('util')
Command 	= require('./Command.js')

function SpeedToggleCommand() 
{
  if (!(this instanceof SpeedToggleCommand)) return new SpeedToggleCommand()
  console.log("new SpeedToggleCommand()") 
}

util.inherits(SpeedToggleCommand,Command)

SpeedToggleCommand.prototype.execute = function(engine,data){
  
	engine.ticks_per_update = engine.ticks_per_update == 3000 ? 10 : 3000 
}

module.exports  = SpeedToggleCommand