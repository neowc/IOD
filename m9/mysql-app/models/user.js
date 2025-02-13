const { DataTypes, Model } = require("sequelize");

// const dbConnect = require("../dbConnect");
// const sequelizeInstance = dbConnect.Sequelize;

const sequelize = require('../db.config');
// const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        modelName: "users",
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = User;