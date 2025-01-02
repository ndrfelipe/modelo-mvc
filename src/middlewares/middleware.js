exports.middlewareGlobal = (req, res, next) =>{
    if(req.body.cliente){
        req.body.cliente = req.body.cliente.replace('Felipe', 'Braga')
        console.log(`Olá ${req.body.cliente}`);
    }
    next()
};