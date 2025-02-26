import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../user/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepo: Repository<Report>,
  ) {}

  getEstimate(estimate: GetEstimateDto) {
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

  create(report: CreateReportDto, user: User) {
    const newReport = this.reportRepo.create(report);
    newReport.user = user;
    return this.reportRepo.save(newReport);
  }

  async approveReport(id: number) {
    const report = await this.reportRepo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = true;
    return this.reportRepo.save(report);
  }
}
