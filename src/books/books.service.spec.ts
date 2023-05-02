import { PrismaService } from './../common/prisma.service';
import { BooksService } from './books.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('Books Service', () => {
    let service: BooksService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, PrismaService],
        }).compile();

        service = module.get<BooksService>(BooksService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    });
});
