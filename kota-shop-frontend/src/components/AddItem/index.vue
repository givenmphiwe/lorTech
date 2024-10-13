<script lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "../../store/user";
import { addFood, FoodItem } from "../../api/index";
import Toast from "../Toast.vue";

export default {
  name: "AddManager",
  components: { Toast },
  setup() {
    const userStore = useUserStore();
    const userEmail = computed(() => userStore.userEmail);
    const loading = ref(false); // Loading state
    const message = ref("");
    const toastType = ref("success");

    // Reference for file input
    const fileInput = ref<HTMLInputElement | null>(null);

    const newFood = ref<FoodItem>({
      userId: userEmail.value,
      name: "",
      stock: null,
      price: null,
      imageBase64: "",
    });

    const addNewItem = async () => {
      if (
        userEmail.value &&
        newFood.value.name &&
        newFood.value.stock > 0 &&
        newFood.value.price > 0
      ) {
        loading.value = true; // Start loading
        newFood.value.userId = userEmail.value; // Set userId before adding
        const data = await addFood(newFood.value);
        showToast(data.message, "success");

        // Reset form fields, including the image
        newFood.value = {
          userId: userEmail.value,
          name: "",
          stock: 0,
          price: 0,
          imageBase64: "",
        };

        // Clear the file input field
        if (fileInput.value) {
          fileInput.value.value = ""; // Reset file input
        }

        loading.value = false; // Stop loading
      } else {
        showToast("Please fill in all fields correctly.", "error");
      }
    };

    const handleImageUpload = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          newFood.value.imageBase64 = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const showToast = (msg: string, type: string) => {
      message.value = msg;
      toastType.value = type;
    };

    return {
      newFood,
      addNewItem,
      handleImageUpload,
      message,
      toastType,
      loading, // Include loading state
      fileInput, // Return fileInput reference
    };
  },
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-100">
    <h1 class="text-2xl font-bold mb-6 text-center">Add New Food Item</h1>

    <!-- Toast message -->
    <Toast v-if="message" :message="message" :type="toastType" />

    <!-- Add New Item Form -->
    <div class="w-full md:w-1/3 p-4 mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-2">Add New Item</h2>
        <form @submit.prevent="addNewItem">
          <input
            v-model="newFood.name"
            type="text"
            placeholder="Inventory Name"
            class="mb-2 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            v-model="newFood.stock"
            type="number"
            placeholder="Stocked Items"
            class="mb-2 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             
          />
          <input
            v-model="newFood.price"
            type="number"
            placeholder="Price"
            class="mb-2 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            @change="handleImageUpload"
            class="mb-2 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref="fileInput" 
          />

          <!-- Submit button with loading spinner -->
          <button
            type="submit"
            class="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg
                class="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Adding...
            </span>
            <span v-else>Add Item</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
