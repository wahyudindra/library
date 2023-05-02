import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    @ApiProperty()
    author: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    stock?: number;
}
