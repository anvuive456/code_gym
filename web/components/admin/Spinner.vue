<template>
    <div
        id="spinner"
        class="position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center bg-white"
    >
        <div
            class="spinner-border text-primary"
            style="width: 3rem; height: 3rem"
            role="status"
        >
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Spinner",
});
</script>

<style scoped>
#spinner {
    opacity: 0;
    visibility: hidden;
    transition:
        opacity 0.5s ease-out,
        visibility 0s linear 0.5s;
    z-index: 99999;
}

#spinner.show {
    visibility: visible;
    opacity: 1;
    transition:
        opacity 0.5s ease-out,
        visibility 0s linear 0s;
}
</style>
