// /api/createUser.js (or createUser.ts if you're using TypeScript)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  
  const { id, email, name, contactNumber, role } = body;

  // Store the user data in Prisma
  try {
    const user = await prisma.user.create({
      data: {
        id,                 // Supabase Auth user ID
        email,              // User email from the request
        name,               // User name
        contactNumber,      // User contact number (optional)
        role,               // User role (you can assign "USER" by default or make it dynamic)
        created_at: new Date(), // Timestamp when the user is created
      },
    });

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.error("Error saving user to database:", error);
    return {
      success: false,
      error: 'Error creating user in database.',
    };
  }
});
