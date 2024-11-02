<template>
    <div id="spinner" :class="{ show: isLoading } " class="bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center" > 
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isLoading: true,
      };
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false;
      }, 10000);
    },
  };
  </script>
  
  <style scoped>

#spinner {
    opacity: 0;
    visibility: hidden;
    transition: opacity .5s ease-out, visibility 0s linear .5s;
    z-index: 99999;
}

#spinner.show {
    transition: opacity .5s ease-out, visibility 0s linear 0s;
    visibility: visible;
    opacity: 1;
}
  </style>
  