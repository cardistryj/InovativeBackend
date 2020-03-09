const jsonfile=require('jsonfile');
const conf_path=__dirname+'/dbconf.json';
var dbinfo;
exports=module.exports=function(){
    if(!dbinfo){
        dbinfo=jsonfile.readFileSync(conf_path);
    }
    console.log(dbinfo);
    return dbinfo;
}