module.exports = function(opts) {
  return new PeriodicTable(opts)}

function PeriodicTable(opts) {

PeriodicTable.prototype.getRndElementIndex = function(){
  return Math.floor(Math.random()*this.table.length)
}
PeriodicTable.prototype.getRndElement = function(){
	return this.table[this.getRndElementIndex()]
}
PeriodicTable.prototype.getElementAt = function(indx){
  return this.table[indx]
}

  PeriodicTable.prototype.getElement = function(opts){
  	var tliq=this.rndInRange(33,280)
  	var tgas=this.rndInRange(tliq+2,tliq+(Math.random()*100))
    return {
    	weight:this.rndInRange(this.weightMin,this.weightMax),
    	thermCond:this.rndInRange(this.tCondMin,this.tCondMax),
    	erodeF:this.rndInRange(this.erodeMin,this.erodeMax),
    	tempLiquid:tliq,
    	tempGas:tgas
    }
  }

  PeriodicTable.prototype.loadTable=function(data){
    var t=[]
    var tname_to_index_dict={}
    var tnames=[]
    
    var i=0
    var d,n
    for(var name in data)
    {
      try{
        d=data[name]
        for(var eleProp in d)
        {
          if(eleProp!='density' && eleProp.indexOf('density')==0)
          {
            var v=d[eleProp]
            if(isNaN(v)){
              var spl=v.split(' ')
              n=spl.length>0 ? spl[0] : spl
              d['density']  =   !isNaN(n) ? parseFloat(n) : 1
            }else if(!isNaN(v)){
              d['density']  = parseFloat(v) 
            }else{
              d['density']  = 1
            }
            console.log("created density for '",d.symbol,"'")
          }
          if(eleProp=='thermal_conductivity')
          {
            if(isNaN(d[eleProp]))
            {
              console.log("no valid thermal_conductivity value for  '",d.symbol,"' using .5")  
              d[eleProp]=.5
            }
            d[eleProp]/=500.0
            d[eleProp]=Math.max(.1,Math.min(.99999,d.thermal_conductivity))
//d[eleProp]=.2
          }  
        }

        t.push(d)
        tnames.push(name)
        tname_to_index_dict[name]=i
        i++
      }catch(e){
          console.log("err loading element '",e,d,"'")

      }
      
    }
    console.log(" loaded element '",d.symbol,"'")
    this.numElements      = i
    this.table            = t
    this.nameToIndexDict  = tname_to_index_dict
    this.names            = tnames
    console.log("==loaded ",this.numElements, "elements==")
  }

  PeriodicTable.prototype.buildTable = function(len){
    var t=[]
    for (var i = len - 1; i >= 0; i--) {
    	t.push(this.getElement())
    };
    console.log("built PeriodicTable len ",t.length)
    return t;
  }
  PeriodicTable.prototype.rndInRange = function(min,max){
    return min+(Math.random()*(max-min))
  }


  // protect against people who forget 'new'
  if (!(this instanceof PeriodicTable)) return new PeriodicTable(opts)
 console.log("new PeriodicTable()") 
  // we need to store the passed in variables on 'this'
  // so that they are available to the .prototype methods

  
  this.opts = opts || {}

/*  this.weightMin=1
  this.weightMax=20

  this.tCondMin=.01
  this.tCondMax=.3

  this.erodeMin=.48
  this.erodeMax=1.0

  this.tempLiquidMin=2
  this.tempLiquidMax=111

  this.tempGasMin=111
  this.tempGasMax=222

  
*/  
  
  //this.table=this.buildTable(this.opts.numElements ? this.opts.numElements : 20)
}

