import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import Commands from './DbInterface.Commands.js';
import Logger from './Logger';

async function DbInterface ( host, username, password, database, params = {} ) {

  const db = new Sequelize( database, username, password, {

    host, dialect: 'mysql', logging: message => Logger.info( message )

  } );

  try {

    await db.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {

    console.error('Unable to connect to the database:', error);

  }

  const commands = setupCommands();

  return {



  }

  function initDB() {


    
  }

  async function isDbExist() {

    const connection = mysql.createConnection( {

      host, username, password

    } );

    connection.connect();

    const sql = `SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${ SQL_DATABASE }`;

    return new Promise( ( resolve, reject ) => {

      connection.query( sql, ( error, result ) => {

        connection.end();

        if ( error ) {

          Logger.error( error );

          reject( error );

        } else if ( result.length === 0 ) {

          Logger.debug( `Database ${ database } does not exist` );

          resolve( false );

        } else {

          Logger.debug( `Database ${ database } exists` );

          resolve( true );

        }

      } )

    } )

  }

  async function runCommand ( cmd, params ) {

    try {

      const response = await cmd( DB, params );

      Logger.info( response.message );

      return response.result;

    }

    catch ( error ) {

      Logger.error( error );

    }
    
  }

}

export default DbInterface;