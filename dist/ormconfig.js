"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig = {
    type: 'sqlite',
    synchronize: false,
    migrations: ['migrations/*.js'],
};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('unknown environment');
}
exports.default = dbConfig;
//# sourceMappingURL=ormconfig.js.map