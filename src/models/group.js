'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.User);
      Group.belongsToMany(models.Role, { through: 'Group_Role' });
    }
  };

  //obj relatinal mapping
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
    //bỏ s trong sequelize tự động có 
    tableName: 'Group',
    freezeTableName: true
  });
  return Group;
};

//models dinh nghia table no ntn, models ánh xạ tới miggrations 