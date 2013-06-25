// a convenience function, usage:
// var SimEngine = require('voxel-SimEngine')(game)
// if we did module.exports = SimEngine then the usage would
// have to be:
// var SimEngine = require('voxel-SimEngine')
// var SimEngine = new SimEngine()

util            = require('util')
EventEmitter    = require('events').EventEmitter
THREE           = require('three')

TickStack       = require("./queuetypes/TickStack.js")
LogicStack      = require("./queuetypes/LogicStack.js")

states          = require("./PhaseStates.js")
ModelMatrix     = require('./ModelMatrix.js')
AtomVO          = require('./atoms/AtomVO.js')
PeriodicTable   = require('./PeriodicTable.js')
AtomLogic       = require('./atoms/AtomLogic.js')

DIRECTIONS      = require("./Directions.js")
dircts          = require("./Directions.js").consts
diroffsets      = DIRECTIONS.diroffsets
neigbourOffsets = DIRECTIONS.neigbourOffsets

SimModule       = require("./SimModule.js")
UserInputModule = require("./UserInputModule.js")

AppFacade       = require('./AppFacade.js')

module.exports  = {engine:SimEngine}

// expose the SimEngine constructor so that it is available
// in case someone wants to access the .prototype methods, etc
module.exports.SimEngine = SimEngine


function SimEngine(game, opts, facadeconfig) {

  // protect against people who forget 'new'
  if (!(this instanceof SimEngine)) return new SimEngine(game, opts, facadeconfig)
  console.log("new SimEngine()",game,this); 


  

  var game,opts,height,material,atoms,dolog,dim,xoff,yoff;
  this.game       = game
  this.opts       = opts || {}
  this.dim        = opts.sim_worlddim ? opts.sim_worlddim : 16
  this.height     = this.opts.height || 5
  this.material   = this.opts.material || 'brick'
  this.atoms      = []
  this.dolog      = false;
  this.tex_indx_start = 4
  this.xoff=0
  
  this.palette        = this.opts.hasOwnProperty('palette')? this.opts.palette : []
  this.periodicTable  = new PeriodicTable()
  this.periodicTable.loadTable(opts.periodic_table_data)
  this.numElements=this.periodicTable.numElements

  var ptr=this;
  console.log("SimEngine - make mdl");
  try{
    this.model          = new ModelMatrix(this.dim,this.dim,this.dim)
    this.model.on('set',function(data){ptr.handleModelSetEvent(data)})
  }catch(e){
    console.log("SimEngine - make mdl - ERR",e);
  }

  try{
    
    this.atom_logic     = new AtomLogic(this.game,this,this.model)
    this.atoms_stack    = new LogicStack([],this.ticks_per_update,this.atom_logic)
  }catch(e){
    console.log("SimEngine - make logic - ERR",e);
  }
  //this.newBoundsFence(2)  
  try{
    game.on('mouseup',    SimEngine.prototype.mouseup)
    game.on('click',      SimEngine.prototype.mouseup)

    game.on('collision',  function(item){console.log("masdas collision") })
    game.on('mousedown',  function(pos){
      console.log("masdas up"); 
    })
  }catch(e){
    console.log("SimEngine - make event listeners - ERR",e);
  }

  try{
    this.loadModules(facadeconfig)
  }catch(e){
    console.log("SimEngine.loadModules() err",e); 

  }

  //this.tick()
  //this.spawnLayer(2)  
  
}

util.inherits(SimEngine,AppFacade)

SimEngine.prototype._attachModule=function(m)
{
  m.attach(this,this.game)
}

SimEngine.prototype.stop = function(){
   console.log("stop",game,this); 
   clearInterval(tickInterval)
}

SimEngine.prototype.ticks_per_update=100;
SimEngine.prototype.tick = function(arg){
  var v=this.atoms_stack.timesTicked
  this.atoms_stack.tick(this.ticks_per_update)
  if(this.atoms_stack.timesTicked<v)
  {
    console.log("tickfail")
  }
  /*if(Math.random()>.9)
    {
      var rnd=this.atoms_stack.getRnd()
      if(rnd)
        rnd.temp+=1000000
    }*/
  //this.emit('ticked',this)
}


SimEngine.prototype.mouseup = function(pos){
   console.log("m up"); 
   
}
SimEngine.prototype.mousedown = function(pos){
   console.log("m down"); 
   
}

SimEngine.prototype.spawnLayer = function(ys,t){
   var x=0,y=0,z=0
   var p
   var val
   for(y=0;y<12;y++){
   for(x=0;x<this.dim;x++){
    for(z=0;z<this.dim;z++){
      p=[x,y,z]
    
      if(Math.random()>.5 && this.model.isEmptyAtP(p))
       this.atoms_stack.add( this.getAtom(p) )
   
    }
   }}
   
}


SimEngine.prototype.newBoundsFence=function(height)
{
  var x=0,y=1,z=0
  for(x=0;x<this.model.xdim;x++)
  {
    for(z=0;z<this.model.zdim;z++)
    {
      console.log("new f:",x,y,z)
      this.getAtom([x,y,z])
    }
  }
}
SimEngine.prototype.addAtom=function(a){
  this.atoms_stack.add(a)
}
SimEngine.prototype.getAtom=function(pos,element)
{
  //AtomVO(element_index,position,temp,phase_state)
  return new AtomVO(this.periodicTable.getRndElementIndex(), pos, 0, states.SOLID )
}
SimEngine.prototype.spray=function(cmdopts)
{
   
  
}


SimEngine.prototype.init = function(worlddim){
  this.dim=worlddim
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
SimEngine.prototype.drawmode=true
SimEngine.prototype.handleModelSetEvent = function(data,obj){ 


   this.game.setBlock(
    [
      (data[0][0]+this.xoff)%this.dim,
      data[0][1],
      data[0][2]
      ],
    data[1]?data[1].drawVal:0
    )
}  

// we need to store the passed in variables on 'this'
// so that they are available to the .prototype methods





