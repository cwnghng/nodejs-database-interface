import dotenv from 'dotenv';
dotenv.config();

import DbInterface from "./DbInterface";

const 
  HOST = process.env.SQL_HOST,
  USERNAME = process.env.SQL_USERNAME,
  PASSWORD = process.env.SQL_PASSWORD,
  DATABASE = 'database_test';

let DB

test( 'Connect to database', async () => {

  DB = await DbInterface( HOST, USERNAME, PASSWORD, DATABASE );

  expect( DB.status ).toBe( 'connected' );

} )

test( 'Users table is empty at start', async () => {

  const users = await DB.readAll( 'users' );

  expect( users.length ).toBe( 0 );

})

test( 'Testing readAll() after creating user', async () => {

  const createOptions = {

    username: 'John',
    addr: '0x001',

  }

  await DB.create( 'users', createOptions );

  const users = await DB.readAll( 'users' );

  const expectedDataValues = {

    user_id: 1,
    username: 'John',
    addr: '0x001',

  }
  
  expect( users.length ).toBe( 1 );
  expect( users[ 0 ].dataValues.user_id ).toBe( expectedDataValues.user_id );
  expect( users[ 0 ].dataValues.username ).toBe( expectedDataValues.username );
  expect( users[ 0 ].dataValues.addr ).toBe( expectedDataValues.addr );

} )

test( 'Testing readAll() after creating second user', async () => {

  const createOptions = {

    username: 'Jane',
    addr: '0x002',

  }
  
  const res = await DB.create( 'users', createOptions );

  const users = await DB.readAll( 'users' );

  const expectedDataValues = {

    user_id: 2,
    username: 'Jane',
    addr: '0x002',

  }

  expect( users.length ).toBe( 2 );
  expect( users[ 1 ].dataValues.user_id ).toBe( expectedDataValues.user_id );
  expect( users[ 1 ].dataValues.username ).toBe( expectedDataValues.username );
  expect( users[ 1 ].dataValues.addr ).toBe( expectedDataValues.addr );

} )

test( 'Testing read() on specific user by addr', async () => {

  const readOptions = {

    addr: '0x002',

  }

  const user = await DB.read( 'users', readOptions );

  const expectedDataValues = {

    user_id: 2,
    username: 'Jane',
    addr: '0x002',

  }

  expect( user.dataValues.user_id ).toBe( expectedDataValues.user_id );
  expect( user.dataValues.username ).toBe( expectedDataValues.username );
  expect( user.dataValues.addr ).toBe( expectedDataValues.addr );

} )

test( 'Testing read() on nonexistent user', async () => {

  const readOptions = {

    addr: '0x101',

  }

  const user = await DB.read( 'users', readOptions );

  expect( user ).toBe( undefined );

} )

test( 'Testing createBatch()', async () => {

  const batchOptions = [];

  for ( let i = 0; i < 10; i++ ) {

    batchOptions[ i ] = {

      username: 'Batch user ' + i,
      addr: '0x00' + ( i + 3 ),

    }
  
  }

  await DB.createBatch( 'users', batchOptions );

  for ( let i = 0; i < 10; i++ ) {

    const readOption = {

      addr: batchOptions[ i ].addr,

    }

    const user = await DB.read( 'users', readOption );

    expect( user.dataValues.username ).toBe( batchOptions[ i ].username );

  }

} )

test( 'Testing create() with existing addr', async () => {

  const createOptions = {

    username: 'Imposter',
    addr: '0x002',

  }

  let error;

  await DB.create( 'users', createOptions )
  .catch( err => error = err );

  expect( error.message ).toBe( 'Validation error' );

} )

test( 'Testing update()', async () => {

  const readOptions = {

    addr: '0x004',

  }

  const updateOptions = {

    username: 'Updated user',
    
  }

  await DB.update( 'users', readOptions, updateOptions );

  const user = await DB.read( 'users', readOptions );

  expect( user.dataValues.username ).toBe( updateOptions.username );

} )

test( 'Testing remove()', async () => {

  const readOptions = {

    addr: '0x005',
    
  }

  await DB.remove( 'users', readOptions );

  const user = await DB.read( 'users', readOptions );

  expect( user ).toBe( undefined );

})