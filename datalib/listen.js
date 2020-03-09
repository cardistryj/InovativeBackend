const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const multicastAddr = '224.100.100.100';

client.on('close',()=>{
    console.log('socket已关闭');
});

client.on('error',(err)=>{
    console.log(err);
});
client.on('listening',()=>{
    console.log('socket正在监听中...');
    client.addMembership(multicastAddr);
});
client.on('message',(msg,rinfo)=>{
    var msgArray=msg.toString().split(',');
    //array:
    // 0: curTime
    // 1:ICAO
    // 2:registerNo
    // 3:callSignal
    // 4:latitude
    // 5:longitude
    // 6:height
    // 7:horizontalVelocity
    // 8:direction
    // 9:vertialVelocity
    // 10:ipAddress
    for(var message of msgArray){
        console.log(message);
    }
});
client.bind(10000);