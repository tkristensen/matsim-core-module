states          = require("./PhaseStates.js")

DIRECTIONS      = require("./Directions.js")
dircts          = require("./Directions.js").consts

hdirs           = require("./Directions.js").horizConstsArr

module.exports = function(game,space,position, val) {
  return new Atom(game,space,position, val)}


function Atom(game,space,position, val) {

  Atom.prototype._id=0;
  Atom.prototype.p = function(){console.log("atm(",this.id,"):",arguments)}

  Atom.prototype.updateTemp = function(){
    var nbs=this.space.getNeighboursAt(this.position[0],this.position[1],this.position[2])
    var o
   
    var nnbs_len=nonNullNbs.length
    var tt=this.temp*this.tempCond
    var tempShare=tt/nnbs_len
    for (var i = nbs.length - 1; i >= 0; i--) {
      (nbs[i]) ? nbs[i].temp+=tempShare : null
    }
    
    this.temp=Math.max(0,Math.min(2000,this.temp-tt))
  }
  Atom.prototype.updateState = function()
  {
    var t=this.temp/this.val
    if(t>400){
      this.state=states.GAS
      this.drawval=3
    }else if(t>200){
      this.state=states.LIQUID    
      this.drawval=2
    }else{
      this.state=states.SOLID
      this.drawval=this.val
    }
      

      
    
  }
  Atom.prototype.move = function(){
    //this.p("a.move() ",this,"|||",this["position"],"|||")
    
    try{
      this.updateTemp()
      this.updateState()
    }catch(e){}
    var cb
    this.temp*=.993
  //
  
    //this.game.setBlock(this.position,0)  
    if(this.temp>400)//==states.GAS)
    {
      cb=this.getInDirection(dircts.TOP);
      if(this.position[1]<31){
        if(!cb){
          this.moveTo(dircts.TOP)          
        }else if(cb && this.val<cb.val  ){
          this.swapWith(dircts.TOP)        
        }
     
      }
         var d1=hdirs[Math.floor(Math.random()*hdirs.length)]
              if(this.canMove(d1)){
                this.moveTo(d1)
              }
        return
    }
    cb=this.getInDirection(dircts.BOTTOM);
    if(!cb && this.position[1]>0){
      this.moveTo(dircts.BOTTOM)
    }else {

      if(cb && this.val>cb.val  )
      {
        this.swapWith(dircts.BOTTOM)
        
      }else{
      //this.position[1]=100
      
        var c=Math.random();
        var v=this.val;
        if( (v<6) ||
            (c>.98) ){
            var d=hdirs[Math.floor(Math.random()*hdirs.length)]
            if(this.canMove(d)){
              this.moveTo(d)
          }        
        }
      }

     // this.position[2]+=Math.floor((Math.random()*10))-5;
      //this.position[0]+=Math.floor((Math.random()*10))-5;
    }
    if(this.position[1]<2)
      this.temp+=1

   // console.log("@",this.id,this.position[0],this.position[1],this.position[2])
  //  this.game.setBlock(this.position,this.val)
    

  }
  
  Atom.prototype.offsetPos=function(dir)
  {
    return DIRECTIONS.move(dir,this.position)
  }  
  Atom.prototype.canMove=function(dir)
  {
    return space.isEmptyAtP(this.offsetPos(dir))
  } 
   Atom.prototype.getInDirection=function(dir)
  {
    return space.getAtP(this.offsetPos(dir))
  }  
  Atom.prototype.moveTo=function(dir)
  {
    this.clearPos()
    this.position=this.offsetPos(dir);
    return this.space.setAtP(this.position,this)
  }  
  Atom.prototype.clearPos=function(){this.space.setAtP(this.position,0)}
  Atom.prototype.swapWith=function(dir)
  {
    this.space.swapAt(this.position,this.offsetPos(dir))
    
    
  }  
  Atom.prototype.collisionBelow=function()
  {
    return this.space.getAtP(offsetPos(dircts.BOTTOM,this.position))
  }
  Atom.prototype.collisionBelow=function()
  {
    return this.space.getAtP(this.position)
  }
  Atom.prototype.val=1
  Atom.prototype.toString=function(){return "atm(",this.id,"):"+this.position}

  // protect against people who forget 'new'
  if (!(this instanceof Atom)) return new Atom(game,space,position, val)
 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods
  this.id       = this._id++;
  
  this.game     = game
  this.space    = space
  
  this.position = position
  this.val      = val
  this.drawval  = val
  this.temp     = 200+(Math.random()*300)
  this.tempCond = .17+(Math.random()*.1)

  this.state    = states.SOLID

  this.space.setAtP(this.position,this)
}
