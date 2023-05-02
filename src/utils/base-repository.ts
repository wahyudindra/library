import { BadRequestException } from '@nestjs/common';
import { PaginationResponseType, PaginationUtils } from './pagination.utils';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FindOneDto } from './dto/find-one.dto';
import { PrismaService } from './../common/prisma.service';
import { ErrorMessage } from './../common/constants/error-message';

export class BaseRepository {
    private prismaService: PrismaService;

    public get resource(): any {
        return this.prismaService[`${this.resourceName}`];
    }

    constructor(prisma: PrismaService, private resourceName: string) {
        this.prismaService = prisma;
    }

    async findAll(query: PaginationQueryDto): Promise<PaginationResponseType> {
        try {
            let { skip, take, orderBy, include, where } = PaginationUtils.transform(query);
            const total = await this.resource.count({ where });
            const data = await this.resource.findMany({ skip, take, orderBy, include, where });

            return { data, total };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async findOne(code: string, query?: FindOneDto) {
        const data = await this.resource.findUnique({
            where: { code },
            ...(query?.include && { include: query?.include }),
        });

        if (!data) throw new BadRequestException(ErrorMessage.NOT_FOUND);
        return data;
    }

    async create(data: any) {
        try {
            return await this.resource.create({ data });
        } catch (err) {
            throw new BadRequestException(
                err.code === 'P2002'
                    ? `Failed, because there was duplicate data (${err?.meta?.target}).`
                    : err?.response?.message ?? err?.message,
            );
        }
    }

    async update(code: string, data: any) {
        await this.findOne(code);

        try {
            return await this.resource.update({ where: { code }, data });
        } catch (err) {
            throw new BadRequestException(
                err.code === 'P2002'
                    ? `Failed, because there was duplicate data (${err?.meta?.target}).`
                    : err?.response?.message ?? err?.message,
            );
        }
    }

    async remove(code: string) {
        await this.findOne(code);

        return this.resource.delete({ where: { code } });
    }
}
