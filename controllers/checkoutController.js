const fs = require('fs')
const path = require('path')

const produtosArquivoBase = path.join(__dirname, '../data/produtos.json')
const produtos = JSON.parse(fs.readFileSync(produtosArquivoBase, 'utf-8'))

const carrinhoArquivoBase = path.join(__dirname, '../data/carrinho.json')
const carrinho = JSON.parse(fs.readFileSync(carrinhoArquivoBase, 'utf-8'))

const pedidosArquivoBase = path.join(__dirname, '../data/pedidos.json')
const pedidos = JSON.parse(fs.readFileSync(pedidosArquivoBase, 'utf-8'))

const paraMil = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const CheckoutController = {
    view: (req, res) => {
        let id = req.params.id
        let produto = produtos.find(produtos => produtos.id == id)
        return res.render('checkout', {
            id,
            carrinho,
            paraMil
        })
    },

    iniciarCompra: (req, res) => {

        let selecionarProduto = {
            id: req.body.id,
            nome: req.body.nome,
            preco: req.body.preco,
            desconto: req.body.desconto,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            src: req.body.src
        }

        carrinho.unshift(selecionarProduto)
        fs.writeFileSync(carrinhoArquivoBase, JSON.stringify(carrinho, null, ' '))
        res.redirect('/checkout');
    },
    adicionarCarrinho: (req, res) => {

        let selecionarProduto = {
            id: req.body.id,
            nome: req.body.nome,
            preco: req.body.preco,
            desconto: req.body.desconto,
            descricao: req.body.descricao,
            categoria: req.body.categoria,
            src: req.body.src
        }

        carrinho.unshift(selecionarProduto)
        fs.writeFileSync(carrinhoArquivoBase, JSON.stringify(carrinho, null, ' '))
        res.redirect(`/produtos/item/${req.body.id}`);
    },

    finalizarCompra: (req, res) => {

        let id = req.params.id
        let finalizar = carrinho.filter(carrinho => carrinho.id === id)

        let itens = carrinho.map(elemento => {
            let preco = Number(elemento.preco)
            let valorDesconto = (preco * (1 - elemento.desconto))
            return { nome: elemento.nome, valor: valorDesconto }
        })
        let novoItemLista = [{
            id: pedidos.length + 1,
            itens
        }]

        pedidos.push(...novoItemLista)

        fs.writeFileSync(pedidosArquivoBase, JSON.stringify(pedidos, null, ' '))
        fs.writeFileSync(carrinhoArquivoBase, JSON.stringify(finalizar, null, ' '))

        res.redirect('/checkout/pedidos')
    },

    listaPedidos: (req, res) => {
        let id = req.params.id
        let lista = pedidos.find(pedidos => pedidos.id == id)
        return res.render('pagPedidos', {
            id,
            pedidos,
            paraMil
        })
    }
}


module.exports = CheckoutController