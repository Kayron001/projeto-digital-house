let express = require('express');
let router = express.Router();

const UsuariosController = require('../controllers/usuariosController');


//todos usuarios
router.get('/', UsuariosController.todosUsuarios);

//criar usuario
router.post('/', UsuariosController.criarUsuario)

//login
router.get('/login', UsuariosController.pagLogin)

//cadastro
router.get('/cadastro', UsuariosController.pagCadastro)

module.exports = router;
