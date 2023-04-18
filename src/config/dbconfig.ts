const mysql = require('mysql2');

let dbconnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

const query = (sqlQuery: string, values: any) => {
  if(!values) values = [];

  console.log(sqlQuery);
  console.log(values);

  return new Promise((resolve: any, reject: any) => {
    dbconnection.query(sqlQuery, values, (err: any, result: any) => {
      if(err){
        reject(err);
        return;
      }
      resolve(result);
    })
  });
}

export { dbconnection, query }