const Sequelize = require('sequelize')

module.exports = class Gym extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt과 updatedAt ..등 자동 생성
        underscored: false,
        modelName: 'Gym',
        tableName: 'gyms',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    )
  }
  static associate(db) {
    db.Gym.hasMany(db.Game, { foreignKey: 'gymId' })
  }
}
