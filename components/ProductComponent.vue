<template>
  <div
    :id="`ProductComponent${product.id}`"
    class="bg-white inline-block rounded hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.15)] cursor-pointer"
  >
    <NuxtLink :to="`/item/${product.id}`">
      <img class="rounded-t" :src="product.url" />

      <div id="ProductDetails">
        <span class="flex items-center justify-start gap-3 px-1 pt-1 pb-1">
          <span class="text-[#FF6674] font-semibold text-lg"
            >₱{{ priceComputed }}</span
          >
        </span>

        <div class="flex items-center gap-1 px-1 relative -top-1">
          <span
            class="bg-[#0C6539] text-white text-[10px] font-semibold px-1.5 rounded-sm"
            >Vegetables</span
          >
          <span
            class="bg-[#F5F5F5] border text-[#C08562] text-[10px] font-semibold px-1.5 rounded-sm"
            >Top Selling</span
          >
        </div>

        <p class="px-1 pt-0.5 text-md text-[#252525] font-semibold">
          {{ product.title.substring(0, 60) }}
        </p>

        <p class="flex items-center px-1 pt-0.5 text-xs text-[#252525] pb-3">
          100kg sold
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps(["product"]);
const { product } = toRefs(props);

const priceComputed = computed(() => {
  return product.value.price / 100;
});

const oldPriceComputed = computed(() => {
  let res = (product.value.price + product.value.price / 20) / 100;
  return res.toFixed(2);
});
</script>
