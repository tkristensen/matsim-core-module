SimModule     = require('./SimModule.js')
var player    = require('voxel-player')
var fly     = require('voxel-fly')
var walk    = require('voxel-walk')
var highlight   = require('voxel-highlight')

function VoxelAvatarModule() {

 if (!(this instanceof VoxelAvatarModule)) return new VoxelAvatarModule()
    console.log("new VoxelAvatarModule()") 


}

util.inherits(VoxelAvatarModule,SimModule)

VoxelAvatarModule.prototype.onAttach = function(opts){


  var createPlayer = player(this.engine.game)

  // create the player from a minecraft skin file and tell the
  // game to use it as the main player
  var avatar = createPlayer(opts.playerSkin || 'player.png')
  avatar.possess()
  avatar.yaw.position.set(-10, 14, -10)

  var makeFly = fly(this.engine.game)
  var target  = this.engine.game.controls.target()
  this.engine.game.flyer  = makeFly(target)

}

module.exports = VoxelAvatarModule