import dotenv from 'dotenv';
dotenv.config();

import { createLogger, transports, format } from 'winston';
import path from 'path';

const {

  LOG_PATH,
  LOG_INFO_FILE,
  LOG_ERROR_FILE

} = process.env;

const customFormat = format.combine(

  format.timestamp(),

  format.errors( { 

    stack: true,

  } ),

  format.printf( ( info ) => {

    return `[ ${ info.level.toUpperCase() } ] ${ info.timestamp }: ${ info.message }${ info.stack ? '\n' : '' }${ info.stack ? info.stack : '' }\n`;

  } )

)

const logPath = path.join( LOG_PATH, LOG_INFO_FILE );
const errorPath = path.join( LOG_PATH, LOG_ERROR_FILE );

const Logger = createLogger( {

  format: customFormat,

  transports: [

    new transports.Console( { 
      level: 'info' 
    } ),

    new transports.File( { 
      filename: logPath, 
      level: 'info',
    } ),

    new transports.File( { 
      filename: errorPath, 
      level: 'error' 
    } ),

  ]

} )

export default Logger;