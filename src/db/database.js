import mysql from 'mysql2/promise.js';
import { config } from '../config/config.js';
import { formatDate } from '../utils/dateFormatter.js';

const { database } = config;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10, // 커넥션 풀에서 최대 연결 수
    queueLimit: 0, // 0일 경우 무제한 대기열
  });

  const originQuery = pool.query;

  // 로깅을 위해 오버라이드 시켜주는 것
  pool.query = (sql, params) => {
    const date = new Date();
    console.log(
      `[${formatDate(date)}] Executing query: ${sql} ${
        params ? `, ${JSON.stringify(params)}` : ``
      }`,
    );

    return originQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = {
  USER_DB: createPool(database),
};

export default pools;
