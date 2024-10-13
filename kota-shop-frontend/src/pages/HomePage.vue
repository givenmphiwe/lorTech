<script>
import Header from "../components/Header.vue";
import Dashboard from "../components/Dashboard/index.vue";
import AddItem from "../components/AddItem/index.vue";

export default {
  components: {
    Header,
    Dashboard,
    AddItem,
  },

  data() {
    return {
      isSidebarOpen: false,
      isProfileMenuOpen: false,
      activeMenu: "Dashboard",
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    showContent(menu) {
      this.activeMenu = menu;
    },
  },
};
</script>


<template>
  <div >
    <!-- Header component -->
    <Header
      :isProfileMenuOpen="isProfileMenuOpen"
      @toggleSidebar="toggleSidebar"
      @toggleProfileMenu="toggleProfileMenu"
      @showContent="showContent"
    />

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-if="isSidebarOpen" class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a
          href="#"
          @click="showContent('Dashboard')"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Dashboard</a
        >
        <a
          href="#"
          @click="showContent('Add Item')"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Add Invetory</a
        >
      </div>
    </div>

    <!-- Content for each menu item -->
    <div class="p-4 ">
      <div v-if="activeMenu === 'Dashboard'">
        <Dashboard />
      </div>
      <div v-if="activeMenu === 'Add Item'">
        <AddItem />
      </div>
    </div>
  </div>
</template>


