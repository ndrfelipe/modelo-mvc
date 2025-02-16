const mongoose = require('mongoose');
// MongoDB é um NoSQL
const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {

};

module.exports = HomeModel;