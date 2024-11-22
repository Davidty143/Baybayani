import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    // Fetching all products with selected fields, including 'hidden' and 'description'
    const products = await prisma.products.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        url: true,
        description: true, // Add the description field to the selection
        hidden: true, // Add the hidden field to the selection
      },
      orderBy: {
        created_at: "desc", // Ordering by the `created_at` field (most recent first)
      },
    });
    return products; // Return the products as a JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: "Error fetching products", message: error.message };
  }
});
