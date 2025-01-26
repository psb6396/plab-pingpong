const Sequelize = require('sequelize')

module.exports = class SocialAccount extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        snsId: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        accountEmail: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        accountType: {
          type: Sequelize.ENUM('GOOGLE', 'KAKAO'),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt과 updatedAt ..등 자동 생성
        underscored: false,
        modelName: 'SocialAccount',
        tableName: 'socialaccounts',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    )
  }
  static associate(db) {
    db.SocialAccount.belongsTo(db.User, { foreignKey: 'userId' })
  }
}
