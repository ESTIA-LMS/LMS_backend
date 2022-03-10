const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Profils', {
    Profils_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Profils_Nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Profils_Description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Profils',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Profils__20D91005EFE6DF50",
        unique: true,
        fields: [
          { name: "Profils_Id" },
        ]
      },
    ]
  })

module.exports = model
