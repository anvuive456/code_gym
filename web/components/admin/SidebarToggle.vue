<template>
    <button class="sidebar-toggler" @click="toggleSidebar">Toggle Sidebar</button>
  </template>
  
  <script>
  export default {
    methods: {
      toggleSidebar() {
        document.querySelector('.sidebar').classList.toggle('open');
        document.querySelector('.content').classList.toggle('open');
      },
    },
  };
  </script>
  