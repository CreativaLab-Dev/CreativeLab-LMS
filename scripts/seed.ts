const { PrismaClient } = require('@prisma/client')
const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        // { name: "Liderasgo", slug: "liderasgo" },
        // { name: "Trabajo en equipo", slug: "trabajo-en-equipo" },
        { name: "Marketing", slug: "marketing" },
        { name: "Growth", slug: "growth" },
        { name: "Producto", slug: "producto" },
        { name: "UX", slug: "ux" },
        { name: "Tecnología", slug: "tecnologia" },
        { name: "Data", slug: "data" },
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