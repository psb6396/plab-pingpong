const Sequelize = require('sequelize')

module.exports = class Reservation extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {},
         {
            sequelize,
            timestamps: true, //createdAt과 updatedAt ..등 자동 생성
            underscored: false,
            modelName: 'Reservation',
            tableName: 'reservations',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Reservation.belongsTo(db.User, { foreignKey: 'userId', as: 'attendees' })
      db.Reservation.belongsTo(db.Game, { foreignKey: 'gameId', as: 'games' })
   }
}
