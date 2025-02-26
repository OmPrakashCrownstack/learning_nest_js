import { ReportService } from './report.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../user/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getEstimate(query: GetEstimateDto): Promise<any>;
    createReport(body: CreateReportDto, user: User): Promise<import("./report.entity").Report>;
    approveReport(id: string): Promise<import("./report.entity").Report>;
}
