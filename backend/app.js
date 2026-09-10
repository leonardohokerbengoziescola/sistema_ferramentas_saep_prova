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

server.get('/produtos/:id', (req, res) => {
    const{id} = req.params;
    const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

server.get('/produtos/busca/:nome', (req, res) => {
    const sql = 'SELECT * FROM PRODUTO WHERE NOME LIKE ?';
    const termoBusca = '%' + req.params.nome + '%';

    connection.query(sql, [termoBusca], (erro, resultados) => {
        if(erro){
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

const PORT = 3025;  


server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

