var mongoose = require( 'mongoose' )

var edicaoSchema = new mongoose.Schema( {
	_id: { type: String, require : true },
	anoEdicao: Number,
	musicas: [{
		id: String,
		link: String,
		titulo: String,
		pais: String,
		compositor: String,
		interprete: String,
		letra: String
	}],
	organizacao: String,
	vencedor: String      
}, { versionKey : false, collection: 'edicoes' } );

module.exports = mongoose.model( 'Edicao', edicaoSchema );