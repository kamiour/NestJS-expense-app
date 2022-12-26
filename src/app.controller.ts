import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Body, HttpCode } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { ReportType } from './data';

@Controller('report/:type')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getAllReports(recordType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(recordType, id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() body: { source: string; amount: number },
  ) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport(recordType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReport(recordType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}
