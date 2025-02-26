import { Report } from '../report/report.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    isAdmin: boolean;
    reports: Report[];
}
