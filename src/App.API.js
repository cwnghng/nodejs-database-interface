import express from 'express';
import DbInterface from './DbInterface';

const api = express.Router();

api

  // Create User
  .post( '/user', async function ( req, res ) {

    res.status( 201 ).json( { id: 'new' } );

  } )

  // Read User
  .get( '/user/:id', async function ( req, res ) {

    res.status( 200 ).json( { id: req.params.id } );

  } )

  // Update User
  .post( '/user/:id/update', async function ( req, res ) {

    res.status( 201 ).json( {} );

  } )

  // Delete User
  .post( '/user/:id/delete', async function ( req, res ) {

    res.status( 201 ).json( {} );

  } )

export default api;