import { Prisma } from './prisma.utils';
import member from './member.seeder';

async function main() {
    console.log('\n-> START::SEEDING');

    await member.run();

    console.log('-> FINISH::SEEDING\n');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await Prisma.instance.$disconnect();
    });
