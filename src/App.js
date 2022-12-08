import express from 'express';

import API from './App.API';
import Logger from './Logger';

function App () {

  Logger.info( 'Starting Express application' )

  const app = express();

  app.use( express.json() );
  app.use( '/api', API );

  return {

    app,

  }
  
}

export default App;