const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Users', {
    Users_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Users_Profils_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Profils',
        key: 'Profils_Id'
      }
    },
    Users_Nom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Users_Prenom: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Users_Email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Users_Pwd: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    Users_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Users_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Users_Actif: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Users__EB68292D13DE9611",
        unique: true,
        fields: [
          { name: "Users_Id" },
        ]
      },
    ]
  })

module.exports = model 