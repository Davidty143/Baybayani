<template>
  <div class="fixed z-[-1] bg-[#F2F2F2] w-full h-[100vh]"/>
  <NuxtPage />

  <MenuOverlay
    :class="[
        {'max-h-[100vh] transition-all duration-200 ease-in visible': userStore.isMenuOverlay },
        {'max-h-0 transition-all duration-200 ease-out invisible': !userStore.isMenuOverlay },
    ]"
  />
</template>

<script setup>
import { useUserStore } from '~/stores/user';
const userStore = useUserStore()

const route = useRoute()
// if (userStore.user.role === 'Admin') {
//   console.log('User is an Admin');
// } else if (userStore.user.role === 'User') {
//   console.log('User is a regular user');
// } else {
//   console.log('User has an unknown role');
// }


let windowWidth = ref(process.client ? window.innerWidth : '')

onMounted(() => {
    userStore.isLoading = true
    window.addEventListener('resize', function () {
        windowWidth.value = window.innerWidth;
    });
})

watch(() => windowWidth.value, () => {
    if (windowWidth.value >= 767) {
        userStore.isMenuOverlay = false
    }
})

watch(() => route.fullPath, () => {
    userStore.isLoading = true
})
</script>
