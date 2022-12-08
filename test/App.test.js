import App from '../src/App.js';
import request from 'supertest';

let app;

test( 'Testing create user api path', async () => {

  app = ( await App() ).app;

  const response = await request( app )
    .post( '/api/user' )
    .send( { username: 'Alex', addr: '0x001' } );

  expect( response.statusCode ).toBe( 201 );
  expect( response.body.status ).toBe( 'user created' );

} )

test( 'Testing read user api path', async () => {

  const response = await request( app ).get( '/api/user/1' );
  
  expect( response.statusCode ).toBe( 200 );
  expect( response.body.user_id ).toBe( '1' );
  expect( response.body.username ).toBe( 'Alex' );
  expect( response.body.addr ).toBe( '0x001' );

} )

test( 'Testing update user api path', async () => {

  const response1 = await request( app )
    .post( '/api/user/1/update' )
    .send( { username: 'Becky' } );
  
  expect( response1.statusCode ).toBe( 201 );
  expect( response1.body.status ).toBe( 'user updated' );

  const response2 = await request( app ).get( '/api/user/1' );

  expect( response2.statusCode ).toBe( 200 );
  expect( response2.body.user_id ).toBe( '1' );
  expect( response2.body.username ).toBe( 'Becky' );
  expect( response2.body.addr ).toBe( '0x001' );

} )

test( 'Testing delete user api path', async () => {

  const response1 = await request( app ).post( '/api/user/1/delete' );

  expect( response1.statusCode ).toBe( 201 );
  expect( response1.body.status ).toBe( 'user deleted' );

  const response2 = await request( app ).get( '/api/user/1' );

  expect( response2.statusCode ).toBe( 400 );

} )