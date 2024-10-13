<script lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { useUserStore } from "../../store/user";
import { getFoodItems, deleteFood, updateFood, FoodItem } from "../../api/index";
import { Chart } from "chart.js";
import Toast from "../Toast.vue";

export default {
  name: "FoodManager",
  components: { Toast },
  setup() {
    const userStore = useUserStore();
    const userEmail = computed(() => userStore.userEmail);

    const foodItems = ref<FoodItem[]>([]);
    const selectedFood = ref<FoodItem | null>(null);
    const message = ref("");
    const toastType = ref("success");
    const loading = ref(false); 
     const isUpdating = ref(false); 
    let chartInstance: Chart | null = null;

    const fetchFoodItems = async () => {
      if (userEmail.value) {
        loading.value = true; // Start loading
        foodItems.value = await getFoodItems(userEmail.value);
        loading.value = false; // Stop loading once data is fetched
        await nextTick();
        renderAggregateChart();
      } else {
        showToast("User email is not available.", "error");
      }
    };

    const deleteFoodItem = async (foodId: string) => {
      if (userEmail.value) {
        const data = await deleteFood(userEmail.value, foodId);
        showToast(data.message, "success");
        fetchFoodItems();
      } else {
        showToast("User email is not available.", "error");
      }
    };

   const selectFoodForEdit = (food: FoodItem) => {
  if (selectedFood.value && selectedFood.value.id === food.id) {
    selectedFood.value = null; // Close the edit form if the same item is clicked again
  } else {
    selectedFood.value = { ...food }; // Open the edit form for the selected item
  }
};

    const editFoodItem = async (food: FoodItem) => {
      if (userEmail.value) {
         isUpdating.value = true;
        const data = await updateFood(food);
        showToast(data.message, "success");
         isUpdating.value = false;
        selectedFood.value = null;
        fetchFoodItems();
      } else {
        showToast("User email is not available.", "error");
      }
    };

    const renderAggregateChart = () => {
      const aggregateCtx = document.getElementById("aggregateChart") as HTMLCanvasElement;
      if (aggregateCtx && foodItems.value.length) {
        if (chartInstance) {
          chartInstance.destroy();
        }
        const labels = foodItems.value.map((item) => item.name);
        const stockData = foodItems.value.map((item) => item.stock);
        const priceData = foodItems.value.map((item) => item.price);
        chartInstance = new Chart(aggregateCtx.getContext("2d"), {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Stock",
                data: stockData,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "Price",
                data: priceData,
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    const showToast = (msg: string, type: string) => {
      message.value = msg;
      toastType.value = type;
    };

    onMounted(fetchFoodItems);

    return {
      foodItems,
      selectedFood,
      deleteFoodItem,
      selectFoodForEdit,
      editFoodItem,
      message,
      toastType,
      loading, // Return loading state
    };
  },
};

</script>

<template>
  <div class="max-w-7xl mx-auto p-6 bg-gray-100">
    <h1 class="text-2xl font-bold mb-6 text-center">Inventory Management</h1>

    <Toast v-if="message" :message="message" :type="toastType" />

    <div v-if="loading" class="text-center py-4">
      <p class="text-gray-500">Loading food items...</p>
    </div>

    <div v-else class="flex flex-wrap">
      <div class="w-full md:w-2/3 p-4">
        <div v-if="foodItems.length" class="bg-white rounded-lg shadow-lg p-6">
          <canvas id="aggregateChart" class="w-full h-64"></canvas>
        </div>
        <div v-else class="text-center text-gray-500">No food items found.</div>
      </div>

      <div class="w-full md:w-1/3 p-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold mb-2">ITEMS</h2>
          <p class="text-gray-500 mb-4">Manage your inventory items</p>
          <ul>
            <li
              v-for="item in foodItems"
              :key="item.id"
              class="relative border-b border-gray-200 py-4"
            >
              <div class="flex items-center">
                <img
                  :src="item.imageUrl"
                  alt="Food image"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div class="flex-1">
                  <h3 class="text-lg font-semibold">{{ item.name }}</h3>
                  <p class="text-gray-500 text-sm">
                    Stock: {{ item.stock }} | Price: R{{ item.price }}
                  </p>
                </div>
                <button
                  @click="deleteFoodItem(item.id)"
                  class="text-red-500 hover:text-red-700 ml-4"
                  aria-label="Delete"
                >
                  Remove
                </button>
                 <button
                  @click="selectFoodForEdit(item)"
                  class="ml-4"
                  aria-label="Edit or Close"
                >
                  <!-- Conditionally show Edit or Close icon based on whether the item is being edited -->
                  <span v-if="selectedFood && selectedFood.id === item.id" class="text-gray-500 hover:text-gray-700">
                    &#x2715; <!-- Close icon (×) -->
                  </span>
                  <span v-else class="text-blue-500 hover:text-blue-700">
                    Edit
                  </span>
                </button>
              </div>

              <!-- Add transition for the edit form -->
              <transition name="slide">
                <div v-if="selectedFood && selectedFood.id === item.id" class="mt-4 bg-gray-50 p-4 rounded-lg shadow-lg">
         
                  <input
                    v-model="selectedFood.stock"
                    type="number"
                    placeholder="Stock"
                    class="block w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                  <input
                    v-model="selectedFood.price"
                    type="number"
                    placeholder="Price"
                    class="block w-full mb-2 p-2 border border-gray-300 rounded"
                  />
                   <button
                    @click="editFoodItem(selectedFood)"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    :disabled="isUpdating" 
                  >
                    <span v-if="isUpdating">Updating...</span>
                    <span v-else>Update</span>
                  </button>
                  
                  
                </div>
              </transition>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Add custom transition effect for sliding */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>