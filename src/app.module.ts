import { BooksModule } from '@books/books.module';
import { MembersModule } from '@members/members.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), MembersModule, BooksModule],
})
export class AppModule {}
