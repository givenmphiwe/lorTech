<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

export default defineComponent({
  props: {
    isProfileMenuOpen: Boolean,
  },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const logout = () => {
      userStore.clearToken();
      userStore.clearUserEmail();
      router.push("/login");
    };

    return {
      logout,
    };
  },
});
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            @click="$emit('toggleSidebar')"
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                href="#"
                @click="$emit('showContent', 'Dashboard')"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Dashboard</a
              >
              <a
                href="#"
                @click="$emit('showContent', 'Add Item')"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Add Invetory</a
              >
             
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Logout -->
          <div class="relative ml-3">
            <button
              @click="logout"
              type="button"
              class="relative flex rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            ><p class="text-white">LOGOUT </p>
              <span class="sr-only">Logout</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v4-8m0 0H5a2 2 0 00-2 2v12a2 2 0 002 2h8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

