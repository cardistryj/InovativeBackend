var dbmanager = require('./dbmanager');
var error=require('../lib/error');
var request=require('request')
const flight_controler=require('./flight_controller');
const options = {
    url: "https://data-live.flightradar24.com/zones/fcgi/feed.js",
    method: 'GET',
    charset: "utf-8",
    headers: {
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Host': 'data-live.flightradar24.com',
        'Upgrade-Insecure-Requests': '1',
        'TE': 'Trailers',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:74.0) Gecko/20100101 Firefox/74.0'
    }
};

dbmanager.init().then(function () {
    var check=0;
    setInterval(
        function(){
            request(options,function(err,response,body){
                if(err){
                    console.log(err);
                    return;
                }
                var data = JSON.parse(response.body);
                let count=0;
                check++;
                for(let key in data){
                    if(key==="full_count"||!data[key][0])
                        continue;
                    if(count>30)
                        break;
                    var flight_info={};
                    flight_info.ICAO=data[key][0];
                    flight_info.latitude=data[key][1];
                    flight_info.longitude=data[key][2];
                    flight_controler.updateFlightInfo(flight_info);
                    count++;
                }
                if(check===2){
                    flight_controler.siftExpiredInfo(flight_info);
                    check=0;
                }
            })
        },5*1000
    )
}
).catch(err=>{
    error.error(err);
});