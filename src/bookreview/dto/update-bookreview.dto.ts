import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateBookReviewDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;
}
