import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const orderItems = ref([]); // Reactive variable for storing order items
    const error = ref(null); // Track errors
    const loading = ref(true); // Track loading state

    const fetchOrderItems = async () => {
      loading.value = true; // Set loading to true at the start
      error.value = null; // Clear previous errors

      try {
        const response = await axios.get("/api/prisma/get-order-items");
        
        if (response.status === 200 && response.data.body) {
          // Ensure body exists in the response
          orderItems.value = response.data.body;
        } else {
          throw new Error("Failed to fetch order items");
        }
      } catch (err) {
        console.error("Error fetching order items:", err);
        error.value = err.message || "An error occurred while fetching order items.";
      } finally {
        loading.value = false; // Stop loading
      }
    };

    onMounted(() => {
      fetchOrderItems();
    });

    return {
      orderItems,
      error,
      loading,
    };
  },
};
