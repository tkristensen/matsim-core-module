var util            = require('util')
var EventEmitter    = require('events').EventEmitter
var DIRECTIONS      = require("./Directions.js")
var directions      = DIRECTIONS.consts
var diroffsets      = DIRECTIONS.diroffsets
var neigbourOffsets = DIRECTIONS.neigbourOffsets
//neigbourOffsets.reverse() //to work with decrementing for..loop
var neigboursLen    = neigbourOffsets.length

var diffuseNeigbourOffsets = DIRECTIONS.diffuseNeigbourOffsets

module.exports = function(xdim,ydim,zdim) {
  return new ModelMatrix(xdim,ydim,zdim)
}


function ModelMatrix(xdim,ydim,zdim) {
  
  ModelMatrix.prototype.getAt = function(x,y,z){
    x=this.bound(x,this.xdim)
    y=this.bound(y,this.ydim)
    z=this.bound(z,this.zdim)
    return this._getAt(x,y,z)    
  }

  ModelMatrix.prototype._getAt = function(x,y,z){
    var r
    try{
      r=this.m[x][y][z]
    }catch(e){
      console.log("getAt err ",e)
    }
    return r
  }


  ModelMatrix.prototype.bound = function(n,d){
    return (n<0?d+n:n)%d
  }
  ModelMatrix.prototype.boundP = function(pos){
    return [
            this.bound(pos[0],this.xdim),
            this.bound(pos[1],this.ydim),
            this.bound(pos[2],this.zdim)
          ]
  }
  ModelMatrix.prototype.setAt = function(x,y,z,obj){
    //console.log("ModelMatrix(",this.xdim,this.ydim,this.zdim,")") 
    //console.log("set:",x%this.xdim,y%this.ydim,z%this.zdim,obj,"setraw:",x,y,z)
    x=this.bound(x,this.xdim)
    y=this.bound(y,this.ydim)
    z=this.bound(z,this.zdim)
    this.m[x][y][z]=obj
    this.emit('set',[[x,y,z],obj])
  }

  ModelMatrix.prototype.getAtP = function(position){
    return this.getAt( position[0] , position[1] , position[2])
  }

  ModelMatrix.prototype.isEmptyAtP = function(position){
      return this.getAtP(position)==0
  }
  ModelMatrix.prototype.setAtP = function(position,obj){
      this.setAt( position[0] , position[1] , position[2], obj)
  }

  ModelMatrix.prototype.getNeighboursAt=function(x,y,z)
  {
    
    var r=[]
    var nb
    x=this.bound(x,this.xdim)
    y=this.bound(y,this.ydim)
    z=this.bound(z,this.zdim)
    for (var i = neigboursLen - 1; i >= 0; i--) {
      nb=neigbourOffsets[i]
      r.unshift(this.getAt( x+nb[0],   y+nb[1],     z+nb[2]    ))
    };

    return r;
  }
  ModelMatrix.prototype.getDiffuseNeigbours=function(x,y,z)
  {
    
    var rslt=[],rtmp
    var p
    x=this.bound(x,this.xdim)
    y=this.bound(y,this.ydim)
    z=this.bound(z,this.zdim)


    var rn
    for (var i = diffuseNeigbourOffsets.length - 1; i >= 0; i--) {
      rn    = diffuseNeigbourOffsets[i]
      rtemp = []
      for (var ii = rn.length - 1; ii >= 0; ii--) {
        p=rn[ii]
        rtemp.unshift(this.getAt( x+p[0],   y+p[1],     z+p[2]    ))
      };
      rslt.unshift(rtemp)      
    };

    return rslt;
  }

  ModelMatrix.prototype.swapAt = function(pos_a,pos_b){
    var a=this.getAtP(pos_a)
    var b=this.getAtP(pos_b)
    //console.log("  swap:",pos_a,a," to ",pos_b,b)
    this.setAtP(pos_a,b)
    this.setAtP(pos_b,a)      
  }


  // protect against people who forget 'new'
  if (!(this instanceof ModelMatrix)) 
  	return new ModelMatrix(xdim,ydim,zdim)
  
  console.log("new ModelMatrix(",xdim,ydim,zdim,")") 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  
  
  
  this.xdim=xdim
  this.ydim=ydim
  this.zdim=zdim
  
  console.log("new ModelMatrix(",this.xdim,this.ydim,this.zdim,")") 
  var m=new Array(xdim)
  var za=new Array();
  for (var i = zdim; i >= 0; i--) {
    za.push(0)
  };

  for (var x = xdim ; x >= 0; x--) 
  {
    m[x]=new Array(ydim)
    
    for (var y = ydim ; y >= 0; y--) 
    {
      m[x][y]=za.slice()
      //console.log("za",m[x][y])
    }
  }

  this.m=m
  
  console.log(" -model dims:",this.m.length,this.m[0].length,this.m[0][0].length,directions) 
   console.log(this)
}

util.inherits(ModelMatrix, EventEmitter);
