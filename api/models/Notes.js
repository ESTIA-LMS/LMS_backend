const Sequelize = require('sequelize')
const DataTypes = require('sequelize').DataTypes
const sequelize = require('../db.config')

const model = sequelize.define('Notes', {
    Notes_Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Notes_Eval_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Eval',
        key: 'Eval_Id'
      }
    },
    Notes_Users_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'Users_Id'
      }
    },
    Notes_Value: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: true,
      defaultValue: 0
    },
    Notes_Create_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    Notes_Update_Date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'Notes',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Notes__2AFFBF30E46D6808",
        unique: true,
        fields: [
          { name: "Notes_Id" },
        ]
      },
    ]
  })

module.exports = model
