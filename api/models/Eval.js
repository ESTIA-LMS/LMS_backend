const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Eval', {
    Eval_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Eval_Type_Eval_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Type_Eval',
        key: 'Type_Eval_Id'
      }
    },
    Eval_Cours_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cours',
        key: 'Cours_Id'
      }
    },
    Eval_Nom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Eval_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Eval_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Eval_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Eval',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Eval__41342B91F0834A62",
        unique: true,
        fields: [
          { name: "Eval_Id" },
        ]
      },
    ]
  })


module.exports = model
