import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { FindManyDto } from '@utils/dto/find-many.dto';
import { IsOptional, IsString } from 'class-validator';

export class QueryMembersDto extends OmitType(FindManyDto, ['includes', 'searchBy', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ default: 'createdAt', description: 'orderBy can only consist of code, name, and createdAt' })
    orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Search can only consist of code and name' })
    searchBy?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Can only consist of borrows' })
    includes?: string;
}
