import { defineStore } from "pinia";
import { fetchUserProfile } from "~/services/api.js"; // Import the function

export const useUserStore = defineStore("user", {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [], // Assuming this holds the main cart info
    cartItems: [], // This will hold the cart items fetched from the server
    products: [],
    deleteProduct: null,
    refreshFlag: 0,
    checkout: [],
    user: null, // auth info
    profile: null, // profile info
  }),

  actions: {
    // Fetch user profile and cart items
    async fetchUser() {
      if (this.user) {
        return; // Skip fetching if user is already set
      }
      console.log("FETCH USER RUNNING");
      this.isLoading = true;
      try {
        const client = useSupabaseClient();
        const { data, error } = await client.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          this.user = data.user;
          console.log("Fetched user ID:", this.user.id);
          const profileData = await fetchUserProfile(this.user.id);
          this.profile = profileData;
          // Fetch cart items after the user profile is fetched
          await this.fetchCartItems(); // Call the new action to fetch the cart items
        }
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
        this.isLoading = false;
      } finally {
        this.isLoading = false; // Ensure isLoading is false after the fetch completes
      }
    },

    // Logout action
    logout() {
      const client = useSupabaseClient();
      this.user = null;
      this.profile = null;
      this.cartItems = []; // Clear cart items on logout
      this.cart = [];
      this.isMenuOverlay = false;
      client.auth.signOut();
      console.log("LOGOUT SUCESS");
      window.location.reload();
    },

    // New action to fetch the cart items
    async fetchCartItems() {
      if (this.cartItems.length > 0 && this.refreshFlag === 0) return;

      console.log("FETCH CART RUNNING");
      this.isLoading = true;
      let cartResponse = ref(null);

      const userId = this.user?.id;

      if (!userId) {
        console.warn("No user ID found, cannot fetch cart items.");
        this.isLoading = false; // Set loading to false if no user ID
        return;
      }
      console.log("Fetching cart items for user ID:", userId);
      this.refreshFlag = 0;

      if (userId) {
        try {
          // Replace with your actual API endpoint
          cartResponse.value = await useFetch(
            `/api/prisma/get-cart-by-user/${userId}`
          );
          console.log("THIS IS A TEST");
          if (cartResponse.value.data) {
            this.cart = cartResponse.value.data;
          }

          if (cartResponse.value.data && cartResponse.value.data.cartItems) {
            this.cartItems = cartResponse.value.data.cartItems; // Set the fetched cart items
            //this.products = cartResponse.value.data.cartItems.product;
            //console.log(this.cartItems[0].product);
            //console.log(this.products);

            console.log("Cart items fetched successfully");
            this.isLoading = false;
          } else {
            this.isLoading = false;
            console.warn("No cart items found for this user.");
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
          this.isLoading = false;
        } finally {
          this.isLoading = false; // Set loading to false after the fetch is done
        }
      } else {
        console.warn("No user ID found, cannot fetch cart items.");
      }
      this.isLoading = false;
    },
  },

  persist: true, // This will persist the store data
});
