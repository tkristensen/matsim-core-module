function CellLogicBase(game,engine,space) 
{	
	if (!(this instanceof CellLogicBase)) return new CellLogicBase()
	//SimModule.call(this);
	console.log("new CellLogicBase()",this) 
	this.game	= game
	this.engine	= engine
	this.space	= space
}


CellLogicBase.prototype.process = function(data){
	console.log("Cell Logic processing data")
}

module.exports 	= CellLogicBase