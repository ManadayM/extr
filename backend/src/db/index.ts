import { Pool, PoolConfig } from "pg";

class DB {
  _pool?: Pool;

  connect(options: PoolConfig) {
    this._pool = new Pool(options);

    // This will force the pool to establish a db connection
    // with the supplied connection options. This way 
    // you can verify the connection credential right away!
    return this._pool.query('SELECT 1 + 1;');
  }

  close() {
    return this._pool?.end();
  }

  query(sql: string, params: any) {
    return this._pool?.query(sql, params);
  }
}

export default new DB();
