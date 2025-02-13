// 'use strict';
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DIALECT,
        host: process.env.DB_HOST,
        // host: 'localhost',
        // dialect: "postgres",
        // dialect: 'mysql'|'mariadb'|'sqlite'|'postgress'|'mssql',
        port: process.env.DB_PORT,
        dialectOptions: {
            bigNumberStrings: true
        }
    }
);

const connectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Successful connection to MySQL Database ${process.env.DB_NAME}`);
    } catch (error) {
        console.error("Unable to connect to MySQL database:", error);
        process.exit(1);
    }
};

connectMysql();

module.exports = {
    Sequelize: sequelize,
};