import axios from 'axios';
import { ref, onMounted } from "vue";

export default {
  setup() {
    const orderItems = ref([]);

    const fetchOrderItems = async () => {
      try {
        const response = await axios.get("/api/prisma/get-order-items");
        if (response.status === 200) {
          orderItems.value = response.data.body;
        } else {
          throw new Error("Failed to fetch order items");
        }
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    onMounted(() => {
      fetchOrderItems();
    });

    return {
      orderItems,
    };
  },
};
