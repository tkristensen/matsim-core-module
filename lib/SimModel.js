module.exports = function(game, opts, engine) {
  return new SimModel(game, opts, engine)
}


function SimModel(game, opts, engine) {

  SimModel.prototype.tick = function(){
    this.htmlElement.innerHTML="#a:"+this.engine.atoms.length//+" "+this.engine.atoms
  }


  // protect against people who forget 'new'
  if (!(this instanceof SimModel)) 
  	return new SimModel(game, opts, engine)
  
  console.log("new SimModel()") 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  
  this.game = game
  this.opts = opts || {}
  this.engine = engine

}