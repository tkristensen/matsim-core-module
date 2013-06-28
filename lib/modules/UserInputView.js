hsbutil                 = require('./../../lib/hsbutil.js')

module.exports = function(engine) {return new UserInputView(engine)}

function UserInputView(engine) {
  // protect against people who forget 'new'
  if (!(this instanceof UserInputView)) return new UserInputView(engine)
    console.log("new UserInputView()") 
  // we need to store the passed in variables on 'this'
  // so that they are ava

  //this.engine.on("ticked",function(){this.tick()})
  this.htmlElement  = document.querySelector("#info");
  this.engine       = engine
  var pointer       = this;
  this.tickInterval = this.engine.game.setInterval( function(){pointer.tick()}, 2000)
  this.colors=hsbutil.colorRange(
      {h:131,s:78,v:34},
      {h:43,s:40,v:25},    
    100
      )

  this.createControlPanel()
  
}

UserInputView.prototype.tick = function(){
  this.htmlElement.innerHTML="#a:"
    +this.engine.atoms_stack.a.length
    +" spd:"+this.engine.ticks_per_update
    +"floortemp:"+this.engine.floor_heat
}


UserInputView.prototype.createControlPanel = function()
{
  var div=document.createElement('div')



  div.appendChild(  this.createKnob('tempKnob') )

  div.appendChild(  this.createKnob('speedKnob') )

  div.appendChild(this.createKnob('viewKnob') )

this.tempKnob=$("#tempKnob")
this.speedKnob=$("#speedKnob")
this.viewKnob=$("#viewKnob")

  var ptr=this
  $("#uihost").append(div)
  $('#speedKnob').knob({
    min:0,
    max:20000,
    change:function(val){
    
      ptr.updateKnob(ptr.speedKnob,val,0,20000)

    }
  })

  $('#tempKnob').knob( {
      change:function(val){
      
      ptr.updateKnob(ptr.tempKnob,val,0,100)
    }
  })
  $('#viewKnob').knob({
    change:function(val){
     
      ptr.updateKnob(ptr.viewKnob,val,0,100)
    }
  })

}
UserInputView.prototype.updateKnob = function(k,val,min,max)
{
  var c=this.colors[Math.floor(100*((val-min)/(max-min)))]
  k.data('fgcolor',c )
}
UserInputView.prototype.defaultKnobAttrs={
  'data-fgColor':'#66CC66'
  ,'data-angleOffset':'-125'
  ,'data-angleArc':'250'
  ,'data-width':'120'
}
UserInputView.prototype.createKnob = function(id,changeHandler,attrs)
{

    var knb

  knb=document.createElement('input')
  
  $(knb).attr(this.defaultKnobAttrs)
  if(attrs)
    $(knb).attr(attrs)
  if(changeHandler)
    $(knb).bind('change',changeHandler)

  knb.setAttribute('id',id)
  return knb
}

UserInputView.prototype.createKnobUI = function(id,changeHandler,attrs)
{

    var ele

  ele=document.createElement('div')
  
  if(attrs)
    $(ele).attr(attrs)
  if(changeHandler)
    $(knb).on('change',changeHandler)
  return knb
}
