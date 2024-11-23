<template>
    <div class="flex h-screen">
      <!-- Sidebar Layout -->
      <SideBarLayout class="sidebar" />
  
      <!-- Admin Layout -->
      <AdminLayout class="admin-layout">
        <div class="main-content flex-1 overflow-y-auto p-6">
          <!-- Title -->
          <h1 class="text-3xl font-semibold mb-8 text-center">Chat</h1>
  
          <!-- Embedded Tawk.to Widget using iframe -->
          <iframe
            id="tawk-iframe"
            :src="iframeUrl"
            class="w-full h-full border rounded-lg"
            frameborder="0"
          ></iframe>
        </div>
      </AdminLayout>
    </div>
  </template>
  
  <script>
  import SideBarLayout from '~/layouts/SideBarLayout.vue';
  import AdminLayout from '~/layouts/AdminLayout.vue';
  import { ref } from 'vue';
  
  export default {
    name: 'ChatPage',
    components: {
      SideBarLayout,
      AdminLayout,
    },
    setup() {
      const iframeUrl = ref('https://embed.tawk.to/6741b6a92480f5b4f5a2d521/default');
  
      return {
        iframeUrl,
      };
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 300px;
    background: #f5f5f5;
  }
  
  .admin-layout {
    flex: 1;
  }
  
  .main-content {
    padding-top: 20px;
  }
  
  #tawk-iframe {
    width: 100%;
    height: 600px;
  }
  </style>
  