
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import EyeIcon from "../components/EyeIcon.vue";
import { useUserStore } from "../store/user";
import LoadingButtonContent from "../components/LoadingButtonContent.vue";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const passwordStrengthMessage = ref("");
const passwordStrengthClass = ref(["", "", "", ""]);
const passwordStrengthClassText = ref("");
const showPassword = ref(false);
const userStore = useUserStore();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const checkPasswordStrength = () => {
  const passwordValue = password.value;
  const lengthRequirement = passwordValue.length >= 8;
  const uppercaseRequirement = /[A-Z]/.test(passwordValue);
  const lowercaseRequirement = /[a-z]/.test(passwordValue);
  const numberRequirement = /\d/.test(passwordValue);
  const specialCharRequirement = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

  const isStrong =
    lengthRequirement &&
    uppercaseRequirement &&
    lowercaseRequirement &&
    numberRequirement &&
    specialCharRequirement;
  const isMedium =
    lengthRequirement &&
    (uppercaseRequirement || lowercaseRequirement) &&
    (numberRequirement || specialCharRequirement);

  // Reset bars
  passwordStrengthClass.value = ["", "", "", ""];

  if (isStrong) {
    passwordStrengthMessage.value = "Strong password";
    passwordStrengthClass.value = [
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
      "bg-green-500",
    ];
    passwordStrengthClassText.value = "text-green-500";
  } else if (isMedium) {
    passwordStrengthMessage.value = "Moderate password";
    passwordStrengthClass.value = [
      "bg-orange-500",
      "bg-orange-500",
      "bg-orange-500",
      "",
    ];
    passwordStrengthClassText.value = "text-orange-500";
  } else {
    passwordStrengthMessage.value =
      "password Must be at least 8 special charac @#$%^&*(),.?.";
    passwordStrengthClass.value = ["bg-red-500", "bg-red-500", "", ""];
    passwordStrengthClassText.value = "text-red-500";
  }
};

const register = async () => {
  loading.value = true;
  errorMessage.value = "";

  // Validate that the passwords match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await response.json();

    if (response.ok) {
     userStore.setUserEmail(email.value);
      router.push("/dashboard");
    } else {
      errorMessage.value =
        data.message || "Failed to register. Please try again.";
    }
  } catch (err) {
    console.error(err);
    errorMessage.value =
      "An error occurred during registration. Please try again.";
  } finally {
    loading.value = false;
  }
};
</script>
<template>
 <div
    class="h-screen flex justify-center items-center relative"
    style="background-image: url('../src/assets/imgs/bg-login.jpg'); background-size: cover; background-position: center;"
  >
    <!-- Black overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
    
     <div
      class="bg-white bg-opacity-80 shadow-md rounded-lg px-10 pt-8 pb-10 w-full max-w-sm relative z-10"
    >
      <h2 class="text-center text-3xl font-bold mb-6">Register</h2>

      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-800 text-sm font-bold mb-2"
            >Email Address</label
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
            class="border border-gray-300 rounded w-full py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
            @input="checkPasswordStrength"
            required
          />

          <EyeIcon
            :showPassword="showPassword"
            :togglePasswordVisibility="togglePasswordVisibility"
          />

          <!-- Password strength bars -->
          <div class="flex mt-2">
            <div
              :class="['strength-bar', passwordStrengthClass[0]]"
              style="flex: 1"
            ></div>
            <div
              :class="['strength-bar', passwordStrengthClass[1]]"
              style="flex: 1"
            ></div>
            <div
              :class="['strength-bar', passwordStrengthClass[2]]"
              style="flex: 1"
            ></div>
            <div
              :class="['strength-bar', passwordStrengthClass[3]]"
              style="flex: 1"
            ></div>
          </div>
          <div class="text-sm mt-1" :class="passwordStrengthClassText">
            {{ passwordStrengthMessage }}
          </div>
        </div>

        <div class="mb-4 relative">
          <label class="block text-gray-800 text-sm font-bold mb-2"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Confirm Password"
            class="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <EyeIcon
            :showPassword="showPassword"
            :togglePasswordVisibility="togglePasswordVisibility"
          />
        </div>

        <!-- Error message displayed in red in the center -->
        <div v-if="errorMessage" class="text-center text-red-500 mb-4">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          <LoadingButtonContent :loading="loading">
            Register
          </LoadingButtonContent>
        </button>

        <div class="text-center mt-4">
          <button
            @click="$router.push('/login')"
            type="button"
            class="text-gray-600 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </form>
     </div>
   
  </div>
</template>


<style scoped>
.strength-bar {
  height: 4px;
  margin-right: 2px;
  border-radius: 2px;
}

.strength-bar:last-child {
  margin-right: 0;
}
</style>
