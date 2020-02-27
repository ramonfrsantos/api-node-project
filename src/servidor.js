const porta = 3003; // porta = processo

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bancoDeDados = require('./bancoDeDados');

app.use(bodyParser.urlencoded({ extended: true })); // para qualquer req feita, ele vai passar por esse middleware (para o formato urlencoded ele faz o body parser)


app.get('/produtos', (req, res, next) => {
    res.send(bancoDeDados.getProdutos()); // para JSON
});

app.get('/produtos/:id', (req, res, next) => {
    res.send(bancoDeDados.getProduto(req.params.id));
});

app.post('/produtos', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    });
    res.send(produto); // para JSON
});

app.put('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    });
    res.send(produto); // para JSON
});

app.delete('/produtos/:id', (req, res, next) => {
    const produto = bancoDeDados.excluirProduto(req.params.id);
    res.send(produto); // para JSON
});

app.listen(porta, () => {
    console.log(`Servidor está executando na porta ${porta}.`);
});
