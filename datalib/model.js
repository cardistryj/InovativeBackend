const Sequelize = require('sequelize');
const Model = Sequelize.Model;
var sequelize = require('./new_seq');

class Duration extends Model{ };

Duration.init({
  ICAO:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  latitude: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min:-90.0,
      max:90.0
    }
  },
  longitude: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      min:-180.0,
      max:180.0
    }
  },
},
{
  sequelize,
  modelName: 'Duration'
})

exports.Duration = Duration;
