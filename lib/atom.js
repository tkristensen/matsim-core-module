
module.exports = function(game,position, val) {
  return new Atom(game,position, val)}


function Atom(game,position, val) {

  Atom.prototype._id=0;
  Atom.prototype.p = function(){console.log("atm(",this.id,"):",arguments)}
  Atom.prototype.move = function(){
    //this.p("a.move() ",this,"|||",this["position"],"|||")
    

    
    var cb=this.collisionBelow();
  //
  game.setBlock(this.position,0)

    if( cb>0 || this.position[1]-1<0)
    {
      
      //this.position[1]=100
      if(Math.random()>.9)
      {
        if(Math.random()>.5)
        {
          this.position[0]+= (Math.random()>.5) ? 1 : -1;
        }else{
          this.position[2]+= (Math.random()>.5) ? 1 : -1;
        }
      }
     // this.position[2]+=Math.floor((Math.random()*10))-5;
      //this.position[0]+=Math.floor((Math.random()*10))-5;
    }else{
      this.position[1]--
    }

    
    game.setBlock(this.position,this.val)
    

  }
  Atom.prototype.collisionBelow=function()
  {
    return game.getBlock([this.position[0],this.position[1]-1,this.position[2] ])
  }
  Atom.prototype.toString=function(){return "atm(",this.id,"):"+this.position}

  // protect against people who forget 'new'
  if (!(this instanceof Atom)) return new Atom(position, val)
 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  this.game=game
  this.position = position
  this.val = val
  this.id=Atom.prototype._id++;


  
}
