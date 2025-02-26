"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const report_entity_1 = require("./report.entity");
const typeorm_2 = require("@nestjs/typeorm");
let ReportService = class ReportService {
    reportRepo;
    constructor(reportRepo) {
        this.reportRepo = reportRepo;
    }
    getEstimate(estimate) {
        const { make, model, lat, lng, year, mileage } = estimate;
        return this.reportRepo
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('lat  = :lat BETWEEN -5 AND 5', { lat })
            .andWhere('lng  = :lng BETWEEN -5 AND 5', { lng })
            .andWhere('year = :year BETWEEN -3 AND 3', { year })
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }
    create(report, user) {
        const newReport = this.reportRepo.create(report);
        newReport.user = user;
        return this.reportRepo.save(newReport);
    }
    async approveReport(id) {
        const report = await this.reportRepo.findOne({ where: { id } });
        if (!report) {
            throw new common_1.NotFoundException('Report not found');
        }
        report.approved = true;
        return this.reportRepo.save(report);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ReportService);
//# sourceMappingURL=report.service.js.map