import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class QueryBookDto {
    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({ default: true, description: 'Can only be a boolean string' })
    @Transform(({ value }) => ['true', '1', true, 1].includes(value))
    includeBorrows?: string;
}
