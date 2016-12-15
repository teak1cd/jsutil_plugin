console.log("JS-UTIL loaded");
function JSUTIL(){
  this.JSUTIL = this;
  this.math = Math;
  this.window = window;
  this.ids = [];
}
JSUTIL.prototype = Object.assign(JSUTIL.prototype,{
  characters:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321abcdefghijklmnopqrstuvwxyz",
  setting(setting,value){
    this[setting]=value;
    return this[setting];
  },
  updateSettings(){
    if(this.overrideMath){
      window[Math] = this.Math2;
    }else{
      window[Math] = this.Math;
    }
    if(this.makeDataRollbacks){
      this.makeDataRollbacksPackage = JSUTIL.package();
    }else{
      window[Math] = this.Math;
    }
  },
  package(id,data){
    var package = {};
    package.packageUUID = JSUTIL.UUID(id);
    package.constructor = data.constructor;
    package.initializer = data.init;
    package.manifest = data.manifest;
    for(var i = 0;i<package.manifest.keys.length;i++){
      package[package.manifest.keys[i]]=data[package.manifest.keys[i]];
    }
    JSUTIL.packages[package.packageUUID] = package;
    return package;
  },
  UUID(id){
    if(!this.ids.includes(id)){
      this.ids.push(id);
      return id
    }else{
      throw new TypeError("UUID:"+id+" is already in use");
    }
  }
});
var JSUTIL = new JSUTIL();
