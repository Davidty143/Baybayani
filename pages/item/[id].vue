<template>
  <AdminLayout>
    <Loading v-if="userStore.isLoading" />
    <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-4 justify-between mx-auto w-full">
        <div class="md:w-[40%]">
          <img
            v-if="currentImage"
            class="rounded-lg object-fit"
            :src="currentImage"
          />
          <div
            v-if="images[0] !== ''"
            class="flex items-center justify-center mt-2"
          >
            <div v-for="image in images" :key="image">
              <img
                @mouseover="currentImage = image"
                @click="currentImage = image"
                width="70"
                class="rounded-md object-fit border-[3px] cursor-pointer"
                :class="currentImage === image ? 'border-[#FF5353]' : ''"
                :src="image"
              />
            </div>
          </div>
        </div>

        <div class="md:w-[60%] bg-white p-3 rounded-lg">
          <div v-if="product && product.data">
            <p class="mt-5 mb-2 text-3xl font-semibold">
              {{ product.data.title }}
            </p>
            <p class="font-light text-[11px] py-4">
              {{ product.data.description }}
            </p>
          </div>

          <div class="border-b p-3" />

          <div class="flex items-center justify-start gap-2 my-2">
            <div class="text-3xl font-bold p-2 text-[#FF5353]">
              ₱ {{ product?.data?.price }}
            </div>
            <span
              class="bg-[#0C6539] border text-[#fafafa] text-[12px] font-semibold px-1.5 rounded-sm"
            >
              Vegetables
            </span>

            <span
              class="bg-[#F5F5F5] border text-[#C08562] text-[12px] font-semibold px-1.5 rounded-sm"
            >
              Top selling
            </span>
          </div>

          <div class="py-2" />

          <button
            @click="addToCart()"
            :disabled="isInCart"
            class="px-6 py-2 rounded-lg text-white text-lg font-semibold bg-gradient-to-r from-[#0C6539] to-[#0C6539]"
          >
            <div v-if="isInCart">Added to Cart</div>
            <div v-else>Add to Cart</div>
          </button>
        </div>
      </div>

      <!-- Display cart items (if any) -->
      <div v-if="userStore.cartItems.length > 0">
        <h3 class="mt-6 text-xl font-semibold">Your Cart:</h3>
        <ul>
          <li
            v-for="item in userStore.cartItems"
            :key="item.productId"
            class="py-2"
          >
            <p>Product: {{ item.productTitle }}</p>
            <p>Quantity: {{ item.quantity }}</p>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
// item/[id].vue
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user"; // Assuming you have this store
const userStore = useUserStore();

const route = useRoute();

let product = ref(null);
let currentImage = ref(null);
let addtocartResponse = ref(null);

// pag fetch sa product page

console.log("DISPLAYING THE CART");

onBeforeMount(async () => {
  product.value = await useFetch(
    `/api/prisma/get-product-by-id/${route.params.id}`
  );
});

watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.url;
    images.value[0] = product.value.data.url;
    userStore.isLoading = false;
  }
});

const isInCart = computed(() => {
  const currentProductId = route.params.id; // Get the product ID from the route
  return userStore.cartItems.some((prod) => {
    return String(prod.productId) === String(currentProductId); // Convert both to strings and compare
  });
});

const images = ref([
  "",
  "https://picsum.photos/id/212/800/800",
  "https://picsum.photos/id/233/800/800",
  "https://picsum.photos/id/165/800/800",
  "https://picsum.photos/id/99/800/800",
  "https://picsum.photos/id/144/800/800",
]);

const addToCart = async () => {
  if (!product.value || !userStore.user) return;
  console.log("ADD TO CART CLICKED");

  const productData = product.value.data;
  const userId = userStore.user.id; // Assuming userStore has a logged-in user

  // Check if the product is already in the cart
  const productInCart = userStore.cartItems.some(
    (item) => String(item.productId) === String(productData.id)
  );

  if (productInCart) {
    console.log("Product is already in the cart!");
    return; // Exit early, no need to make an API call
  }

  userStore.isLoading = true;

  userStore.cartItems.push({
    productId: productData.id,
    quantity: 1,
    productTitle: productData.title,
    productPrice: productData.price, // Add product price here
    productUrl: productData.url,
  });

  try {
    // Proceed with the API call to add the product to the user's cart
    addtocartResponse.value = await useFetch(
      `/api/prisma/add-product-to-cart/${userId}`,
      {
        method: "POST",
        body: {
          userId,
          productId: productData.id,
        },
      }
    );

    userStore.refreshFlag = 1;
    console.log("Ready to call");
    await userStore.fetchCartItems();

    // setTimeout(() => {
    //   userStore.isLoading = false; // Set loading to false after 2 seconds
    // }, 20);

    // Check if the API response was successful
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
</script>
