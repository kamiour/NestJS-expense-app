import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { v4 } from 'uuid';
import { data, ReportType } from './data';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report.filter((r) => r.type === recordType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return data.report
      .filter((r) => r.type === recordType)
      .find((r) => r.id === id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() body: { source: string; amount: number },
  ) {
    const newReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);
    return 'Created';
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() body: { source: string; amount: number },
  ) {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    const reportToUpdate = data.report
      .filter((r) => r.type === recordType)
      .find((r) => r.id === id);

    if (!reportToUpdate) {
      return 'No report to update found';
    }

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };

    return 'Updated';
  }

  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
