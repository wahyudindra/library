import { Prisma } from './prisma.utils';
import member from './member.seeder';
import book from './book.seeder';

async function main() {
    console.log('\n-> START::SEEDING');

    await member.run();
    await book.run();

    console.log('-> FINISH::SEEDING\n');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await Prisma.instance.$disconnect();
    });
