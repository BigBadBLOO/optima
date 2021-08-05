module.exports = {
  type: 'postgres',
  // host: 'pgsql-server',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'dangerousefim',
  database: 'optima',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: true,
};
