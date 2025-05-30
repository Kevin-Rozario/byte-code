import db from "../src/config/db.config.js";
import { leetcodeProblems } from "../data/problems.js";

async function main() {
  console.log("Start seeding ...");
  const problems = await db.problem.createMany({
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
