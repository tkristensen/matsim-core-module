util            = require('util')
ThreeDCellLogic   = require('./ThreeDCellLogic.js')
states          = require("./../PhaseStates.js")

DIRECTIONS      = require("./../Directions.js")
dircts          = require("./../Directions.js").consts

hdirs           = require("./../Directions.js").horizConstsArr
alldirs           = require("./../Directions.js").directionsArr

module.exports = AtomLogic


function AtomLogic(game,engine,space) {
  // protect against people who forget 'new'
  if (!(this instanceof AtomLogic)) return new AtomLogic(game,space,position, element)
 
  this.game     = game
  this.engine   = engine
  this.space    = space
  this.data     = null //AtomVO
  this.lastDataIndex=-1
}

util.inherits(AtomLogic,ThreeDCellLogic)

AtomLogic.prototype.p = function(){console.log("atm(",this.id,"):",arguments)}

AtomLogic.prototype.updateTemp = function(){
  
  if(isNaN(this.data.temp))
  {
    this.data.temp=0    
  }

  this.diffuseToBlurredNeighbours()
  
 //   console.log("temp ",this.data.temp)
}

AtomLogic.prototype.diffuseToDirectNeighbours = function(){
  var p=this.data.position
  var nbs=this.space.getNeighboursAt(p[0],p[1],p[2])
  var o
 
  var nnbs_len    = nbs.length
  var tt          = this.data.temp*this.element.thermal_conductivity
  var tempShare   = tt/nnbs_len
  for (var i = nbs.length - 1; i >= 0; i--) {
    (nbs[i]) ? nbs[i].temp+=tempShare : null
  }
 
   
   this.data.temp=isNaN(this.data.temp) ? 0 : 
    Math.max(0,Math.min(1000000000,this.data.temp-tt))
}
AtomLogic.prototype.diffuseToBlurredNeighbours = function(){
  var p=this.data.position
  var nbSet
  var diffuseNbs      = this.space.getDiffuseNeigbours(p[0],p[1],p[2])  
 
  var t               = this.data.temp
  var tt              = this.data.temp*this.element.thermal_conductivity

  var directShare     = ( tt * 0.5   ) / diffuseNbs[2].length
  var secondaryShare  = ( tt * 0.375 ) / diffuseNbs[1].length
  var tertiaryShare   = ( tt * 0.125 ) / diffuseNbs[0].length
  var shares          = [ tertiaryShare, secondaryShare, directShare ]
  var shareN
  var i,ii,p,nblen=diffuseNbs.length
  for ( i = nblen - 1; i >= 0; i--) {
    nbSet   = diffuseNbs[i]
    shareN  = shares[i]
    for (ii = nbSet.length - 1; ii >= 0; ii--) {
      (nbSet[ii]) ? nbSet[ii].temp+=shareN : null   
    };
  }
 
   
   this.data.temp=isNaN(this.data.temp) ? 0 : 
    Math.max(0,Math.min(1000000000,this.data.temp-tt))
}

AtomLogic.prototype.updateState = function(){
  
  if(this.data.position[1]<1){
    this.data.temp+=80;//+(Math.random()*100)
  }
    
  
  var el  = this.element
  var t   = this.data.temp

  if(t>el["boiling_point K"]){
    this.data.state=2 //GAS
     //this.drawVal=4
  }else if(t>el["melting_point K"]){
    this.data.state=1 //LIQUID
     //this.drawVal=3
  }else{
    this.data.state=0 //SOLID
  }

  if(this.engine.drawmode){
    this.data.drawVal=this.data.element_index+5 
  }else{
    var ne=this.engine.numElements/2
    this.data.drawVal=ne+
              Math.floor(5+Math.max(0,Math.min(ne,
                  ( (this.data.temp/1500)*ne) 
                  ) ) 
                )
               /* Math.floor(6+ne + Math.max(0,Math.min(ne,
                  ( (this.data.temp/60)*ne) 
                  ) ) 
                )*/      
  }
  

  //console.log(this.data.temp,this.data.drawVal)
     //this.drawVal=5+//
  
/*this.drawVal=5+Math.floor(
    (Math.max(0,Math.min(600, this.temp ))/600)*20
  ) //this.val+4  
*/
    
  
}
AtomLogic.prototype.getElementFromIndex = function(indx){
  return this.engine.periodicTable.getElementAt(indx)
}
AtomLogic.prototype.process = function(data){
  
  this.data=data
  var origDrawVal=this.data.drawVal
  // Load the element Object from the periodicTable for this element
  // if it has changed
  if(data.element_index!=this.lastDataIndex)
  {
    this.element        = this.getElementFromIndex(data.element_index)
    this.lastDataIndex  = data.element_index
  }

  //share and decay the temperature
  try{
    this.updateTemp()
  }catch(e){
    console.log("temperr ",e)
  }
  this.data.temp*=.99

  //update the Phase State of the Atom
  try{
    this.updateState()
  }catch(e){
    console.log("staterr ",e)
  }

      
  var cb

  // Apply PhaseState related movements

  //this.game.setBlock(this.position,0) 
 //console.log(this.state,this.drawVal,states.GAS)
 try{
  cb=this.getInDirection(dircts.BOTTOM);

 
  if(this.data.state==states.SOLID)
  {
    this.moveAsSolid(cb)
  }else if(this.data.state==states.LIQUID){
    this.moveAsLiquid(cb)
  }else if(this.data.state==states.GAS){
    this.moveAsGas(cb)
  }else{
    this.data.state=states.SOLID
    this.moveAsSolid(cb)
  }
}catch(e){
  console.log("AtomLogic moveErr",e)
}
/*cb=this.getInDirection(dircts.BOTTOM);
 if(this.data.position[1]>0)
  {
    if(!cb){
      this.moveTo(dircts.BOTTOM)
    }else if(this.isMoreDense(this.data,cb)){
      this.swapWith(dircts.BOTTOM)
    } 
  }*/
 // console.log("@",this.id,this.position[0],this.position[1],this.position[2])
//  this.game.setBlock(this.position,this.element)
  
  this.data.position=this.space.boundP(this.data.position)
  if(origDrawVal!=this.data.drawVal)
  {
    this.space.setAtP(this.data.position,this.data)
  }
}

AtomLogic.prototype.moveAsGas     = function(atomBelow){
  var cb=this.getInDirection(Math.random()*.5?dircts.TOP:dircts.BOTTOM);

  this.moveRandomDirection()
}

AtomLogic.prototype.moveAsLiquid  = function(atomBelow){
  if(this.data.position[1]>0)
  {
    if(!atomBelow){
      this.moveTo(dircts.BOTTOM)
    }else if(this.isMoreDense(this.data,atomBelow)){
      this.swapWith(dircts.BOTTOM)
    } 
  }
  

  this.moveRandomHorizonatal()        
  
}

AtomLogic.prototype.moveAsSolid   = function(atomBelow){
  if(this.data.position[1]>0)
  {
    if(!atomBelow){
      this.moveTo(dircts.BOTTOM)
    }else if(this.isHeavierState(this.data,atomBelow) || this.isMoreDense(this.data,atomBelow)){
      this.swapWith(dircts.BOTTOM)
    }else if(Math.random()>this.element.atomic_number/102){
      this.moveRandomHorizonatal()
  } 
  }

}

AtomLogic.prototype.isMoreDense   =function(atomA,atomB)
{
  return this.getElementFromIndex(atomA.element_index).atomic_weight > this.getElementFromIndex(atomB.element_index).atomic_weight
}
AtomLogic.prototype.isHeavierState   =function(atomA,atomB)
{
  return atomA.state>atomB.state
}


AtomLogic.prototype.getRndFrom   =function(a)
{
  return a[Math.floor(Math.random()*a.length)]
}



