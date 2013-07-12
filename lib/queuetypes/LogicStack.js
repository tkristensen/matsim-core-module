module.exports = function(arr,ticks_per_step,processerLogic) {
  return new LogicStack(arr,ticks_per_step,processerLogic)}

function LogicStack(arr,ticks_per_step,processerLogic) {

	this.alen			= 0   
	this.a 				= arr
	this.itemadded		= 0
	this.ticks_per_step	= ticks_per_step
	this.timesTicked	= 0
	this.processerLogic	= processerLogic
}

LogicStack.prototype.add = function(obj)
{
	/*this.a.push(obj)
	this.itemadded++
	return*/

	//NOTE: DECREMENT ALEN ON remove() when impl
	this.a.splice(Math.floor(Math.random()*this.alen), 0, obj )
	this.alen++
}

LogicStack.prototype.getRnd = function()
{
	return this.a[Math.floor(Math.random()*this.a.length)]
}

LogicStack.prototype.tick = function(tps)
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
					this.processerLogic.process(o)
				}catch(e){
					console.log("LogicStack - tickerr",o)
				}
				a.push(o)
			}else{
				//console.log("null in logicstack?")
			}
		}
		this.timesTicked++
	}
}
