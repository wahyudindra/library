import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    @ApiProperty()
    name: string;
}
