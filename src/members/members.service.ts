import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '@utils/base-repository';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class MembersService extends BaseRepository {
    constructor(prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Member);
    }
}
