const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Users_Matieres', {
    UM_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UM_Users_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'Users_Id'
      }
    },
    UM_Matieres_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Matieres',
        key: 'Matieres_Id'
      }
    },
    UM_Inscription_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UM_Last_Consultation_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UM_Avancement: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Users_Matieres',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Users_Ma__53B61AF15E2B67F9",
        unique: true,
        fields: [
          { name: "UM_Id" },
        ]
      },
    ]
  })

module.exports = model