import { Prisma } from './prisma.utils';
import { Book } from '@prisma/client';
import * as bookJson from './book.json';

export const run = async () => {
    const bookCount = await Prisma.instance.book.count();
    if (bookCount) return;

    await Prisma.instance.book.createMany({
        data: bookJson as Book[],
        skipDuplicates: true,
    });

    console.log('   └─ Completed: book.');
};

export default {
    run,
};
