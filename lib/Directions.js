var T  =	[ 0 , 1 , 0]
var TN  =	[ 1 , 1 , 0]
var TNW  =	[ 1 , 1 , 1] 
var TNE   =	[ 1 , 1 ,-1]
var TS  =	[-1 , 1 , 0] 
var TSW  =	[-1 , 1 , 1] 
var TSE  =	[-1 , 1 ,-1]
var TW  =	[ 0 , 1 , 1]
var TE  =	[ 0 , 1 ,-1]

var B   =	[ 0 ,-1 , 0]
var BN  =	[ 1 ,-1 , 0] 
var BNW  =	[ 1 ,-1 , 1] 
var BNE   =	[ 1 ,-1 ,-1]
var BS  =	[-1 ,-1 , 0] 
var BSW  =	[-1 ,-1 , 1] 
var BSE   =	[-1 ,-1 ,-1]
var BW  =	[ 0 ,-1 , 1]
var BE  =	[ 0 ,-1 ,-1]

var N  	=	[ 1 , 0 , 0]
var NW  =	[ 1 , 0 , 1]
var NE  =	[ 1 , 0 , -1]
var S  	=	[-1 , 0 , 0]
var SW 	=	[-1 , 0 , 1]
var SE 	=	[-1 , 0 , -1]
var W  	=	[ 0 , 0 , 1]
var E  	=	[ 0 , 0 ,-1]

module.exports = function() {}

module.exports.consts= {
  	TOP:0,
  	BOTTOM:1,
  	NORTH:2,
  	SOUTH:3,
  	WEST:4,
  	EAST:5
  };

module.exports.diroffsets= {
	TOP     :T,
	BOTTOM  :B,
	NORTH   :N,
	SOUTH   :S,
	WEST    :W,
	EAST    :E
};

module.exports.neigbourOffsets	= [T,B,N,S,W,E];
//len 3 array of increasingly distant neighbour offsets
module.exports.diffuseNeigbourOffsets	= [
											[TNW,TNE,TSW,TSE,BNW,BNE,BSW,BSE],
											[TN,TS,TW,TE,BN,BS,BW,BE],										    
											[T,B,N,S,W,E]
											]
module.exports.diffuseNeigbourOffsetsFlat	= [
											TNW,TNE,TSW,TSE,	BNW,BNE,BSW,BSE,
											TN,TS,TW,TE,		BN,BS,BW,BE,										    
											T,B,N,S,W,E
											]											
module.exports.localDiffuseNeigbourOffsets	= [
											[NW,NE,SW,SE],//,TNW,TNE,TSW,TSE,BNW,BNE,BSW,BSE											
											[T,B,N,S,W,E]											
									    ]
module.exports.horizConstsArr	= [module.exports.consts.NORTH,module.exports.consts.SOUTH,module.exports.consts.WEST,module.exports.consts.EAST];
module.exports.directionsArr	= [
									module.exports.consts.NORTH,
									module.exports.consts.SOUTH,
									module.exports.consts.WEST,
									module.exports.consts.EAST,
									module.exports.consts.TOP,
									module.exports.consts.BOTTOM
									];
module.exports.move				= function(dir,position)
{
	var d=neigbourOffsets[dir]
	return [position[0]+d[0],position[1]+d[1],position[2]+d[2]]	
}

