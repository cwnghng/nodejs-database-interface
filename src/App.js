import express from 'express';

import API from './App.API';
import Logger from './Logger';

async function App () {

  Logger.info( 'Starting Express application' )

  const app = express();

  const api = await API();

  app.use( express.json() );
  app.use( '/api', api );

  return {

    app,

  }
  
}

export default App;