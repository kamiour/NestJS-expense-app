import { Injectable } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { ReportResponseDto } from 'src/dtos/report.dto';
import { v4 } from 'uuid';

interface Report {
  source: string;
  amount: number;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((r) => r.type === type)
      .map((r) => new ReportResponseDto(r));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((r) => r.type === type)
      .find((r) => r.id === id);

    if (!report) {
      return;
    }

    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, body: Report): ReportResponseDto {
    const newReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: Partial<Report>,
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((r) => r.type === type)
      .find((r) => r.id === id);

    if (!reportToUpdate) {
      return;
    }

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
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
