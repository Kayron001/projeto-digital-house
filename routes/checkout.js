const express = require('express');
const router = express.Router();

const CheckoutController = require('../controllers/CheckoutController')

// carrinho
router.get('/', CheckoutController.view)

// ir checkout
router.post('/item/adicionar/:id', CheckoutController.iniciarCompra)

// adicionar itens
router.post('/item/adicionar-carrinho/:id', CheckoutController.adicionarCarrinho)

// comprar
router.delete('/finalizar-compra', CheckoutController.finalizarCompra)

// lista pedidos
router.get('/pedidos', CheckoutController.listaPedidos);

module.exports = router