util            = require('util')
CellLogicBase	= require("./CellLogicBase.js")

DIRECTIONS      = require("../Directions.js")

dircts          = require("../Directions.js").consts
hdirs           = require("../Directions.js").horizConstsArr
alldirs           = require("./../Directions.js").directionsArr

function ThreeDCellLogic(game,engine,space) 
{
}

util.inherits(ThreeDCellLogic,CellLogicBase)

ThreeDCellLogic.prototype.moveRandomHorizonatal=function(swapIfBlocked){
	var d=this.getRndFrom(hdirs)
	if(this.canMove(d)){
	  this.moveTo(d)
	}else if(swapIfBlocked){
		this.swapWith(d)
	}
}
ThreeDCellLogic.prototype.moveRandomDirection=function(swapIfBlocked){
	var d=this.getRndFrom(alldirs)
	if(this.canMove(d)){
	  this.moveTo(d)
	}else if(swapIfBlocked){
		this.swapWith(d)
	}
}

ThreeDCellLogic.prototype.offsetPos=function(dir){
  return DIRECTIONS.move(dir,this.data.position)
}

ThreeDCellLogic.prototype.canMove=function(dir){
  return this.space.isEmptyAtP(this.offsetPos(dir))
}

ThreeDCellLogic.prototype.getInDirection=function(dir){
  return this.space.getAtP(this.offsetPos(dir))
}  

ThreeDCellLogic.prototype.moveTo=function(dir){
  this.clearPos()
  this.data.position=this.offsetPos(dir);
  return this.space.setAtP(this.data.position,this.data)
}  

ThreeDCellLogic.prototype.clearPos=function(){this.space.setAtP(this.data.position,0)}

ThreeDCellLogic.prototype.swapWith=function(dir){
  this.space.swapAt(this.data.position,this.offsetPos(dir))
}  

ThreeDCellLogic.prototype.collisionBelow=function(){
  return this.space.getAtP(this.offsetPos(dircts.BOTTOM,this.data.position))
}

module.exports 	= ThreeDCellLogic