const DataTypes = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    fio: { type: DataTypes.STRING },
    tel: { type: DataTypes.STRING, unique: true },
    photo: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, allowNull: false },
    recoveryCode: { type: DataTypes.STRING }
})

const Companies = sequelize.define('companies', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    tel: { type: DataTypes.STRING, unique: true },
})

const Messages = sequelize.define('messages', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    to: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
})

const Reports = sequelize.define('reports', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    range: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    file: { type: DataTypes.STRING }
})

const Tasks = sequelize.define('tasks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    subname: { type: DataTypes.STRING, allowNull: false },
    place: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    time: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
})

const Executions = sequelize.define('executions', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    photos: { type: DataTypes.ARRAY(DataTypes.STRING) },
    file: { type: DataTypes.STRING }
})

const ReportsTasks = sequelize.define('reports_tasks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})


Users.hasOne(Companies)
Companies.belongsTo(Users)

Users.hasMany(Messages)
Messages.belongsTo(Users)

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

Users.hasMany(Reports)
Reports.belongsTo(Users)

Tasks.hasMany(Executions)
Executions.belongsTo(Tasks)

Users.hasMany(Executions)
Executions.belongsTo(Users)

Tasks.belongsToMany(Reports, { through: ReportsTasks })
Reports.belongsToMany(Tasks, { through: ReportsTasks })

module.exports = {
    Users,
    Companies,
    Messages,
    Reports,
    Tasks,
    Executions,
    ReportsTasks,
}