import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, totalPrice, cartId } = body; // Extracting necessary data from the body
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cartId }, // Fetch cart items based on cartId
      include: {
        product: true, // Include related product data
      },
    });

    // 1. Create the Order record in the Orders table
    const order = await prisma.orders.create({
      data: {
        userId: userId, // User who is placing the order
        total_price: totalPrice, // Total price of the order (sum of cart items)
        orderItem: {
          create: cartItems.map((item) => ({
            productId: item.productId, // Product in the cart
            quantity: item.quantity, // Quantity of the product
          })),
        },
      },
      include: {
        orderItem: true, // Including created OrderItems in the response (optional)
      },
    });

    // 2. Return the created order (or just a success message)
    return {
      status: "success",
      order: order, // You can return the order with the included order items
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      status: "error",
      message: "There was an issue creating your order.",
    };
  }
});
