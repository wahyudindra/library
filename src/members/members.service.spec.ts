import { PrismaService } from './../common/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from './members.service';

describe('Members Service', () => {
    let service: MembersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MembersService, PrismaService],
        }).compile();

        service = module.get<MembersService>(MembersService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    });
});
