const Sequelize = require('sequelize')

module.exports = class Manager extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
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
      db.Manager.hasMany(db.Game)
   }
}
