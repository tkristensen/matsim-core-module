module.exports = function(engine) {
  return new SimHUDView(engine)}

function SimHUDView(engine) {

  SimHUDView.prototype.tick = function(){
    this.htmlElement.innerHTML="#a:"+this.engine.atoms_stack.a.length+" "+this.engine.atoms_stack.itemadded
  }


  // protect against people who forget 'new'
  if (!(this instanceof SimHUDView)) return new SimHUDView(engine)
    console.log("new SimHUDView()") 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  

  //this.engine.on("ticked",function(){this.tick()})
  this.htmlElement=document.querySelector("#info");
  this.engine=engine
  var pointer=this;
  this.tickInterval=this.engine.game.setInterval( function(){pointer.tick()}, 2000)
  
}

