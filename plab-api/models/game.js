const Sequelize = require('sequelize')

module.exports = class Game extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        datetime: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        maximumPeople: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        minimumPeople: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        currentPeople: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt과 updatedAt ..등 자동 생성
        underscored: false,
        modelName: 'Game',
        tableName: 'games',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    )
  }
  static associate(db) {
    db.Game.belongsToMany(db.User, { through: 'Reservation' })
    db.Game.belongsTo(db.User, { as: 'Managers', foreignKey: 'managerId' })
    db.Game.belongsTo(db.Gym, { foreignKey: 'gymId' })
  }
}
