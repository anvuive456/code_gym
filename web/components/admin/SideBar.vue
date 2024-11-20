<script setup lang="ts">
import { ref } from "vue";

const menuItems = ref([
    { text: "Tổng quan", link: "/admin" },
    { text: "Người dùng", link: "/admin/users" },
    { text: "Chi nhánh", link: "/admin/branches" },
    { text: "Gói tập", link: "/admin/packages" },
    { text: "Khuyến mãi", link: "/admin/promotions" },
    // { text: "Báo cáo", link: "/admin/report" },
]);
</script>

<template>
    <aside class="menu">
        <p class="has-text-centered has-text-primary is-size-3">Admin Panel</p>
        <ul class="menu-list mt-4">
            <li v-for="item in menuItems" :key="item.text" class="mx-2 py-1">
                <router-link :to="item.link">
                    {{ item.text }}
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<style scoped>
.menu {
    height: 100vh;
    width: 250px;
    border-right: 1px solid #ddd;
}
</style>
