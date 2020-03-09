var data_result = require('../lib/data_result')
function getJsonFromArray(data) {
    if (data) {
        var re = new Array();
        for (var i = 0; i < data.length; ++i) {
            if (data[i].toJSON) {
                re[i] = data[i].toJSON();
            } else {
                re[i] = data[i];
            }
        }
        return re;
    }else{
        return null;
    }
}

function getJsonFromModel(data) {
    if (data) {
        if (data.toJSON) {
            return data.toJSON();
        } else {
            return data;
        }

    } else {
        return null;
    }

}

exports.findAll = function (model, para) {
    return model.findAll(para).then(
        data => {
            return data_result.goodPromise((getJsonFromArray(data)));
        }, err => {
            return data_result.badPromise(err);
        }
    )
}

exports.createData = function (model, para,condition) {
    return model.build(para,condition)
        .save()
        .then(data => {
            // console.log(data)
            var re = getJsonFromModel(data);

            return data_result.goodPromise(re);
        }, err => {
            return data_result.badPromise(err);
        })
}

exports.deleteInfo = function(model, para){
    return model.destroy(para).then(
        data=>{
            return data_result.goodPromise(data);
        }, err=>{
            return data_result.badPromise(err);
        }
    )
}

exports.findCur = function(model, col, para){
    return model.max(col,para).then(
        max=>{
            return data_result.goodPromise(max);
        }, err=>{
            return data_result.badPromise(err);
        }
    )
}