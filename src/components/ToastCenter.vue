<template>
  <div class="toast-container">
    <transition-group name="toast-fade" tag="div">
      <div
        v-for="(toast, index) in toasts"
        :key="index"
        :class="['toast', 'toast-' + toast.type]"
      >
        <p class="toast-message">{{ toast.message }}</p>
        <button class="toast-close-button" @click="removeToast(index)">
          X
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toasts: [], // array of toasts to be displayed
    };
  },
  methods: {
    addToast(message, type = "info") {
      // Add a new toast to the toasts array
      let id = this.toasts.length + 1; // Generate a unique ID for the new toast
      this.toasts.push({ message, type, id }); // Add the new toast to the toasts array

      // Remove the toast after 3 seconds
      setTimeout(() => {
        this.removeToast(id);
      }, 3000);
    },
    removeToast(id) {
      // Remove a toast from the toasts array using its ID
      this.toasts = this.toasts.filter((toast) => {
        return toast.id !== id;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;

  .toast {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.toast-success {
      background-color: #4caf50;
    }

    &.toast-warn {
      background-color: #ff9800;
    }

    &.toast-error {
      background-color: #f44336;
    }

    &.toast-info {
      background-color: #2196f3;
    }

    .toast-message {
      margin: 0;
      font-size: 14px;
    }

    .toast-close-button {
      background-color: transparent;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      margin-left: 10px;
    }
  }

  &.toast-fade-enter-active,
  &.toast-fade-leave-active {
    transition: opacity 0.5s;
  }

  &.toast-fade-enter,
  &.toast-fade-leave-to {
    opacity: 0;
  }
}
</style>