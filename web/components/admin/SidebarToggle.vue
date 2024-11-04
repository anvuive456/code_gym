<template>
  <button class="sidebar-toggler" @click="toggleSidebar">Toggle Sidebar</button>
  <div class="sidebar" :class="{ open: isSidebarOpen }">Sidebar Content</div>
  <div class="content" :class="{ open: isSidebarOpen }">Main Content</div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style scoped>
.sidebar {
  /* Các kiểu cho sidebar */
  transition: transform 0.3s ease;
}

.sidebar.open {
  /* Thêm các kiểu khi sidebar mở, ví dụ: */
  transform: translateX(0);
}

.content {
  /* Các kiểu cho content */
  transition: margin-left 0.3s ease;
}

.content.open {
  /* Thêm các kiểu khi content mở, ví dụ: */
  margin-left: 250px;
}
</style>
