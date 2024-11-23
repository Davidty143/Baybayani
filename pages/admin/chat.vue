<template>
    <div class="flex h-screen">
      <!-- Sidebar Layout -->
      <SideBarLayout class="sidebar" />
  
      <!-- Admin Layout -->
      <AdminLayout class="admin-layout">
        <div class="main-content flex-1 overflow-y-auto p-6">
          <!-- Title -->
          <h1 class="text-3xl font-semibold mb-8 text-center">Chat</h1>
  
          <div class="flex h-[85vh] border rounded-lg overflow-hidden">
            <!-- Chat List -->
            <div class="w-1/4 border-r overflow-y-auto bg-gray-100">
              <div v-for="chat in chatList" :key="chat.id" class="p-4 border-b hover:bg-gray-200 cursor-pointer">
                <h2 class="font-semibold text-lg">{{ chat.sender }}</h2>
                <p class="text-gray-600">{{ chat.preview }}</p>
                <span class="text-sm text-gray-400">{{ chat.time }}</span>
              </div>
            </div>
  
            <!-- Chat Details -->
            <div class="w-3/4 flex flex-col">
              <!-- Chat Header -->
              <div class="p-4 border-b flex items-center justify-between bg-white">
                <div class="flex items-center gap-4">
                  <div class="font-semibold text-lg">{{ selectedChat.title }}</div>
                  <div class="flex items-center gap-2 text-gray-600">
                    <span>Customer is inquiring about this item:</span>
                    <img :src="selectedChat.productImage" class="w-10 h-10 object-cover rounded-full" />
                    <div>
                      <p class="font-bold">{{ selectedChat.productTitle }}</p>
                      <p class="text-red-600">{{ selectedChat.productPrice }}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Chat Messages -->
              <div class="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div v-for="message in selectedChat.messages" :key="message.id" :class="['flex', message.isSent ? 'justify-end' : 'justify-start']">
                  <div :class="['max-w-xs p-3 rounded-lg', message.isSent ? 'bg-green-600 text-white' : 'bg-white border']">
                    {{ message.text }}
                  </div>
                </div>
              </div>
  
              <!-- Message Input -->
              <div class="p-4 border-t flex items-center bg-white">
                <input
                  v-model="messageInput"
                  type="text"
                  placeholder="Type a message here"
                  class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button @click="sendMessage" class="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  <Icon name="ph:paper-plane-tilt" size="24" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  </template>
  
  <script>
  import SideBarLayout from '~/layouts/SideBarLayout.vue';
  import AdminLayout from '~/layouts/AdminLayout.vue';
  import { ref } from 'vue';
  import Icon from 'vue-icon';
  
  export default {
    name: 'ChatPage',
    components: {
      SideBarLayout,
      AdminLayout,
      Icon,
    },
    setup() {
      const chatList = ref([
        { id: 1, sender: 'Buyer 1', preview: 'Good po, Good Morning...', time: '2m' },
        { id: 2, sender: 'Ace Marketing', preview: 'Maayong hapon available...', time: '30m' },
      ]);
  
      const selectedChat = ref({
        id: 1,
        title: 'Buyer 1',
        productImage: '/product-image.png',
        productTitle: 'Tomato',
        productPrice: '₱50.00/kg',
        messages: [
          { id: 1, text: 'Hello po, Good Morning available po ang tomatoes?', isSent: false },
          { id: 2, text: 'Yes po available', isSent: true },
        ],
      });
  
      const messageInput = ref('');
  
      const sendMessage = () => {
        if (messageInput.value.trim() !== '') {
          selectedChat.value.messages.push({
            id: Date.now(),
            text: messageInput.value,
            isSent: true,
          });
          messageInput.value = '';
        }
      };
  
      return {
        chatList,
        selectedChat,
        messageInput,
        sendMessage,
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
  </style>
  