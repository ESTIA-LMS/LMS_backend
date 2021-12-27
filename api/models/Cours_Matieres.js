const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Cours_Matieres', {
    CM_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CM_Cours_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cours',
        key: 'Cours_Id'
      }
    },
    CM_Matieres_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Matieres',
        key: 'Matieres_Id'
      }
    },
    CM_Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    CM_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    CM_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Cours_Matieres',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Cours_Ma__101921CA7383AC11",
        unique: true,
        fields: [
          { name: "CM_Id" },
        ]
      },
    ]
  })

module.exports = model 
