import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { FindManyDto } from 'src/utils/dto/find-many.dto';

export class QueryBooksDto extends OmitType(FindManyDto, ['includes', 'searchBy', 'filter'] as const) {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        default: 'createdAt',
        description: 'orderBy can only contain code OR title OR author OR createdAt',
    })
    orderBy?: string = 'createdAt';

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Search can only consist of code, title, and author' })
    searchBy?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'Can only consist of borrows' })
    includes?: string;
}
