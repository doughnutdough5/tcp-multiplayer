import pools from '../../db/database.js';

export const testConnection = async () => {
  try {
    const [rows] = await pools.USER_DB.query('SELECT 1 + 1 AS solution');
    console.log(`테스트 쿼리 결과: ${rows[0].solution}`);
  } catch (err) {
    console.error(`테스트 쿼리 실행 오류: ${err}`);
  }
};
