const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Type_Eval', {
    Type_Eval_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type_Eval_Nom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Type_Eval_Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    Type_Eval_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Type_Eval_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Type_Eval',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Type_Eva__1C2C04E50F8E0FDC",
        unique: true,
        fields: [
          { name: "Type_Eval_Id" },
        ]
      },
    ]
  })

module.exports =  model
