import { FindManyDto } from './dto/find-many.dto';

export type PaginationResponseType = {
    data?: Array<any>;
    total?: number;
};

export class PaginationUtils {
    public static transform(query: FindManyDto) {
        const searchBy = this.constructArray(query?.searchBy);
        const include = this.constructCustomeField(query?.includes);

        return {
            include,
            take: query.take,
            skip: (query.page - 1) * query.take,
            orderBy: { [query.orderBy]: query.sortBy },
            where: {
                ...query?.filter,
                ...(query?.search &&
                    searchBy.length && { OR: PaginationUtils.searchQueryHandler(query.search, searchBy) }),
            },
        };
    }

    private static constructCustomeField(string?: string): any {
        let field = undefined;
        const fieldQuery = this.constructArray(string);
        fieldQuery?.forEach((val) => {
            field = { ...field, [`${val}`]: !!val };
        });

        return field;
    }

    private static constructArray(string?: string): Array<string> {
        return string ? string.replace(/\s/g, '').split(',') : [];
    }

    public static searchQueryHandler(search: string, fields: Array<string> = []): Array<any> {
        return [...fields.map((value) => ({ [`${value}`]: { contains: search, mode: 'insensitive' } }))];
    }
}
