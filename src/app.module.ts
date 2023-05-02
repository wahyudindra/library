import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';

@Module({
    imports: [ConfigModule.forRoot(), MembersModule, BooksModule],
})
export class AppModule {}
