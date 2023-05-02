import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    imports: [CommonModule],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
