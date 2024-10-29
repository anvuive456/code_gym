<script setup lang="ts">
defineProps<{
    title: string | null
}>();
</script>

<template>
    <!-- Page Header Start -->
    <div class="container-fluid page-header mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5 " style="min-height: 400px">
            <h4 class="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{{ title }}</h4>
            <div class="d-inline-flex">
                <p class="m-0 text-white"><a class="text-white" href="/">Trang chủ</a></p>
                <p class="m-0 text-white px-2">/</p>
                <p class="m-0 text-white">{{ title }}</p>
            </div>
        </div>
    </div>
    <!-- Page Header End -->
</template>

<style scoped>
</style>
