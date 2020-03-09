var flight_controller=require('./flight_controller');

exports.getInfo = function(req, res){
    var durationInfo=req.query;
    var start=new Date(durationInfo.start);
    var end=new Date(durationInfo.end);
    console.log(durationInfo.start,durationInfo.end);
    console.log(start,end);
    flight_controller.getFlightInfo(start, end).then(
        result=>{
            res.json(result);
        }
    )
}