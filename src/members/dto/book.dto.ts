import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    bookCode: string;
}
