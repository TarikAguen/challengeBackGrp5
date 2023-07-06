import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootpassword',
  database: 'challengefinal',
  connectionLimit: 10,
});

export const getConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connexion à la base de données réussie !');
    return connection;
  } catch (error: any) {
    console.error('Erreur lors de la connexion à la base de données :', error.message);
    throw error;
  }
};

getConnection();
export default db;
