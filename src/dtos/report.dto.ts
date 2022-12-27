import { Exclude, Expose } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  type: ReportType;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partialReport: Partial<ReportResponseDto>) {
    Object.assign(this, partialReport);
  }
}
