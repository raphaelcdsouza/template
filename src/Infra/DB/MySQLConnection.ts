import mysql from 'mysql2';
import { Pool, RowDataPacket } from 'mysql2/promise';

import { ISQLDatabase } from '../Interfaces/DB';
import { logger } from '../../Utils';

type MySQLConnectionConfig = {
  host: string | undefined
  port: number
  user: string | undefined
  password: string | undefined
  database: string | undefined
}

export class MySQLConnection implements ISQLDatabase {
  private pool: Pool;

  constructor(config: MySQLConnectionConfig) {
    this.pool = mysql.createPool(config).promise();
  }

  public async query <K>(query: string, values?: any[]): Promise<K> {
    const client = await this.pool.getConnection();

    try {
      const [rows] = await client.query<[K & RowDataPacket[]]>(query, values);
      return rows[0];
    } catch (err) {
      if (process.env.NODE_ENV === 'development') logger(err);
      throw err;
    } finally {
      client.release();
    }
  }
}