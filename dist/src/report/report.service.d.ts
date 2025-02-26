import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../user/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportService {
    private readonly reportRepo;
    constructor(reportRepo: Repository<Report>);
    getEstimate(estimate: GetEstimateDto): Promise<any>;
    create(report: CreateReportDto, user: User): Promise<Report>;
    approveReport(id: number): Promise<Report>;
}
