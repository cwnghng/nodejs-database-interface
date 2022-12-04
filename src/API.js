import express from 'express';

const api = express.Router();

api

  .get( '/', function ( req, res ) {

    res.send( 'hey' );

  } )

export default api;