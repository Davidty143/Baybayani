<template>
    <div class="flex h-screen">
      <!-- Sidebar Layout -->
      <SideBarLayout class="sidebar" />
  
      <!-- Admin Layout -->
      <AdminLayout class="admin-layout">
        <div class="main-content flex-1 overflow-y-auto p-6">
          <!-- Title -->
          <h1 class="text-3xl font-semibold mb-8 text-center">Chat</h1>
  
          <!-- Tawk.to Chat Widget -->
          <div id="tawk-widget"></div>
        </div>
      </AdminLayout>
    </div>
  </template>
  
  <script>
  import SideBarLayout from '~/layouts/SideBarLayout.vue';
  import AdminLayout from '~/layouts/AdminLayout.vue';
  import { onMounted } from 'vue';
  
  export default {
    name: 'ChatPage',
    components: {
      SideBarLayout,
      AdminLayout,
    },
    setup() {
      onMounted(() => {
        // Add the Tawk.to script dynamically when the component mounts
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function() {
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/YOUR_TAWK_TO_PROPERTY_ID/default';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      });
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
  </style>
  