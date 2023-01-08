const express = require('express');
const multer= require('multer'); //adicionado
const router = express.Router();

const ProdutosController = require('../controllers/ProdutosController');
const upload = require('../middlewares/multer');

router.get('/', ProdutosController.todosProdutos)

// pagina produtos
router.get('/todos', ProdutosController.todosProdutos)

// pagina categoria
router.get('/categoria/:categoria', ProdutosController.categoria)

// detalhe produto
router.get('/item/:id', ProdutosController.detalhe)

// // criar produto
router.get('/cadastrodeproduto', ProdutosController.cadProduto)
router.post('/',upload.single('image'), ProdutosController.novoProduto) //upload.single('image'),

// editar produto
router.get('/item/editar/:id', ProdutosController.editar)
router.patch('/item/editar/:id', ProdutosController.atualizar)

// deletar produto
router.delete('/item/deletar/:id', ProdutosController.apagar)


module.exports = router;