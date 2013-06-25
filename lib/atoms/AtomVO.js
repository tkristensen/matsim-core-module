function AtomVO(element_index,position,temp,phase_state) 
{	
	if (!(this instanceof AtomVO)) return new AtomVO()
	//SimModule.call(this);
	console.log("new AtomVO()",this) 


	this.element_index  = element_index
	this.position 		= position
	this.temp     		= isNaN(temp) ? 0 : temp	
	this.phase_state    = states.SOLID

}

		
/*AtomVO.prototype.somefunc = function(){
	console.log("somefunc")
}
*/	
module.exports 	= AtomVO