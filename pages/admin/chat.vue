<template>
  <div class="flex h-screen">
    <!-- Sidebar Layout -->
    <SideBarLayout class="sidebar" />

    <!-- Admin Layout -->
    <AdminLayout class="admin-layout">
      <div class="main-content flex-1 overflow-y-auto p-6">
        <!-- Title -->
        <h1 class="text-3xl font-semibold mb-8 text-center">Chat Admin</h1>

        <!-- Embedded Tawk.to Admin Panel -->
        <iframe
          src="https://dashboard.tawk.to/"
          class="w-full h-full border rounded-lg"
          frameborder="0"
          title="Tawk.to Admin Panel"
        ></iframe>
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import SideBarLayout from "~/layouts/SideBarLayout.vue";
import AdminLayout from "~/layouts/AdminLayout.vue";

export default {
  name: "ChatPage",
  components: {
    SideBarLayout,
    AdminLayout,
  },
  setup() {
    const route = useRoute();

    onMounted(() => {
      // Check if the URL does NOT contain "/admin"
      if (!route.path.includes("/admin")) {
        // Dynamically load Tawk.to script for customer chat
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://embed.tawk.to/6741b6a92480f5b4f5a2d521/1idcb3230";
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);
      }
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

iframe {
  width: 100%;
  height: calc(100vh - 120px); /* Adjust to fit inside the layout */
}
</style>
