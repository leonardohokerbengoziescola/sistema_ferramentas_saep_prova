const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();

server.use(cors());
server.use(express.json());



server.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';
    connection.query(sql, (erro, results) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(results);
    });
});


server.get('/produtos/ordenados', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY NOME ASC';
    connection.query(sql, (erro, results) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(results);
    });
});

const PORT = 3025;


server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

