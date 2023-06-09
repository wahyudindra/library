import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as dayjs from 'dayjs';
import { ErrorMessage } from './../common/constants/error-message';
import { PrismaService } from './../common/prisma.service';
import { BaseRepository } from './../utils/base-repository';

@Injectable()
export class MembersService extends BaseRepository {
    constructor(private prisma: PrismaService) {
        super(prisma, Prisma.ModelName.Member);
    }

    async borrowBook(memberCode: string, bookCode: string) {
        const member = await this.prisma.member.findUnique({
            where: { code: memberCode },
            include: { borrows: { where: { returnedAt: null } } },
        });
        if (!member) throw new BadRequestException(ErrorMessage.NOT_FOUND + ' (member)');
        else if (member.borrows.length >= 2) throw new BadRequestException(ErrorMessage.LIMITED_BORROW);

        const book = await this.prisma.book.findUnique({
            where: { code: bookCode },
            include: { borrows: { where: { returnedAt: null } } },
        });
        if (!book) throw new BadRequestException(ErrorMessage.NOT_FOUND + ' (book)');
        if (book.stock <= book.borrows.length) throw new BadRequestException(ErrorMessage.ALL_BORROWED);

        const penaltyCount = await this.prisma.penalty.count({
            where: { borrow: { memberCode }, createdAt: { gte: dayjs().add(-3, 'hour').toDate() } },
        });
        if (penaltyCount) throw new BadRequestException(ErrorMessage.MEMBER_PENALIZED);

        return await this.prisma.borrow.create({ data: { bookCode, memberCode } });
    }

    async returnsBook(memberCode: string, bookCode: string) {
        const borrow = await this.prisma.borrow.findFirst({
            where: { memberCode, bookCode, returnedAt: null },
            orderBy: { createdAt: 'asc' },
        });
        if (!borrow) throw new BadRequestException(ErrorMessage.MEMBER_NOT_BORROW);

        return await this.prisma.borrow.update({
            where: { id: borrow.id },
            include: { penalty: true },
            data: {
                returnedAt: dayjs().toDate(),
                ...(dayjs(borrow.createdAt).add(7, 'hour').isBefore(dayjs()) && { penalty: { create: {} } }),
            },
        });
    }
}
