require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const Paises = require("./models/Africa")

let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get("/home", (req, res) => {
    res.render("home"); 
});

app.get("/quemsomos", (req, res) => {
    res.render("quemsomos"); 
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro"); 
});
app.get("/sobre", (req, res) => {
    res.render("sobre"); 
});
app.get("/paises", (req, res) => {
    res.render("paises"); 
});
app.get("/detalhes", (req, res) => {
    res.render("detalhes"); 
});

//read

app.get("/paises", async (req, res) => {
    const paises = await Paises.findAll();
    res.render("paises", {
        paises, message
      });
});

app.get("/detalhes/:id", async (req, res) => {
    const pais = await Paises.findByPk(req.params.id);
    res.render("detalhes", {
        pais,
      });
});



//create
app.get("/cadastro", (req, res) => {
    res.render("cadastro", {message});
    });
  app.post("/cadastro", async (req, res) => {

    const { bandeira, nome, capital, regiao, extensao, populacao, lingua, moeda} = req.body;
  
    if (!bandeira) {
      res.render("cadastro", {
        message: "Bandeira é obrigatório",
      });
    }
    else if (!nome) {
      res.render("cadastro", {
        message: "Nome é obrigatório",
      });
    }
    else if (!capital) {
        res.render("cadastro", {
          message: "Capital é obrigatório",
        });
    }
    else if (!regiao) {
        res.render("cadastro", {
          message: "Região é obrigatório",
        });
    }
    else if (!extensao) {
        res.render("cadastro", {
          message: "Região é obrigatório",
        });
    }
    else if (!populacao) {
        res.render("cadastro", {
          message: "População é obrigatório",
        });
    }
    else if (!lingua) {
        res.render("cadastro", {
          message: "Lingua é obrigatório",
        });
    }
    else if (!moeda) {
        res.render("cadastro", {
          message: "População é obrigatório",
        });
    }       
    else {
      try {
          const pais = await Paises.create({
                bandeira,
                nome,
                capital,
                regiao,
                extensao,
                populacao,
                lingua,
                moeda,        
            });
  
            res.redirect("/cadastro");
        } 
        catch (err) {
            console.log(err);
            
            res.render("criar", {
            message: "Ocorreu um erro ao cadastrar o Filme!",
            });
        }
    }
});
  
//updeate
app.get("/editar/:id", async (req, res) => {
    const pais = await Paises.findByPk(req.params.id);
  
    if (!pais) {
      res.render("editar", {
        filme,
        message: "País não encontrado!",
      });
    }
  
    res.render("editar", {
      pais, message
    });
});

app.post("/editar/:id", async (req, res) => {
    const pais = await Paises.findByPk(req.params.id);
  
    const { bandeira, nome, capital, regiao, extensao, populacao, lingua, moeda, informacoes } = req.body;
  
    pais.bandeira = bandeira;
    pais.nome = nome;
    pais.capital = capital;
    pais.regiao = regiao;
    pais.extensao = extensao;
    pais.populacao = populacao;
    pais.lingua= lingua;
    pais.moeda = moeda;
    pais.informacoes = informacoes;
  
    const paisEditado = await pais.save();
  
    res.render("editar", {
      pais: paisEditado,
      message: "País editado com sucesso!",
    });
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