util            = require("util")
EventEmitter    = require('events').EventEmitter


  util.inherits(AppFacade,EventEmitter) 
  function AppFacade() 
  {
      console.log("new AppFacade()") 
      this.init(null)
  }


  AppFacade.prototype.commands={}
  AppFacade.prototype.modules={}
  AppFacade.prototype.models={}

  AppFacade.prototype.registerCommand = function(notification,command){
    try{
    this.commands[notification]=command
    }catch(e){
      console.log("register ERR on ",notification,command," -> ",e)
    }
  }
  AppFacade.prototype.unregisterCommand = function(notification){
    delete this.commands[notification]
  }

  AppFacade.prototype.registerModule = function(notification,moduleinstance){
    try{
      if(this.modules[notification])
      {
        var m=this.modules[notification]
        m.dispose()
        delete this.modules[notification]
      }
      this.modules[notification]=moduleinstance
      this._attachModule(moduleinstance)
    }catch(e){
      console.log("register ERR on ",notification,moduleinstance," -> ",e)
    }
  }
  AppFacade.prototype._attachModule=function(m)
  {
    m.attach(this)
  }
  AppFacade.prototype.unregisterModule = function(notification){
    var m=this.commands[notification]
    if(!m)return
    delete this.commands[notification]
    m.dispose()
    m=null
  }

  AppFacade.prototype.dispose = function(){
   
   var key,o
    for(key in this.modules)
    {
      o=this.modules[key]
      if(o)
      {
        o.dispose()
        delete this.modules[key]

      }
    }
    o=null

    this.modules={}
    this.commands={}

  }
  AppFacade.prototype.init = function(opts){
    //override this to startup your AppFacade  
    this.emit('inited')
  }
  AppFacade.prototype.loadModules = function(config){
    //override this to startup your AppFacade  
    var key
    var modules_cfg=config.modules;
    var commands_cfg=config.commands;
    
    for(key in modules_cfg)
    {
      console.log("register module ",modules_cfg[key].notification)
      this.registerModule(modules_cfg[key].notification,modules_cfg[key].c)
    }

    for(key in commands_cfg)
    {
      console.log("register command ",commands_cfg[key].notification)
      this.registerCommand(commands_cfg[key].notification,commands_cfg[key].c)
    }
  }
  AppFacade.prototype.onDispose = function(){    
    
  }

  AppFacade.prototype.sendNotification = function(type,body){    
    if(this.commands[type])
      this.commands[type].execute(this,body)

    for(var m in this.modules)
    {
      try{
        this.modules[m].handleNotification(type,body)
      }catch(e){
        console.log("handleNotification err ",type,body,this)
      }
    }
  }

  module.exports  = AppFacade