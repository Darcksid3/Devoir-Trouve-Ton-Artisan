#!/usr/bin/env node
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_USER_PWD,
	{
		host: process.env.DB_HOST,
		dialect: 'mariadb'
	}
);

module.exports = sequelize;