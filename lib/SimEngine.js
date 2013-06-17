// a convenience function, usage:
// var SimEngine = require('voxel-SimEngine')(game)
// if we did module.exports = SimEngine then the usage would
// have to be:
// var SimEngine = require('voxel-SimEngine')
// var SimEngine = new SimEngine()
states          = require("./PhaseStates.js")
util            = require('util')
EventEmitter = require('events').EventEmitter
THREE        = require('three')
Atom         = require('./atom.js')
ModelMatrix  = require('./ModelMatrix.js')
TickStack    = require("./TickStack.js")
DIRECTIONS      = require("./Directions.js")
dircts=require("./Directions.js").consts

diroffsets      = DIRECTIONS.diroffsets
neigbourOffsets = DIRECTIONS.neigbourOffsets

module.exports = function(game, opts) {
  return new SimEngine(game, opts)
}

// expose the SimEngine constructor so that it is available
// in case someone wants to access the .prototype methods, etc
module.exports.SimEngine = SimEngine
util.inherits(SimEngine,EventEmitter)
function SimEngine(game, opts) {

  // protect against people who forget 'new'
  if (!(this instanceof SimEngine)) return new SimEngine(game, opts)
  console.log("new SimEngine()",game,this); 
  
  

  SimEngine.prototype.stop = function(){
   console.log("stop",game,this); 
   clearInterval(tickInterval)
  }
  SimEngine.prototype.tstep=100;
  SimEngine.prototype.tick = function(arg){
    this.atoms_stack.tick(this.tstep)
    if(Math.random()>.99)
      {
        var rnd=this.atoms_stack.getRnd()
        if(rnd)rnd.temp+=1000
      }
    this.emit('ticked',this)
  }


  SimEngine.prototype.mouseup = function(pos){
     console.log("m up"); 
     
  }
  SimEngine.prototype.mousedown = function(pos){
     console.log("m down"); 
     
  }

  SimEngine.prototype.spawnLayer = function(ys,t){
     var x=0,y=ys,z=0
     var p
     var val
     for(x=0;x<this.dim;x++){
      for(z=0;z<this.dim;z++){
        p=[x,y,z]
        val=Math.floor(Math.random()*6)+4
        if(this.model.isEmptyAtP(p))
         this.atoms_stack.add( this.newA(p,val) )
     
      }
     }
     
  }
  SimEngine.prototype.command = function(cmdtype,cmdopts){
     console.log("exec:",this,cmdtype,cmdopts); 
     switch(cmdtype)
     {
      case "spray":
      {
        this.spray(12)
        break
      }
      case "cow":
      {
        this.spray(4)
        break
      }
      case "eggs":
      {
        this.tstep= this.tstep==3000 ? 10 : 3000;
        break
      }
      case "poptart":
      {
        
        break;
      }
     }
  }

  SimEngine.prototype.newBoundsFence=function(height)
  {
    var x=0,y=1,z=0
    for(x=0;x<this.model.xdim;x++)
    {
      for(z=0;z<this.model.zdim;z++)
      {
        console.log("new f:",x,y,z)
        this.newA([x,y,z],0)
      }
    }
  }

  SimEngine.prototype.newA=function(pos,val)
  {
   // console.log("new a v=",val)
    return new Atom(this.game,this.model,pos,val)
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

    for (var x= 4; x >= 0; x--) {
    for (var z = 4; z >= 0; z--) {
      for (var y = 20; y >= 10; --y) {
      p1=[
        Math.floor(p0.x+x),
        Math.floor(p0.y+y),
        Math.floor(p0.z+z+10)
      ];
      var val=Math.floor(Math.random()*cmdopts)
      //var dirs=[dircts.WEST,dircts.EAST,dircts.NORTH,dircts.SOUTH]
      //console.log("create",p1,game.setBlock(p1, val))
      //console.log("created",p1,game.getBlock(p1))
      
     if(this.model.isEmptyAtP(p1))
      this.atoms_stack.add( this.newA(p1,val) )
      
      
    }
    }}
    
    
  }
  

  SimEngine.prototype.init = function(options){
    console.log("init",this,this.tick); 

  }

  SimEngine.prototype.play = function(interval){
   console.log("SimEngine.play()");
    //game.on('tick', SimEngine.prototype.tick)
    
    
    var pointer=this;
    this.tickInterval=game.setInterval( function(){pointer.tick()}, interval)
    console.log("SimEngine.play() ok");
  }

  SimEngine.prototype.testwrite = function(d,p,m,str){
      var tn=DIRECTIONS.move(d,p)
      m.setAtP(tn,str)
      console.log("get:",m.getAtP(tn))

  }
  SimEngine.prototype.testSuite = function(d,p,m,str){
    var m=this.model;
      console.log("SimEngine - make mdl ok");
      m.setAt(200,200,200,666)
      console.log("get ",this.model.getAt(200,200,200))
      
      m.setAt(1023,1023,1023,666)
      console.log("get ",this.model.getAt(1023,1023,1023))
      
      var tx=100;var ty=100;var tz=100;
      var tp=[tx,ty,tz]
      var tn;

      this.model.setAtP(tp,"CENTER")
      this.testwrite(dircts.TOP,tp,m,"top")
      this.testwrite(dircts.BOTTOM,tp,m,"btm")
      this.testwrite(dircts.NORTH,tp,m,"nth")
      this.testwrite(dircts.SOUTH,tp,m,"sou")
      this.testwrite(dircts.WEST,tp,m,"wes")
      this.testwrite(dircts.EAST,tp,m,"eas")



      console.log("NEIGHBOURS",m.getNeighboursAt(tx,ty,tz))
      console.log("C:",m.getAtP(tp))
      console.log("swap s")
      m.swapAt(tp,DIRECTIONS.move(dircts.TOP,tp))
      console.log("swap e")
      console.log("NEIGHBOURS AFTER SWAP ",m.getNeighboursAt(tx,ty,tz))
      console.log("C:",m.getAtP(tp))

      console.log("get ",this.model.getAt(1023,1023,1023))
  }  

 SimEngine.prototype.handleModelSetEvent = function(data,obj){
    //console.log("see set",data,this)
    
    

     this.game.setBlock(data[0],data[1]?data[1].drawval:0)
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
  this.tex_indx_start=4
  
  var ptr=this;
  this.dim=32
  console.log("SimEngine - make mdl");
  this.model=new ModelMatrix(this.dim,this.dim,this.dim)
  this.model.on('set',function(data){ptr.handleModelSetEvent(data)})


  this.atoms_stack=new TickStack([])
  //this.newBoundsFence(2)  
  game.on('mouseup',    SimEngine.prototype.mouseup)
  game.on('click',      SimEngine.prototype.mouseup)

  game.on('collision',  function(item){console.log("masdas collision") })
  game.on('mousedown',  function(pos){
    console.log("masdas up"); 
  })

  this.tick()
  this.spawnLayer(2)

}

