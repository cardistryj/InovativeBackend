var sequelize= require('./new_seq')

function initAll(){
  return initModel(sequelize)
}

function initModel(model_class){
  // when initiate for the first time, considering set the "force" parameter to "true"
  return model_class.sync({force:false}).then(function(result){
    console.log(result);
  })
}

exports.init=initAll;