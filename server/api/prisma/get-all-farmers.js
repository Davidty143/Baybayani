import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Fetching all farmers with selected fields
    const farmers = await prisma.farmer.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        created_at: "desc", // Ordering by the `created_at` field (most recent first)
      },
    });

    return farmers; // Return the farmers as a JSON response
  } catch (error) {
    console.error("Error fetching farmers:", error);
    return { error: "Error fetching farmers", message: error.message };
  }
});
