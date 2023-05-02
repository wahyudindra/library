import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}
