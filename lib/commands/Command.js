function Command() 
{

  if (!(this instanceof Command)) return new Command()
  console.log("new Command()") 
}

Command.prototype.execute = function(engine,data){
  
}

module.exports  = Command