import { Prisma } from './prisma.utils';
import { Member } from '@prisma/client';
import * as memberJson from './member.json';

export const run = async () => {
    const member = await Prisma.instance.member.count();
    if (member) return;

    await Prisma.instance.member.createMany({
        data: memberJson as Member[],
        skipDuplicates: true,
    });

    console.log('   └─ Completed: member.');
};

export default {
    run,
};
