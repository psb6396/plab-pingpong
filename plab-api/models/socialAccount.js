const Sequelize = require('sequelize')

module.exports = class SocialAccount extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        accountEmail: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        accountType: {
          // type: Sequelize.ENUM('GOOGLE', 'KAKAO'),
          type: Sequelize.ENUM('GOOGLE', 'KAKAO'),
          allowNull: true,
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
    // db.Game.hasMany(db.Reservation, { foreignKey: 'gameId' })
    // db.Game.belongsTo(db.User, { as: 'Managers', foreignKey: 'managerId' })
    // db.Game.belongsTo(db.Gym, { foreignKey: 'gymId' })
    db.SocialAccount.belongsTo(db.User, { foreignKey: 'userId' })
  }
}
