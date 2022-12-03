import dotenv from 'dotenv';
dotenv().config();

import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';

function App () {

  const app = express();
  app.use( express.json() );
  
  const httpsServer = https.createServer( app );

  function Start () {

    console.log( process.env.PORT )

  }
    
}

App().Start();