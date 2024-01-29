import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateMyPageDto {
  @IsString()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsArray()
  @IsOptional()
  wish_list: string[] = [];

  @IsArray()
  @IsOptional()
  like_store: string[] = [];
}
