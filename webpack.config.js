require( 'dotenv' ).config();
const path = require( 'path' );

module.exports = {

  entry: {

    dbinterface: "./src/index.js",

  },

  output: {

    path: path.resolve( __dirname, "./dist/" ),

    filename: "[name].bundle.js",

  },

  mode: process.env.MODE,

  target: "node",

}