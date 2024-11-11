<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Sidebar",
    data() {
        return {
            isCollapsed: false,
        };
    },
});
</script>
<template>
    <div
        :class="['sidebar', isCollapsed ? 'collapsed' : '']"
        :style="{ width: isCollapsed ? '70px' : '220px' }"
    >
        <a
            href="/"
            class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
            <h3 class="text-primary">
                <i class="fa fa-hashtag me-2"></i>
                <span v-if="!isCollapsed">ADMIN PANEL</span>
            </h3>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <router-link to="/admin/branches" class="nav-link">
                    <i class="fa fa-tachometer-alt me-2"></i>
                    <span v-if="!isCollapsed">Chi nhánh</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/users" class="nav-link">
                    <i class="fa fa-th me-2"></i>
                    <span v-if="!isCollapsed">Học viên</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/report" class="nav-link">
                    <i class="fa fa-keyboard me-2"></i>
                    <span v-if="!isCollapsed">Báo cáo</span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/admin/packages" class="nav-link">
                    <i class="fa fa-keyboard me-2"></i>
                    <span v-if="!isCollapsed">Gói tập</span>
                </router-link>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link link-dark">
                    <i class="fa fa-users me-2"></i>
                    <span v-if="!isCollapsed">Customers</span>
                </a>
            </li>
        </ul>
        <hr />
        <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
            <i
                :class="
                    isCollapsed ? 'fa fa-chevron-right' : 'fa fa-chevron-left'
                "
            ></i>
        </button>
    </div>
</template>

<style scoped>
.sidebar {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f8f9fa;
    transition: width 0.3s ease;
}
.collapsed .nav-link span,
.collapsed h3 span {
    display: none;
}
.toggle-btn {
    background: none;
    border: none;
    color: #6c757d;
    font-size: 1.2rem;
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
}
@media (max-width: 768px) {
    .sidebar {
        width: 70px;
    }
}
</style>
