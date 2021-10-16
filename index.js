const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));