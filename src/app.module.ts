import { MembersModule } from '@members/members.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), MembersModule],
})
export class AppModule {}
