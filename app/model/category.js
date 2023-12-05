const {Sequelize, DataTypes} = require("sequelize");

const db = require("../db")
const sequelize = db.sequelize;

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Category