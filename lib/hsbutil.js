var tinycolor=require("tinycolor2")

module.exports = function() {}

module.exports.tweenVals=function(a,b,pct){
 // console.log(a,b,pct)
  var c=a;//Math.min(a,b)
  var d=b;//Math.max(a,b)
  return c+((d-c)*pct)
}
 
module.exports.colorRange=function(hsvA,hsvB,steps){
  var r=[]
  var pct
  for (var i = steps; i >= 0; i--) {
    pct=i/steps
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


