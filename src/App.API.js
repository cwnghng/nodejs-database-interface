import express from 'express';

const api = express.Router();

api

  .get( '/', function ( req, res ) {

    res.status( 201 ).json( { hey: 'hey' } );

  } )

export default api;