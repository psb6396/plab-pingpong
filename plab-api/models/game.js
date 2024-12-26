const Sequelize = require('sequelize')

module.exports = class Game extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            datetime: {
               type: Sequelize.DATE,
               allowNull: false,
            },
            maximum_people: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            minimum_people: {
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
   }
}
