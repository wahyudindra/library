import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
    imports: [CommonModule],
    controllers: [MembersController],
    providers: [MembersService],
})
export class MembersModule {}
