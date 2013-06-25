states          = require("./PhaseStates.js")

DIRECTIONS      = require("./Directions.js")
dircts          = require("./Directions.js").consts

hdirs           = require("./Directions.js").horizConstsArr

module.exports = Atom


function Atom(game,space,position, element) {
  // protect against people who forget 'new'
  if (!(this instanceof Atom)) return new Atom(game,space,position, element)
 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods
  this.id       = this._id++;
  
  this.game     = game
  this.space    = space
  

  this.space.setAtP(this.position,this)
  //console.log("new a: val:",this.val,"dv:",this.drawVal,"w:",element ? element.weight/20 : -1)
}
Atom.prototype._id=0;
Atom.prototype.p = function(){console.log("atm(",this.id,"):",arguments)}

Atom.prototype.updateTemp = function(){
  var nbs=this.space.getNeighboursAt(this.position[0],this.position[1],this.position[2])
  var o
 
  var nnbs_len=nbs.length
  var tt=this.temp*this.element.thermCond
  var tempShare=tt/nnbs_len
  for (var i = nbs.length - 1; i >= 0; i--) {
    (nbs[i]) ? nbs[i].temp+=tempShare : null
  }
 
   this.temp=this.temp-tt
}
Atom.prototype.updateState = function()
{
  if(this.position[1]<2)
    this.temp+=1+(Math.random()*14)
  var t=this.temp/(this.element.weight*4)
  if(t>this.element.tempGas){
    this.state=2
     //this.drawVal=4
  }else if(t>this.element.tempLiquid){
    this.state=1
     //this.drawVal=3
  }else{
    this.state=0
      }
     this.drawVal=this.val+5 //this.drawVal=5+Math.max(0,Math.min(20,( (this.temp/600)*20)))//
  
/*this.drawVal=5+Math.floor(
    (Math.max(0,Math.min(600, this.temp ))/600)*20
  ) //this.val+4  
*/
    
  
}
Atom.prototype.move = function(){
  //this.p("a.move() ",this,"|||",this["position"],"|||")
  
  try{
    this.updateTemp()

  }catch(e){
    console.log("temperr ",e)
  }
  this.temp*=.99
  try{
    this.updateState()

  }catch(e){
    console.log("staterr ",e)
  }

      
  var cb

//

  //this.game.setBlock(this.position,0) 
 //console.log(this.state,this.drawVal,states.GAS)
  if(this.temp>this.element.tempGas)//this.state==2)
  {
    cb=this.getInDirection(Math.random()*.5?dircts.TOP:dircts.BOTTOM);
    if(this.position[1]<31){
      if(!cb){
        this.moveTo(dircts.TOP)          
      }else if(cb && this.element<cb.element  ){
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

    if(cb && this.element.weight>cb.element.weight  )
    {
      this.swapWith(dircts.BOTTOM)
      
    }else{
    //this.position[1]=100
    
      var c=Math.random();
      
      
      if(this.state==1 || c>this.element.erodeF ){
        var d=hdirs[Math.floor(Math.random()*hdirs.length)]
        if(this.canMove(d)){
          this.moveTo(d)
        }        
      }
    }

   // this.position[2]+=Math.floor((Math.random()*10))-5;
    //this.position[0]+=Math.floor((Math.random()*10))-5;
  }


 // console.log("@",this.id,this.position[0],this.position[1],this.position[2])
//  this.game.setBlock(this.position,this.element)
  

}


Atom.prototype.element=1
Atom.prototype.toString=function(){return "atm(",this.id,"):"+this.position}
