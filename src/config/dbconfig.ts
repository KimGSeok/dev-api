const mysql = require('mysql2');

let dbconnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

const query = (sqlString: string, values: any) => {
  if(!values) values = [];

  return new Promise((resolve: any, reject: any) => {
    dbconnection.query(sqlString, values, (err: any, result: any) => {
      if(err){
        reject(err);
        return;
      }
      resolve(result);
    })
  });
}

const queryOne = (sqlString: string, values: any) =>{
  if(!values) values = [];

  return new Promise((resolve, reject) => {
    dbconnection.query(sqlString, values, (error, result) => {
      if(error){
        reject(error);
        return;
      }
      resolve(result[0]);
    })
  })
}

export { dbconnection, query, queryOne }