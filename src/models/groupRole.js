'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  //ten Group_Role se ung voi table ben migrations
  class Group_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  //obj relatinal mapping
  Group_Role.init({
    groupId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group_Role',
  });
  return Group_Role;
};

//models dinh nghia table no ntn, models ánh xạ tới miggrations 