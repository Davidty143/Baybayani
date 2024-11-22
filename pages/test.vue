<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>

    <!-- Add to Cart Button -->
    <div class="mt-4">
      <button
        @click="addToCart"
        class="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700"
      >
        Add Product to Cart
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center text-gray-500">
      Loading your cart...
    </div>

    <!-- Success Message -->
    <div v-if="isSuccess" class="text-center text-green-500">
      Product added to cart successfully!
    </div>

    <!-- Error Message -->
    <div v-if="isError" class="text-center text-red-500">
      Error adding product to cart. Please try again.
    </div>

    <!-- Cart Details -->
    <div v-if="cart && !isLoading">
      <!-- Check if there are any items in the cart -->
      <div v-if="cart.cartItems && cart.cartItems.length > 0">
        <ul>
          <li
            v-for="item in cart.cartItems"
            :key="item.id"
            class="p-4 border-b"
          >
            <p class="font-bold">{{ item.product.title }}</p>
            <p class="text-gray-500">₱{{ item.product.price }}</p>
            <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-gray-500">Your cart is empty.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const cart = ref(null);
const isLoading = ref(false);
const isSuccess = ref(false);
const isError = ref(false);

const userId = userStore.user?.id; // Get user ID from the store

// Fetch user's cart data
const fetchCart = async () => {
  if (!userId) return;

  isLoading.value = true;
  try {
    const { data } = await useFetch(`/api/prisma/get-cart-by-user/${userId}`);
    if (data) {
      cart.value = data; // Set the cart data if found
      console.log(cart.value + "mao ni");
    } else {
      console.error("No cart found for this user");
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
  } finally {
    isLoading.value = false;
  }
};

// Add a product to the cart
const addToCart = async () => {
  if (!userId) {
    console.error("User is not logged in");
    isError.value = true;
    return;
  }

  const productId = 10; // Example product ID (replace with actual product ID logic)

  isLoading.value = true;
  isSuccess.value = false;
  isError.value = false;

  console.log("User ID:", userId); // Log the user ID to verify it

  try {
    const { data } = await useFetch(
      `/api/prisma/add-product-to-cart/${userId}`,
      {
        method: "POST",
        body: { productId },
      }
    );

    if (data?.success) {
      console.log("Product added to cart successfully!");
      await fetchCart(); // Fetch the updated cart
      isSuccess.value = true;
    } else {
      console.error("Error: mali ni");
      isError.value = true;
    }
  } catch (error) {
    console.error("gagaga:", error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Fetch the cart initially when the component is mounted
if (userId) {
  fetchCart();
} else {
  console.error("No user ID found, cannot fetch cart.");
}
</script>

<style scoped>
/* You can add custom styles here if needed, but Tailwind should be enough */
</style>
