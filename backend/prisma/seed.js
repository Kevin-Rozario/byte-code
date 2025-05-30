import db from "../src/config/db.config.js";
import { leetcodeProblems } from "../data/problems.js";

async function main() {
  console.log("Start seeding ...");
  const user = await db.user.create({
    data: {
      userName: "dummyadmin",
      email: "dummy@google.com",
      password: "dummy@3214",
      fullName: "Dummy Admin",
    },
  });

  const problems = await db.problem.createMany({
    where: {
      userId: user.id,
    },
    data: leetcodeProblems,
  });
  console.log(`Created ${problems.count} problems`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
