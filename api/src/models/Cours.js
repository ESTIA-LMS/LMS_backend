const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Cours', {
    Cours_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Cours_Nom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Cours_Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    Cours_Duree: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: "01:00:00"
    },
    Cours_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Cours_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Cours_Actif: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Cours',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Cours__C79C8A3F4A5D67D4",
        unique: true,
        fields: [
          { name: "Cours_Id" },
        ]
      },
    ]
  })

module.exports = model
