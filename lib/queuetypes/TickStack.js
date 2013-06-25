module.exports = function(arr,ticks_per_step) {
  return new TickStack(arr,ticks_per_step)}

function TickStack(arr,ticks_per_step) {

	TickStack.prototype.add = function(obj)
	{
		var alen=this.a.length
		alen<2 ? this.a.push(obj) : this.a.splice(Math.floor(Math.random()*alen), 0, obj )
	}
 	TickStack.prototype.getRnd = function()
	{
		return this.a[Math.floor(Math.random()*this.a.length)]
	}
	TickStack.prototype.tick = function(tps)
	{
		//console.log(".") 
		var o
		var a=this.a
		if(a){
			var alen=a.length
			for (var i = Math.min(alen,tps ? tps : this.tstep); i >= 0; i--){
				o=a.shift()
				if(o){ 
					try{
						o.move()
					}catch(e){
						console.log("TickStick - tickerr",o)
					}
					a.push(o)
				}
			}
		}
	}
	   
	this.a=arr
	this.ticks_per_step=ticks_per_step
}	