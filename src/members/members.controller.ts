import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { QueryMembersDto } from './dto/query-members.dto';
import { QueryMemberDto } from './dto/query-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { BookDto } from './dto/book.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Get()
    findAll(@Query() query: QueryMembersDto) {
        return this.membersService.findAll(query);
    }

    @Get(':code')
    findOne(@Param('code') code: string, @Query() query: QueryMemberDto) {
        return this.membersService.findOne(code, { include: { borrows: !!query.includeBorrows } });
    }

    @Post()
    create(@Body() data: CreateMemberDto) {
        return this.membersService.create(data);
    }

    @Patch(':code')
    update(@Param('code') code: string, @Body() data: UpdateMemberDto) {
        return this.membersService.update(code, data);
    }

    @Delete(':code')
    remove(@Param('code') code: string) {
        return this.membersService.remove(code);
    }

    @Post(':code/borrow-book')
    borrowBook(@Param('code') code: string, @Body() data: BookDto) {
        return this.membersService.borrowBook(code, data.bookCode);
    }
}
