EventEmitter    = require('events').EventEmitter = require('events').EventEmitter

util.inherits(SimModule,EventEmitter)

function SimModule() 
{

  if (!(this instanceof SimModule)) return new SimModule()
  console.log("new SimModule()") 

  var engine
  var view  
  
  this.engine = engine
  this.view   = view



}

  SimModule.prototype.attach = function(simengine,game,opts){
    this.engine=simengine
    this.game=game
    this.onAttach(opts)
  }

  SimModule.prototype.dispose = function(){
    
    this.onDispose()

    this.engine = null
    this.view   = null
  }
  SimModule.prototype.onAttach= function(opts){
    //override this to startup your SimModule  
    
  }
  SimModule.prototype.onDispose = function(){
    //override this to dispose your SimModule  
    
  }
  SimModule.prototype.handleNotification = function(type,body){    
    console.log("handleNotification - ",type,body," ",this)
  }
  SimModule.prototype.sendNotification = function(type,body){        
    this.engine.sendNotification(type,body)
  }

module.exports  = SimModule