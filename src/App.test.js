import App from './App';
import request from 'supertest';

const app = App().app;

test( 'Testing root api path', async () => {

  const response = await request( app ).get( '/api/' );

  console.log( response.body );
  
  expect( response.statusCode ).toBe( 201 );


} )