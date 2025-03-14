const dbConfig: any = {
  type: 'sqlite',
  synchronize: false,
  migrations: ['@migrations/*.ts'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.development.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.test.sqlite',
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment');
}

export default dbConfig;
