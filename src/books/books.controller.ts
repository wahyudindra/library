import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { QueryBooksDto } from './dto/query-books.dto';
import { QueryBookDto } from './dto/query-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    findAll(@Query() query: QueryBooksDto) {
        return this.booksService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query() query: QueryBookDto) {
        return this.booksService.findOne(id, { include: { borrows: !!query.includeBorrows } });
    }

    @Post()
    create(@Body() data: CreateBookDto) {
        return this.booksService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.booksService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(id);
    }
}
