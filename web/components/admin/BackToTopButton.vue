<template>
  <button v-show="isVisible" class="back-to-top" @click="scrollToTop"> Back to Top
  </button>
</template>

<script>
export default {
  name: 'BackToTopButton',
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    toggleVisibility() {
      this.isVisible = window.scrollY > 300;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.toggleVisibility);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.toggleVisibility);
  },
};
</script>

<style scoped>
.back-to-top {
  /* Style the button */
}
</style>
