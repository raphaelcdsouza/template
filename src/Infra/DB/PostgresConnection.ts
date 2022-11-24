import { Pool, QueryResultRow } from 'pg';

import { ISQLDatabase } from '../Interfaces/DB';
import { logger } from '../../Utils';
import { DatabaseError } from '../../Errors';
import { postgresErrorMapper } from '../../Utils/DB/Error';

type PGConnectionConfig = {
  host: string | undefined
  port: number
  user: string | undefined
  password: string | undefined
  database: string | undefined
}

export class PostgresConnection implements ISQLDatabase<QueryResultRow> {
  private pool: Pool;

  constructor(config: PGConnectionConfig) {
    this.pool = new Pool({ ...config });
  }

  public async query <K extends QueryResultRow>(query: string, values?: any[]): Promise<K> {
    const client = await this.pool.connect();

    try {
      const { rows } = await client.query<K>(query, values);
      return rows[0];
    } catch (err: any) {
      if (process.env.NODE_ENV === 'development') logger(err);
      throw new DatabaseError(err.message, postgresErrorMapper(err.code), 'postgres', err.code);
    } finally {
      client.release();
    }
  }
}
