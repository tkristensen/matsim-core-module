util			= require('util')

Atom 		= require("../atom.js")



function MoveAtom(game,model,pos) 
{	
	if (!(this instanceof MoveAtom)) return new MoveAtom()
	//SimModule.call(this);
	console.log("new MoveAtom()",this) 
}

util.inherits(MoveAtom,Atom)
	
		
MoveAtom.prototype.move = function(){
	console.log("mve")
}
	


module.exports 	= MoveAtom