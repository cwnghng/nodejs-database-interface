import App from './App';
import request from 'supertest';

const app = App().app;

test( 'Testing create user api path', async () => {

  const response = await request( app ).post( '/api/user' );
  
  expect( response.statusCode ).toBe( 201 );
  expect( response.body.id ).toBe( 'new' );

} )

test( 'Testing read user api path', async () => {

  const response = await request( app ).get( '/api/user/0x001' );
  
  expect( response.statusCode ).toBe( 200 );
  expect( response.body.id ).toBe( '0x001' );

} )

test( 'Testing update user api path', async () => {

  const response = await request( app ).post( '/api/user/0x001/update' );
  
  expect( response.statusCode ).toBe( 201 );

} )

test( 'Testing delete user api path', async () => {

  const response = await request( app ).post( '/api/user/0x001/delete' );
  
  expect( response.statusCode ).toBe( 201 );

} )