const express = require('express');
const path = require('path');

const app = express();
const PORT = 80;

// Servir os arquivos estáticos da pasta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Rota principal para servir o index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});
