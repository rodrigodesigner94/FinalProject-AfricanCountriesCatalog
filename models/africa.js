const database = require("../database");
const Sequelize = require("sequelize");

const Filme = database.define("filmes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  capital: {
    type: Sequelize.STRING,
  },
  regiao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  extensao: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  populacao: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  lingua: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  moeda: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Africa;
