exports.paginaInicial = (req, res, next) => {
    res.render('index', {
        titulo: 'Entre com seu usuário',
        num: [0, 1, 2, 3, 4]
    } );
    next()
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return
}