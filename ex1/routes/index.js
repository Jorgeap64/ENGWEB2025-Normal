var express = require('express');
var router = express.Router();
var Endicao = require( '../controllers/edicao' );

router.get( '/edicoes', async ( req, res ) => {
	try {
		if ( req.query.org ) {
			console.log( '1' );
			const data = await Endicao.getEdicoesByOrganizador( req.query.org );
			return res.status( 200 ).json( data );
		}
		if ( req.query.papel ) {
			console.log( '2');
			if ( req.query.papel === 'venc' ) {
				const data = await Endicao.getPaisesVencedores();
				return res.status( 200 ).json( data );
			}
			else if ( req.query.papel === 'org' ) {
				const data = await Endicao.getPaisesOrganizadores();
				return res.status( 200 ).json( data );
			}
			else {
				return res.status( 400 ).json( { error: 'Invalid papel query parameter' } );
			}
		}
		console.log( '3');
		const data = await Endicao.findAll();
		res.status( 200 ).json( data );
	} catch ( err ) {
		res.status( 500 ).json( { error: err.message } );
	}
});

router.get( '/edicoes/:id', async ( req, res ) => {
	try {
		const data = await Endicao.findById( req.params.id );
		if ( !data ) return res.status( 404 ).json({ error: 'Not found' });
		res.status( 200 ).json( data );
	} catch ( err ) {
		res.status( 500 ).json({ error: err.message });
	}
});

router.get( '/interpretes', async ( req, res ) => {
	try {
		const data = await Endicao.getInterpretes();
		if ( !data ) return res.status( 404 ).json({ error: 'Not found' });
		res.status( 200 ).json( data );
	} catch ( err ) {
		res.status( 500 ).json({ error: err.message });
	}
});

router.post( '/edicoes', async ( req, res ) => {
	try {
		const data = await Endicao.addEdicao( req.body );
		res.status( 201 ).json( data );
	} catch ( err ) {
		res.status( 400 ).json({ error: err.message });
	}
});

router.put( '/edicoes/:id', async ( req, res ) => {
	try {
		const data = await Endicao.updateEdicaoById( req.params.id, req.body );
		res.status( 200 ).json( data );
	} catch (err) {
		res.status( 400 ).json({ error: err.message });
	}
});

router.delete( '/edicoes/:id', async ( req, res ) => {
	try {
		await Endicao.deleteEdicaoById( req.params.id );
		res.status( 204 ).send();
	} catch (err) {
		res.status( 500 ).json({ error: err.message });
	}
});

module.exports = router;
