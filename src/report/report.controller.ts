import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGuard } from '../user/guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDetailsDto } from './dtos/report-details.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { AdminGuard } from '../user/guards/admin.guard';

@Controller('report')
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/')
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.getEstimate(query);
  }

  @Post()
  @Serialize(ReportDetailsDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id/approve')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string) {
    return this.reportService.approveReport(+id);
  }
}
