import mysql from 'mysql';

const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'sqluser',
  password: 'root',
  database: 'challengefinal',
  connectionLimit: 10,
});

db.getConnection((error: mysql.MysqlError | null) => {
  if (error) {
    throw error;
  }
  console.log('La base de données est maintenant opérationnelle.');
});

export default db;
