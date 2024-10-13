<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="toastClass"
      class="fixed bottom-0 left-0 w-full p-4 text-center rounded-none shadow-lg text-white"
    >
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "Toast",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "success",
    },
    duration: {
      type: Number,
      default: 6000, // toast disappears after 6 seconds
    },
  },
  setup(props) {
    const visible = ref(true);

    const toastClass = computed(() => {
      return props.type === "error" ? "bg-red-500" : "bg-green-500";
    });

    setTimeout(() => {
      visible.value = false;
    }, props.duration);

    return { visible, toastClass };
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fixed {
  width: 100vw;
  left: 0;
  right: 0;
}

p {
  margin: 0;
  font-size: 1.25rem;
}
</style>
