var Sequelize = require('sequelize');
var query_controller = require('./query_controller')
var model = require('./model')
var Duration = model.Duration;

const interval = 5*1000 // 设置 最小更新 间隔，部署时 考虑 设置 为 1分钟
const expire = 30*1000 // 设置 信息 的 过期期限，部署时 考虑 设置 为 1天

function getFlightInfo(start, end){
    return query_controller.findAll(Duration,{
        where:{
            createdAt: {
                [Sequelize.Op.between]:[start, end]
            }
        }
    }).then(result=>{
        return result;
    })
}

function updateFlightInfo(flight_info) {
    return query_controller.findCur(Duration, 'createdAt', {
            where: { ICAO: flight_info.ICAO },
        }).then(result => {
            console.log('Updating...');
            if(result.message==='success'){
                let now=new Date();
                if(result.data===0||now.getTime()-result.data.getTime()>=interval){
                    if(result.data===0)
                        console.log('Creating a new flight info')
                    else
                        console.log('Updating more recent flight info')
                    query_controller.createData(Duration,flight_info)
                    .catch(error=>{
                        console.log(error);
                    })
                }
                else
                    console.log('No need updating');
            }
            else
                return result;
        }).catch(error=>{
            console.log(error);
        })
}

function siftExpiredInfo(){
    var now = new Date();
    var expired = new Date(now.getTime()-expire);
    console.log('Sifting...')
    return query_controller.deleteInfo(Duration,{
            where:{
                createdAt: {
                    [Sequelize.Op.lt]: expired
                }
            }
        })
        .catch(error=>{
            console.log(error);
        })
}

exports.updateFlightInfo = updateFlightInfo;
exports.siftExpiredInfo = siftExpiredInfo;
exports.getFlightInfo = getFlightInfo;