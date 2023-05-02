import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './../common/prisma.service';
import { BaseRepository } from './../utils/base-repository';

@Injectable()
export class BooksService extends BaseRepository {
    constructor(prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Book);
    }
}
