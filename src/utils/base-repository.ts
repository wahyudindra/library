import { BadRequestException } from '@nestjs/common';
import { PaginationResponseType, PaginationUtils } from './pagination.utils';
import { ErrorMessage } from '@common/constants/error-message';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PrismaService } from '@common/prisma.service';
import { FindOneDto } from './dto/find-one.dto';

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

    async findOne(id: string, query?: FindOneDto) {
        const data = await this.resource.findUnique({
            where: { id },
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

    async update(id: string, data: any) {
        await this.findOne(id);

        try {
            return await this.resource.update({ where: { id }, data });
        } catch (err) {
            throw new BadRequestException(
                err.code === 'P2002'
                    ? `Failed, because there was duplicate data (${err?.meta?.target}).`
                    : err?.response?.message ?? err?.message,
            );
        }
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.resource.delete({ where: { id } });
    }
}
