const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use (bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoppeng',
    port: '3309'
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/cadastrar', (req, res) => {
    const { nomeProd, precoCompra, quantidade, dataCompra } = req.body;

    const sql = "INSERT INTO produtos (nome, preco, quantidade, data_compra) VALUES (?, ?, ?, ?)";
    db.query(sql, [nomeProd, precoCompra, quantidade, dataCompra], (err, result) => {
        if(err) throw err;
        res.send("Produto cadastrado com sucesso!");
    });
});


app.listen(3010, () => {
    console.log(`O servidor está ativo em http://localhost:3010`);
});