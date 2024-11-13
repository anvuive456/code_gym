<script setup lang="ts">
import { ref } from "vue";

const menuItems = ref([
    { text: "Dashboard", link: "/admin" },
    { text: "Người dùng", link: "/admin/users" },
    { text: "Chi nhánh", link: "/admin/branches" },
    { text: "Báo cáo", link: "/admin/report" },
    { text: "Gói tập", link: "/admin/packages" },
]);
</script>

<template>
    <aside class="menu">
        <p class="has-text-centered has-text-primary">Admin Panel</p>
        <ul class="menu-list mt-4">
            <li v-for="item in menuItems" :key="item.text">
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
