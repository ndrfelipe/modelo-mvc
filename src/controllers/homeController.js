const HomeModel = require('../models/HomeModel')

HomeModel.create({
    titulo: 'Entrada AP',
    descricao: 'Reserva criada para acompanhar a quantia necessária para a entrada no AP'
})
    .then(dados => console.log(dados))
    .catch(e => console.log(e));

exports.paginaInicial = (req, res, next) => {
    res.render('index');
    next()
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return
}