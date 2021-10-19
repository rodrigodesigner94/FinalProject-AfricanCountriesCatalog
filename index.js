require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const Pais = require("./models/pais");
// const port = 3000;
const port = process.env.PORT || 3000; 
app.use(express.urlencoded());

let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.render("home"); 
});

app.get("/quemsomos", (req, res) => {
    res.render("quemsomos"); 
});


app.get("/sobre", (req, res) => {
    res.render("sobre"); 
});
app.get("/paises", async (req, res) => {
    const paises = await Pais.findAll();
    res.render("paises", {
        paises, message
      });
});

app.get("/detalhes/:id", async (req, res) => {
    const paises = await Pais.findByPk(req.params.id);
    res.render("detalhes", {
        paises,
      });
});



//create
app.get("/cadastro", (req, res) => {
    res.render("cadastro", {message});
    });
  app.post("/cadastro", async (req, res) => {

    const { nome, bandeira, capital, regiao, extensao, populacao, lingua_oficial, moeda, informacoes} = req.body;
  const pais = await Pais.create({
    nome,
    bandeira,
    capital,
    regiao,
    extensao,
    populacao,
    lingua_oficial,
    moeda,
    informacoes

  })
  res.render("cadastro",{pais})
});
  
app.get("/editar", (req, res) => {
  res.render("editar"); 
});
//updeate
app.get("/editar/:id", async (req, res) => {
    const pais = await Pais.findByPk(req.params.id);
  
    if (!pais) {
      res.render("editar", {
        pais,
        message: "País não encontrado!",
      });
    }
  
    res.render("editar", {
      pais, message
    });
});

app.post("/editar/:id", async (req, res) => {
    const pais = await Pais.findByPk(req.params.id);
  
    const { bandeira, nome, capital, regiao, extensao, populacao, lingua_oficial, moeda, informacoes } = req.body;
  
    pais.bandeira = bandeira;
    pais.nome = nome;
    pais.capital = capital;
    pais.regiao = regiao;
    pais.extensao = extensao;
    pais.populacao = populacao;
    pais.lingua_Oficial= lingua_oficial;
    pais.moeda = moeda;
    pais.informacoes = informacoes;
  
    const paisEditado = await pais.save();
  
    res.render("editar", {
      pais: paisEditado,
      message: "País editado com sucesso!",
    });
  });

  app.get("/deletar", (req, res) => {
    res.render("deletar"); 
  });
  //delete
  app.get("/deletar/:id", async (req, res) => {
    const pais = await Paises.findByPk(req.params.id);
  
    if (!pais) {
      res.render("deletar", {
        pais,
        message: "País não encontrado!",
      });
    }
  
    res.render("deletar", {
      pais, message
    });
  });
  
  
  app.post("/deletar/:id", async (req, res) => {
    const pais = await Paises.findByPk(req.params.id);
  
    if (!pais) {
      res.render("deletar", {
        mensagem: "País não encontrado!",
      });
    }
  
    await pais.destroy();
  
    res.redirect("/paises");
  });
  

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));