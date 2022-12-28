import {
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Body, HttpCode } from '@nestjs/common/decorators';
import { ReportType } from 'src/data';
import {
  ReportResponseDto,
  CreateReportDto,
  UpdateReportDto,
} from 'src/dtos/report.dto';
import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getAllReports(recordType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getReportById(recordType, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: CreateReportDto,
  ): ReportResponseDto {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.createReport(recordType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto {
    const recordType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.updateReport(recordType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
