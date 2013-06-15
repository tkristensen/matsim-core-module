// a convenience function, usage:
// var SimEngine = require('voxel-SimEngine')(game)
// if we did module.exports = SimEngine then the usage would
// have to be:
// var SimEngine = require('voxel-SimEngine')
// var SimEngine = new SimEngine()
EventEmitter = require('events').EventEmitter
THREE        = require('three')
Atom         = require('./atom.js')
module.exports = function(game, opts) {
  return new SimEngine(game, opts)
}

// expose the SimEngine constructor so that it is available
// in case someone wants to access the .prototype methods, etc
module.exports.SimEngine = SimEngine

function SimEngine(game, opts) {

  // protect against people who forget 'new'
  if (!(this instanceof SimEngine)) return new SimEngine(game, opts)
  console.log("new SimEngine()",game,this); 
  
  SimEngine.prototype.__proto__ = EventEmitter.prototype;

  SimEngine.prototype.stop = function(){
   console.log("stop",game,this); 
   clearInterval(tickInterval)
  }

  SimEngine.prototype.tick = function(arg){
    if(this.dolog)
      console.log("se tick s",arg,this.atoms,this)
    
    if(this.atoms){
      var alen=this.atoms.length
      for (var i = alen; i >= 0; i--) {
        a=this.atoms.shift()
        if(a){ 
          a.move()
          this.atoms.push(a)
        }
      }
    }
    if(this.dolog)
      console.log("se tick e",this.atoms)

    this.emit('ticked',this)
  }


  SimEngine.prototype.mouseup = function(pos){
     console.log("m up"); 
     
  }
  SimEngine.prototype.mousedown = function(pos){
     console.log("m down"); 
     
  }
  SimEngine.prototype.command = function(cmdtype,cmdopts){
     console.log("exec:",this,cmdtype,cmdopts); 
     switch(cmdtype)
     {
      case "spray":
      {
        this.spray(cmdopts)
        break
      }
      case "cow":
      {
        stop()
        break
      }
      case "eggs":
      {
        this.dolog=!this.dolog
      }
     }
  }


  SimEngine.prototype.spray=function(cmdopts)
  {
     var p0=game.controls.target().avatar.position
    console.log(p0)
    var p1
    console.log(p1)
    console.log("spray()",this["atoms"],this)
    if(this.atoms==null)
    {
      atoms=[]
    }

    for (var i = 40; i >= 0; i--) {
      p1=[Math.floor(p0.x+(Math.random()*2)),Math.floor(p0.y)+i,Math.floor(p0.z)];
      var val=Math.floor(Math.random()*4)+2
      //console.log("create",p1,game.setBlock(p1, val))
      //console.log("created",p1,game.getBlock(p1))
      
     
      this.atoms.push( new Atom(game,p1,val) )
      
      
    };
    
    
  }
  

  SimEngine.prototype.init = function(options){
    console.log("init",this,this.tick); 

  }

  SimEngine.prototype.play = function(interval){
   console.log("play",game,this,SimEngine.prototype.tick,this["tick"])
    //game.on('tick', SimEngine.prototype.tick)
    
    game.on('mouseup',    SimEngine.prototype.mouseup)
    game.on('click',      SimEngine.prototype.mouseup)
    game.on('collision',  function(item){console.log("masdas collision") })
    game.on('mousedown',  function(pos){
     console.log("masdas up"); 
     })
    var pointer=this;
    this.tickInterval=game.setInterval( function(){pointer.tick()}, interval)
    console.log("play ok");
  }



  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  var game,opts,height,material,atoms,dolog;
  this.game = game
  this.opts = opts || {}
  this.height = this.opts.height || 5
  this.material = this.opts.material || 'brick'
  this.atoms=[]
  this.dolog=false;
    
  this.tick();

}
