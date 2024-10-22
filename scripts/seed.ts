const { PrismaClient } = require('@prisma/client')
const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science", slug: "computer-science" },
        { name: "Mathematics", slug: "mathematics" },
        { name: "Physics", slug: "physics" },
        { name: "Biology", slug: "biology" },
      ]
    })
    console.log("SUCCESS")
  } catch (e) {
    console.error(e)
  } finally {
    await database.$disconnect()
  }
}

main()