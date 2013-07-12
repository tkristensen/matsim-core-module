var tinycolor=require("tinycolor2")

module.exports = function() {}

module.exports.tweenVals=function(a,b,pct){ 
  return a+((b-a)*pct)
}
 
module.exports.colorRange=function(hsvA,hsvB,steps){
  var r=[]
  var pct
  for (var i = 0; i<steps; i++) {
    pct=i/steps
    console.log("push",i,"of",steps)
    r.push(
      tinycolor({
        h:module.exports.tweenVals(hsvA.h,hsvB.h,pct),
        s:module.exports.tweenVals(hsvA.s,hsvB.s,pct),
        v:module.exports.tweenVals(hsvA.v,hsvB.v,pct)
      }).toHexString()    
      )
  }
  return r
 }


