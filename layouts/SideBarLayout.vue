<template>
  <div class="flex h-screen">
    <!-- Sidebar Section -->
    <nav class="bg-green-700 text-white w-64 flex flex-col justify-center p-4 sticky top-0 h-screen">
      <ul class="space-y-6">
        <!-- Dashboard -->
        <li>
          <a
            href="../admin/dashboard"
            class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
          >
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span>Dashboard</span>
          </a>
        </li>

        <!-- Chat -->
        <li>
          <a
            href="/chat"
            class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
          >
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 6h-2v9H7v2c0 1.103.897 2 2 2h8.243L21 21.3V6zM5 18h12v2H7.758L5 22.313V18z" />
            </svg>
            <span>Chat</span>
          </a>
        </li>

        <!-- Orders -->
        <li>
          <a
            href="../admin/orders"
            class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
          >
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M7 4V2h10v2h5v2H2V4h5zm12 4v14H5V8h14zm-2 2H7v10h10V10z" />
            </svg>
            <span>Orders</span>
          </a>
        </li>

        <!-- Product -->
        <li>
          <a
            href="../admin/products"
            class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
          >
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M12 2C8.691 2 6 4.691 6 8c0 3.86 3.1 7.319 7 9.937 3.9-2.618 7-6.077 7-9.937 0-3.309-2.691-6-6-6zm0 14c-2.219 0-4-1.781-4-4s1.781-4 4-4 4 1.781 4 4-1.781 4-4 4zm0-6.5c-1.381 0-2.5 1.119-2.5 2.5s1.119 2.5 2.5 2.5 2.5-1.119 2.5-2.5-1.119-2.5-2.5-2.5z" />
            </svg>
            <span>Product</span>
          </a>
        </li>

        <!-- Users -->
        <li>
          <a
            href="../admin/users"
            class="flex items-center space-x-4 text-md font-medium hover:text-green-700 hover:bg-yellow-500 p-3 rounded-lg transition duration-300"
          >
            <!-- Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
            </svg>
            <span>Users</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SidebarLayout",
};
</script>

<style scoped>
.sidebar li a:hover {
  background-color: #ffb703;
}
</style>
