<template>
  <AdminLayout>
    <Loading v-if="userStore.isLoading" />
    <div id="ItemPage" class="mt-4 max-w-[1200px] mx-auto px-2">
      <div class="md:flex gap-10 justify-between mx-auto w-full">
        <div class="md:w-[40%]">
          <div class="flex flex-col">
            <img
              v-if="currentImage"
              class="rounded-lg object-cover w-full h-[400px]"
              :src="currentImage"
              alt="Product Image"
            />
          </div>
        </div>

        <div class="md:w-[50%] bg-white p-6 rounded-lg shadow-md">
          <div v-if="product && product.data">
            <h1 class="mt-2 mb-4 text-4xl font-semibold text-gray-800">
              {{ product.data.title }}
            </h1>
            <div class="text-3xl font-bold p-2 text-red-500">
              ₱{{ product?.data?.price }} / kg
            </div>

            <p class="font-light text-lg text-gray-600 my-6">
              Product Details:
            </p>
            <p class="text-md text-gray-700 mb-4">
              {{ product.data.description }}
            </p>

            <div class="flex gap-4">
              <button
                @click="addToCart()"
                :disabled="isInCart"
                class="px-6 py-3 rounded-lg text-white text-lg font-semibold bg-green-600 hover:bg-green-700"
              >
                <div v-if="isInCart">Added to Cart</div>
                <div v-else>Add to Cart</div>
              </button>
              <button
                class="px-6 py-3 rounded-lg text-green-600 border border-green-600 text-lg font-semibold hover:bg-green-50"
              >
                Chat Seller
              </button>
            </div>
          </div>
        </div>
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

console.log("DISPLAYING THE CART");

onBeforeMount(async () => {
  product.value = await useFetch(
    `/api/prisma/get-product-by-id/${route.params.id}`
  );
});

watchEffect(() => {
  if (product.value && product.value.data) {
    currentImage.value = product.value.data.url;
    images.value = [product.value.data.url];
    userStore.isLoading = false;
  }
});

const isInCart = computed(() => {
  const currentProductId = route.params.id; // Get the product ID from the route
  return userStore.cartItems.some((prod) => {
    return String(prod.productId) === String(currentProductId); // Convert both to strings and compare
  });
});

const images = ref([]);

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
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};
</script>
