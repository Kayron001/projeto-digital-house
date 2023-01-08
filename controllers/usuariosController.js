const fs = require('fs')
const path = require('path')

const usuariosArquivoBase = path.join(__dirname, '../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosArquivoBase, 'utf-8'))

const UsuariosController = {
    pagLogin: (req, res) => {
        return res.render('../views/login.ejs')
    },
    pagCadastro: (req, res) => {
        return res.render('../views/loginCadastro.ejs')
    },
    todosUsuarios: (req, res) => {
        return res.render('pagUsuarios')
    },

    criarUsuario: (req, res) => {
        const email = req.body.email
        const emailConfirmacao = req.body.emailConfirmacao
        const senha = req.body.senha
        const senhaConfirmacao = req.body.senhaConfirmacao
        const confirmarUsuario = usuarios.find(usuarios => usuarios.email === req.body.email)
        console.log(req.body)

        if (email === confirmarUsuario?.email) {
            res.render('errorUsuario')
        } else if (email !== emailConfirmacao || senha !== senhaConfirmacao) {
            res.render('errorUsuario')

        } else if (email === emailConfirmacao && senha === senhaConfirmacao) {
            let novoUsuario = {
                id: usuarios[usuarios.length - 1].id + 1,
                email: email,
                senha: senha
            }
            usuarios.push(novoUsuario)
            fs.writeFileSync(usuariosArquivoBase, JSON.stringify(usuarios, null, ' '))
            res.redirect('/usuarios/login');
        }
    }
}

module.exports = UsuariosController;