const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM('PLAYER', 'MANAGER'),
          allowNull: false,
          defaultValue: 'PLAYER', // Default role
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt과 updatedAt ..등 자동 생성
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    )
  }
  static associate(db) {
    db.User.belongsToMany(db.Game, { through: 'Reservation' })
    db.User.hasMany(db.Game, { as: 'Games', foreignKey: 'managerId' })
  }
}
