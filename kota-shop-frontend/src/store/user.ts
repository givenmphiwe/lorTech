// store.ts

import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const userEmail = ref<string | null>(localStorage.getItem("userEmail")); // Add userEmail state

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem("token", newToken);
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem("token");
  };

  // Add methods to set and clear userEmail
  const setUserEmail = (email: string) => {
    userEmail.value = email;
    localStorage.setItem("userEmail", email);
  };

  const clearUserEmail = () => {
    userEmail.value = null;
    localStorage.removeItem("userEmail");
  };

  return {
    token,
    setToken,
    clearToken,
    userEmail, // Expose userEmail
    setUserEmail,
    clearUserEmail,
  };
});
