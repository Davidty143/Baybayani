import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Read the body of the request
  const body = await readBody(event);

  // Check if required data exists
  if (!body.name || !body.contact || !body.productIds) {
    return { error: "Missing required fields" };
  }

  try {
    // Create a new farmer and associate them with the selected products
    const res = await prisma.farmer.create({
      data: {
        name: body.name, // Ensure you're using the correct field for the name
        contact: body.contact, // Correctly map the contact
        products: {
          connect: body.productIds.map((id) => ({ id })), // Map the productIds to connect
        },
      },
    });

    // Return the created farmer
    return res;
  } catch (error) {
    console.error("Error creating farmer:", error);
    return { error: "Failed to create farmer" };
  } finally {
    await prisma.$disconnect();
  }
});
