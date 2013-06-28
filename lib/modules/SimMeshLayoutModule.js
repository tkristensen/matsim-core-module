util			= require('util')
EventEmitter 	= require('events').EventEmitter
SimModule		= require('./SimModule.js')



function SimMeshLayoutModule() 
{	
	if (!(this instanceof SimMeshLayoutModule)) return new SimMeshLayoutModule()
	//SimModule.call(this);
	
	
	console.log("new SimMeshLayoutModule()",this) 

}
util.inherits(SimMeshLayoutModule,SimModule)
	
		
	
SimMeshLayoutModule.prototype.onAttach = function(simengine,opts){
	try{
		
	}catch(e){
		console.log('userinput err',e)
	}

	try{
		
		}catch(e){
			console.log("attch err:",selected); 		
	}
}


SimMeshLayoutModule.prototype.command = function(cmdtype,cmdopts)
{
     console.log("exec:",this,cmdtype,cmdopts); 
     switch(cmdtype)
     {
      case "":
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
      
    }
}

SimMeshLayoutModule.prototype.spray = function(n)
{
	console.log("SimMeshLayoutModule.spray ",n)
}



module.exports 	= SimMeshLayoutModule