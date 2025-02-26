import { DataSource } from 'typeorm';
import dbConfig from './ormconfig';

export default new DataSource(dbConfig);
