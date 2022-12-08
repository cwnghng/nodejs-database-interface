import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import DbInterface from './DbInterface';
import Logger from './Logger';

const {

  SQL_DATABASE,
  SQL_HOST,
  SQL_USERNAME,
  SQL_PASSWORD

} = process.env;

async function API () {

  const DB = await DbInterface( SQL_HOST, SQL_USERNAME, SQL_PASSWORD, SQL_DATABASE );

  const api = express.Router();

  api

    // Create User
    .post( '/user', async function ( req, res ) {

      try {

        const { username, addr } = req.body;

        const createOptions = { username, addr };

        DB.create( 'users', createOptions );

        res.status( 201 ).json( { status: 'user created' } );

      } catch ( error ) {

        res.status( 400 ).json( { error: error.message, status: 'user not created' } );

      }

    } )

    // Read User
    .get( '/user/:id', async function ( req, res ) {

      try {

        const readOptions = { user_id: req.params.id };
        const user = ( await DB.read( 'users', readOptions ) ).dataValues;
  
        const userInfo = {
  
          user_id: user.user_id.toString(),
          username: user.username,
          addr: user.addr,
          date_created: user.createdAt
  
        }
  
        res.status( 200 ).json( userInfo );

      } catch ( error ) {

        res.status( 400 ).send( error.message );

      }

    } )

    // Update User
    .post( '/user/:id/update', async function ( req, res ) {

      try {

        const { username, addr } = req.body;

        const readOptions = { user_id: req.params.id };
        const updateOptions = { username, addr };
        await DB.update( 'users', readOptions, updateOptions );

        res.status( 201 ).json( { status: 'user updated' } );

      } catch ( error ) {

        Logger.error( error );
        res.status( 400 ).send( error.message );

      }

    } )

    // Delete User
    .post( '/user/:id/delete', async function ( req, res ) {

      try {

        const readOptions = { user_id: req.params.id };
        await DB.remove( 'users', readOptions );

        res.status( 201 ).json( { status: 'user deleted' } );

      } catch ( error ) {

        res.status( 400 ).send( error.message );

      }

    } )

  return api;

}

export default API;