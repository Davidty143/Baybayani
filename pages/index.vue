<template>
  <AdminLayout>
    <div id="IndexPage" class="max-w-[1200px] mx-auto px-2">
      <div
        class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
      >
        <div
          v-if="filteredProducts"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <ProductComponent :product="product" />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import { useUserStore } from "~/stores/user";
import { ref, onBeforeMount, computed } from "vue";

let products = ref(null);

const userStore = useUserStore();
const user = useSupabaseUser();
const route = useRoute();

watchEffect(() => {
  if (route.fullPath == "/" && userStore.isAdmin === true) {
    navigateTo("/admin/dashboard");
  }
});

onBeforeMount(async () => {
  products.value = await useFetch("/api/prisma/get-all-products");
  setTimeout(() => (userStore.isLoading = false), 1000);
});

// Compute filtered products to exclude hidden and deleted products
const filteredProducts = computed(() => {
  if (products.value && products.value.data) {
    return products.value.data.filter(
      (product) => !product.hidden && !product.isDeleted
    );
  }
  return [];
});
</script>
