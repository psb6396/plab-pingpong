const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]

const User = require('./user')
const Game = require('./game')
const Gym = require('./gym')
const Reservation = require('./reservation')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Game = Game
db.Gym = Gym
db.Reservation = Reservation

User.init(sequelize)
Game.init(sequelize)
Gym.init(sequelize)
Reservation.init(sequelize)

User.associate(db)
Game.associate(db)
Gym.associate(db)
Reservation.associate(db)

module.exports = db
