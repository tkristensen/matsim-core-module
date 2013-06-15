module.exports = function(game, opts, engine) {
  return new SimHUDView(game, opts, engine)}

function SimHUDView(game, opts, engine) {

  SimHUDView.prototype.tick = function(){
    this.htmlElement.innerHTML="#a:"+this.engine.atoms.length//+" "+this.engine.atoms
  }


  // protect against people who forget 'new'
  if (!(this instanceof SimHUDView)) return new SimHUDView(game, opts, engine)
 console.log("new SimHUDView()",game,this) 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  var game,opts,engine;
  this.game = game
  this.opts = opts || {}
  this.engine = engine
  //this.engine.on("ticked",function(){this.tick()})
  this.htmlElement=document.querySelector("#info");

  var pointer=this;
  this.tickInterval=game.setInterval( function(){pointer.tick()}, 2000)
  
}

