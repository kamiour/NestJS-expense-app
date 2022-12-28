import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private reportService: ReportService) {}

  calculateSummary() {
    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((acc, report) => acc + report.amount, 0);

    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((acc, report) => acc + report.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
