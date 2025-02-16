const Contato = require("../models/ContatoModel")

exports.index = async (req, res, next) => {
    try{
        const contatos = await Contato.buscaContatos();
        res.render('index', { contatos });
    }catch(e){
        console.log(e);
        return res.render('404');
    }
    
}