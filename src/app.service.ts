import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ReportType, data } from './data';

interface Report {
  source: string;
  amount: number;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((r) => r.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report.filter((r) => r.type === type).find((r) => r.id === id);
  }

  createReport(type: ReportType, body: Report) {
    const newReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return newReport;
  }

  updateReport(type: ReportType, id: string, body: Report) {
    const reportToUpdate = data.report
      .filter((r) => r.type === type)
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
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((r) => r.id === id);

    if (reportIndex === -1) {
      return;
    }

    data.report.splice(reportIndex, 1);
    return;
  }
}
