import { Sequelize } from 'sequelize';
// import Commands from './DbInterface.Commands.js';
import Logger from './Logger';
import * as Models from './DbInterface.Models';

async function DbInterface ( host, username, password, database, params = {} ) {

  const isTest = ( database.substr( database.length - 5 ) === '_test' );
  const DB = new Sequelize( database, username, password, {

    host, dialect: 'mysql', 
    logging: ( isTest ? 
      () => null 
      // message => Logger.info( message ) 
      : 
      message => Logger.info( message ) 
    ),
    dialectModule: require('mysql2')

  } );

  let status;
  const tables = {}

  // Connecting to the database;
  try {

    await DB.authenticate();
    status = 'connected';
    Logger.info( 'Database connection has been established successfully.' );

  } catch (error) {

    status = 'disconnected';
    Logger.error( error );
    throw Error( error );

  }

  await defineModel( 'users', Models.UserModel );

  return {

    status,
    isTest,
    create,
    createBatch,
    read,
    readAll,
    update,
    remove

  }

  async function create ( table, options ) {

    try {

      const entry = tables[ table ].build( options );

      const response = await entry.save();

      return response;

    } catch ( error ) {

      throw error;

    }

  }

  async function createBatch ( table, batchOptions ) {

    const saves = [];

    try {

      batchOptions.forEach( async ( options, index ) => {

        saves[ index ] = create( table, options );

      } )

      await Promise.all( saves );
      
      return;

    } catch ( error ) {

      throw error;

    }

  }

  async function read ( table, options ) {

    try {

      const entries = await tables[ table ].findAll( {

        where: options,

      } )

      const entry = entries[ 0 ];

      return entry;

    } catch ( error ) {

      throw error;

    }

  }

  async function readAll ( table ) {

    try {

      const entries = await tables[ table ].findAll();

      return entries;

    } catch ( error ) {

      throw error;

    }
    
  }

  async function update ( table, readOptions, updateOptions ) {

    try {

      const entry = await read( table, readOptions ); 

      for ( const [ key, value ] of Object.entries( updateOptions ) ) {

        !value && delete updateOptions[ key ];

      }

      entry.set( updateOptions );

      const response = await entry.save();

      return response;

    } catch ( error ) {

      throw error;

    }

  }

  async function remove ( table, readOptions ) {

    try {

      await tables[ table ].destroy( {

        where: readOptions

      } )

      return;

    } catch ( error ) {

      throw error;

    }

  }

  async function defineModel ( modelName, modelOptions ) {

    try {

      const model = DB.define( modelName, modelOptions, {
        freezeTableName: true
      } )

      isTest && model.sync( { force: true } );

      tables[ modelName ] = model;

      await model.sync();

      return;

    } catch ( error ) {

      throw error;

    }

  }

}

export default DbInterface;