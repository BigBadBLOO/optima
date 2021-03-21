module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'dangerousefim',
    database: 'optima',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };