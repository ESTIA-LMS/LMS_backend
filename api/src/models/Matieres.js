const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Matieres', {
    Matieres_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Matieres_Nom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Matieres_Description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    Matieres_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Matieres_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Matieres_Actif: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'Matieres',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Matieres__CE8A8DBAD4110A95",
        unique: true,
        fields: [
          { name: "Matieres_Id" },
        ]
      },
    ]
  })

module.exports = model
