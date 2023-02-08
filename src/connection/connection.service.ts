import { Injectable, OnModuleInit } from "@nestjs/common";
import mysql from "mysql2/promise";

@Injectable()
export class ConnectionService implements OnModuleInit {
  public connectionPool: mysql.Pool;
  constructor() { }

  async onModuleInit() {

    console.log('.env 설정파일');
    console.log(process.env);
    console.log(process.env.NODE_ENV);

    const env = process.env.NODE_ENV ? process.env : process.env.env;

    this.connectionPool = mysql.createPool({
      host: process.env.DB_HOST as string,
      user: process.env.DB_USER as string,
      password: process.env.DB_PASS as string,
      port: parseInt(process.env.DB_PORT as string) ?? 3306,
      database: process.env.DB_DATABASE as string,
      typeCast: function (field, next) {
        if (field.type === 'VAR_STRING') {
          return field.string('utf-8');
        }
        return next();
      }
    });

    console.log(`-------- ✅ START DB CONNECTION 🚀 --------`);
  };
}