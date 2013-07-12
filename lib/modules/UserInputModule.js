util      		= require('util')
toolbar    		= require('toolbar')
EventEmitter  = require('events').EventEmitter
SimModule		  = require('./SimModule.js')
UserInputView = require("./UserInputView.js")



function UserInputModule() 
{	
	if (!(this instanceof UserInputModule)) return new UserInputModule()
	//SimModule.call(this);
	
	
	console.log("new UserInputModule()",this) 

}
util.inherits(UserInputModule,SimModule)
	
		
	
UserInputModule.prototype.onAttach = function(simengine,opts){
	try{
		this.hudview=new UserInputView(this.engine)	
	}catch(e){
		console.log('userinput err',e)
	}

	try{
		var ptr=this
		this.toolbar=new toolbar('.bar-tab')
		this.toolbar.on('select', function(selected) {
			  ptr.command(selected)
			})
		}catch(e){
			console.log("attch err:",selected); 		
	}
}


UserInputModule.prototype.command = function(cmdtype,cmdopts)
{
     console.log("exec:",this,cmdtype,cmdopts); 
     switch(cmdtype)
     {
      case "spray":
      {	        
        this.sendNotification("spray_atoms",100)
        break
      }
      case "cow":
      {
         this.sendNotification("spray_atoms",100)
        break
      }
      case "eggs":
      {
      	 this.sendNotification("speed_toggle")	        
        break
      }
      case "poptart":
      {
         this.sendNotification("create_moveatom")
        break;
      }
      case "toast":
      {
         this.sendNotification("temp_incr")
        break;
      }
      case "filter":
      {
         this.sendNotification("filter_toggle")
        break;
      }
    }
}

UserInputModule.prototype.spray = function(n)
{
	console.log("UserInputModule.spray ",n)
}



module.exports 	= UserInputModule