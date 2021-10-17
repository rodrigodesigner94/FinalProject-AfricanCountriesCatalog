const database = require("../database");
const Sequelize = require("sequelize");

const Pais = database.define("paises", {
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
  bandeira: {
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
    type: Sequelize.STRING,
    allowNull: false,
  },
  populacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lingua_oficial: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  moeda: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  informacoes: {
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

module.exports = Pais;
