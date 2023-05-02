import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { QueryMembersDto } from './dto/query-members.dto';
import { QueryMemberDto } from './dto/query-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Get()
    findAll(@Query() query: QueryMembersDto) {
        return this.membersService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query() query: QueryMemberDto) {
        return this.membersService.findOne(id, { include: { borrows: !!query.includeBorrows } });
    }

    @Post()
    create(@Body() data: CreateMemberDto) {
        return this.membersService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateMemberDto) {
        return this.membersService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.membersService.remove(id);
    }
}
