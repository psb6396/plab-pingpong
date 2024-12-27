const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]

const User = require('./user')
const Game = require('./game')
const Manager = require('./manager')
const Gym = require('./gym')

const db = {}
const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Game = Game
db.Manager = Manager
db.Gym = Gym

User.init(sequelize)
Game.init(sequelize)
Manager.init(sequelize)
Gym.init(sequelize)

User.associate(db)
Game.associate(db)
Manager.associate(db)
Gym.associate(db)

module.exports = db
