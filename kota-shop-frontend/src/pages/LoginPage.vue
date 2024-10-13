<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import EyeIcon from "../components/EyeIcon.vue";
import LoadingButtonContent from "../components/LoadingButtonContent.vue";
import "../assets/index.css";

const email = ref("");
const password = ref("");
const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);
const showPassword = ref(false);
const errorMessage = ref("");

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

//Login  functionality
const login = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();

    if (response.ok) {
      userStore.setToken(data.token);
      userStore.setUserEmail(email.value);

      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem("tokenExpiration", expirationTime);

      router.push("/dashboard");
    } else {
      errorMessage.value = data.message || "Login failed. Please try again.";
    }
  } catch (err) {
    errorMessage.value = "An error occurred. Please try again.";
  } finally {
    loading.value = false;
  }
};

const Register = async () => {
  router.push("/register");
};
</script>


<template>
  <div
    class="h-screen flex justify-center items-center relative"
    style="background-image: url('../src/assets/imgs/bg-login.jpg'); background-size: cover; background-position: center;"
  >
    <!-- Black overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
    
    <!-- Content on top of overlay -->
    <div
      class="bg-white bg-opacity-80 shadow-md rounded-lg px-10 pt-8 pb-10 w-full max-w-sm relative z-10"
    >
      <h2 class="text-center text-3xl font-bold text-black mb-6">Kota Inv</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2"
            >Username or Email Address</label
          >
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div class="mb-4 relative">
          <label class="block text-gray-800 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            class="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <EyeIcon
            :showPassword="showPassword"
            :togglePasswordVisibility="togglePasswordVisibility"
          />
        </div>

        <!-- Error message -->
        <div v-if="errorMessage" class="text-center text-red-500 mb-4">
          {{ errorMessage }}
        </div>

        <!-- Remember Me Checkbox -->
        <div class="flex items-center justify-between mb-4">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="rememberMe" class="form-checkbox" />
            <span class="ml-2 text-gray-700 text-sm">Remember Me</span>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          <LoadingButtonContent :loading="loading">
            Log In
          </LoadingButtonContent>
        </button>

        <div class="text-center mt-4">
          <button
            @click="$router.push('/register')"
            type="button"
            class="text-gray-600 hover:underline"
          >
            Don't have an account? register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

