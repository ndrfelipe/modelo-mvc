const mongoose = require('mongoose');
const validator = require('validator');
// MongoDB é um NoSQL
const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: false, default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: ''},
    criadoEm: { type: Date, default: Date.now }
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
}



// criando contato 
Contato.prototype.register = async function(){
    this.valida()
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
}


Contato.prototype.valida = function() {

        this.cleanUp();
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
        if(!this.body.nome) this.errors.push("Nome é um campo obrigatório. ");
        if(!this.body.email && !this.body.telefone) this.errors.push("Pelo menos um contato precisa ser enviado: email ou telefone. ")
        
    }

// Limpando os dados - Se forem diferentes do tipo string, substituir por '';
Contato.prototype.cleanUp = function() {
        for (const key in this.body){
           if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
           };
        };

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };
    };

// editando contato
Contato.prototype.edit = async function (id){
    if (typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
}

// Métodos estáticos

// Procurando contato por ID na base de dados
Contato.idSearch = async function(id){
    if(typeof id !== 'string') return;
    const contatoId = await ContatoModel.findById(id)
    return contatoId;
};

Contato.buscaContatos = async function(){
    const contatos = await ContatoModel.find().sort({ criadoEm: -1});;
    return contatos;
};

Contato.delete = async function(id){
    if(typeof id !== 'string') return;
    const contatos = await ContatoModel.findByIdAndDelete(id);
    return contatos;
};
module.exports = Contato;