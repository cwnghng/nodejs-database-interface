import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

import App from './App';
import Logger from './Logger';

function Server () {

  const app = App().app;

  const options = {

    key: fs.readFileSync( path.join( __dirname, '../cert/key.pem' ) ),
    cert: fs.readFileSync( path.join( __dirname, '../cert/dev_cwnghng_xyz.crt' ) )

  }
  
  const httpsServer = https.createServer( options, app );

  function Start () {

    httpsServer.listen( process.env.PORT, () => {

      Logger.info( `DB Interface listening on port ${ process.env.PORT }` );

    } )

  }

  return {

    Start,

  }
    
}

Server().Start();