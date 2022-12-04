import mysql from 'mysql2';
import Commands from './DbInterface.Commands.js';

const {

  SQL_DATABASE,
  SQL_PASSWORD,
  SQL_HOST

} = process.env;

async function DbInterface () {

  const DB = initDB();

  function initDB() {

    
    
  }

}

export default DbInterface;